const { validationResult } = require("express-validator");
const { query: Hasura } = require("../../../utils/hasura");
const catchAsync = require("../../../utils/catchAsync");
const { updateApplicationStatusMutation } = require("./queries/mutations");
const { checkJobOwnershipFromApplicationQuery } = require("./queries/queries");

/**
 * @swagger
 * /api/applications/{applicationId}/status:
 *   put:
 *     summary: Update application status (for job posters only)
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: applicationId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the application
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, reviewing, shortlisted, rejected, selected]
 *               score:
 *                 type: integer
 *                 description: Optional score to update (1-100)
 *     responses:
 *       200:
 *         description: Application status updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Not authorized to update this application
 *       404:
 *         description: Application not found
 */

const changeApplicationStatus = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { applicationId } = req.params;
  const { status, score } = req.body;
  const cognito_sub = req.body.cognito_sub;

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      status: false,
      message:
        "Invalid status. Must be one of: pending, reviewing, shortlisted, rejected, selected",
    });
  }

  if (score !== undefined) {
    if (!Number.isInteger(score) || score < 0 || score > 100) {
      return res.status(400).json({
        status: false,
        message: "Score must be an integer between 0 and 100",
      });
    }
  }

  const applicationResponse = await Hasura(
    checkJobOwnershipFromApplicationQuery,
    {
      id: applicationId,
    }
  );
  const application = applicationResponse.result.data.applications_by_pk;

  if (!application) {
    return res.status(404).json({
      status: false,
      message: "Application not found or doesn't belong to the current user.",
    });
  }

  const updateObject = { status };
  if (score !== undefined) {
    updateObject.score = score;
  }

  const updateResponse = await Hasura(updateApplicationStatusMutation, {
    id: applicationId,
    updates: updateObject,
  });

  return res.status(200).json({
    status: true,
    message: "Application status updated successfully",
    data: updateResponse.result.data.update_applications_by_pk,
  });
});

module.exports = changeApplicationStatus;
