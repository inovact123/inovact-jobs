const { validationResult } = require("express-validator");
const { query: Hasura } = require("../../../utils/hasura");
const catchAsync = require("../../../utils/catchAsync");
const { deleteJobQuery } = require("./queries/mutations");
const getCompanyId = require("./queries/queries");

/**
 * @swagger
 * /api/jobs/{jobId}:
 *   delete:
 *     summary: Delete a job posting
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the job to delete
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Job not found
 */

const deleteJob = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { jobId } = req.params;
  const cognito_sub = req.body.cognito_sub;

  const getCompanyIdResponse = await Hasura(getCompanyId, {
    cognito_sub,
  });

  const companyId = getCompanyIdResponse.result.data.company[0].id;

  if (!companyId) {
    return res.status(404).json({
      status: false,
      message: "Company not found",
    });
  }

  const deleteJobQueryResponse = await Hasura(deleteJobQuery, {
    id: jobId,
    companyId,
  });

  // Check if job was found and deleted
  if (deleteJobQueryResponse.result.data.delete_jobs.affected_rows === 0) {
    return res.status(404).json({
      status: false,
      message: "Job not found",
    });
  }

  return res.status(200).json({
    status: true,
    message: "Job deleted successfully",
    data: deleteJobQueryResponse.result.data.delete_jobs,
  });
});

module.exports = deleteJob;
