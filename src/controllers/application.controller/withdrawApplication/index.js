const { validationResult } = require("express-validator");
const { query: Hasura } = require("../../../utils/hasura");
const catchAsync = require("../../../utils/catchAsync");
const { withdrawApplicationMutation } = require("./queries/mutations");
const { checkApplicationOwnershipQuery } = require("./queries/queries");

/**
 * @swagger
 * /api/applications/{applicationId}/withdraw:
 *   put:
 *     summary: Withdraw an application
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
 *     responses:
 *       200:
 *         description: Application withdrawn successfully
 *       401:
 *         description: Not authorized to withdraw this application
 *       404:
 *         description: Application not found
 */

const withdrawApplication = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { applicationId } = req.params;
  const user_id = req.body.cognito_sub;

  const ownershipResponse = await Hasura(checkApplicationOwnershipQuery, {
    id: applicationId,
    applicant_id: user_id,
  });

  if (ownershipResponse.result.data.applications.length === 0) {
    return res.status(404).json({
      status: false,
      message: "Application not found or you are not authorized to withdraw it",
    });
  }

  const withdrawResponse = await Hasura(withdrawApplicationMutation, {
    id: applicationId,
    status: "withdrawn",
  });

  if (withdrawResponse.errors) {
    return res.status(400).json({
      status: false,
      message: "Failed to withdraw application",
      errors: withdrawResponse.errors,
    });
  }

  return res.status(200).json({
    status: true,
    message: "Application withdrawn successfully",
    data: withdrawResponse.result.data.update_applications_by_pk,
  });
});

module.exports = withdrawApplication;
