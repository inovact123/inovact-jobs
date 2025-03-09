const { validationResult } = require("express-validator");
const { query: Hasura } = require("../../../utils/hasura");
const catchAsync = require("../../../utils/catchAsync");
const { applyForJobMutation } = require("./queries/mutations");
const {
  checkJobExistsAndExistingApplicationQuery,
} = require("./queries/queries");

/**
 * @swagger
 * /api/jobs/{jobId}/apply:
 *   post:
 *     summary: Apply for a job
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the job to apply for
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               assignment_link:
 *                 type: string
 *     responses:
 *       201:
 *         description: Application submitted successfully
 *       400:
 *         description: Invalid input or already applied
 *       404:
 *         description: Job not found
 */

const applyForJob = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { jobId } = req.params;
  const { name, assignment_link } = req.body;
  const applicant_id = req.body.cognito_sub; // Yet to think of this

  const jobAndApplicationCheckResponse = await Hasura(
    checkJobExistsAndExistingApplicationQuery,
    { id: jobId, applicant_id }
  );
  const job = jobAndApplicationCheckResponse.result.data.jobs_by_pk;

  if (!job) {
    return res.status(404).json({
      status: false,
      message: "Job not found",
    });
  }

  if (job.job_status !== "active") {
    return res.status(400).json({
      status: false,
      message: "This job is no longer accepting applications",
    });
  }

  if (
    job.application_deadline &&
    new Date(job.application_deadline) < new Date()
  ) {
    return res.status(400).json({
      status: false,
      message: "Application deadline has passed",
    });
  }

  if (jobAndApplicationCheckResponse.result.data.applications.length > 0) {
    return res.status(400).json({
      status: false,
      message: "You have already applied for this job",
    });
  }

  const applyResponse = await Hasura(applyForJobMutation, {
    object: {
      job_id: jobId,
      applicant_id,
      name,
      assignment_link,
      status: "pending",
      application_date: new Date().toISOString(),
      score: null,
    },
  });

  return res.status(201).json({
    status: true,
    message: "Application submitted successfully",
    data: applyResponse.result.data.insert_applications_one,
  });
});

module.exports = applyForJob;
