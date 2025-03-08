const { validationResult } = require("express-validator");
const { query: Hasura } = require("../../../utils/hasura");
const catchAsync = require("../../../utils/catchAsync");
const { updateJobQuery } = require("./queries/mutations");

/**
 * @swagger
 * /api/jobs/{jobId}:
 *   put:
 *     summary: Update a job posting
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the job to update
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               job_title:
 *                 type: string
 *               job_type:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Job updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Job not found
 */

const updateJob = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { jobId } = req.params;

  if (
    req.body.min_salary &&
    req.body.max_salary &&
    Number(req.body.min_salary) > Number(req.body.max_salary)
  ) {
    return res.status(400).json({
      errors: [{ msg: "Minimum salary cannot be greater than maximum salary" }],
    });
  }

  const updateFields = {};

  // Only include fields that were provided in the request
  const fieldNames = [
    "job_title",
    "job_type",
    "location",
    "min_salary",
    "max_salary",
    "job_description",
    "assignment_description",
    "assignment_deadline",
    "application_deadline",
    "city",
    "monthly_stipend",
    "duration",
    "required_skills",
    "preferred_skills",
    "job_status",
  ];

  fieldNames.forEach((field) => {
    if (req.body[field] !== undefined) {
      updateFields[field] = req.body[field];
    }
  });

  const updateJobQueryResponse = await Hasura(updateJobQuery, {
    id: jobId,
    updates: updateFields,
  });

  // Check if job was found and updated
  if (updateJobQueryResponse.result.data.update_jobs.affected_rows === 0) {
    return res.status(404).json({
      status: false,
      message: "Job not found",
    });
  }

  return res.status(200).json({
    status: true,
    message: "Job updated successfully",
    data: updateJobQueryResponse.result.data.update_jobs,
  });
});

module.exports = updateJob;
