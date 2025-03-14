const { validationResult } = require("express-validator");
const { query: Hasura } = require("../../../utils/hasura");
const catchAsync = require("../../../utils/catchAsync");
const { getJobsQuery, getJobByIdQuery } = require("./queries/queries");

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Get all jobs with optional filtering
 *     tags: [Jobs]
 *     parameters:
 *       - in: query
 *         name: job_type
 *         schema:
 *           type: string
 *         description: Filter by job type
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter by location
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of records to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of records to skip
 *     responses:
 *       200:
 *         description: List of jobs
 *       400:
 *         description: Invalid parameters
 *
 * /api/jobs/{jobId}:
 *   get:
 *     summary: Get job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the job to retrieve
 *     responses:
 *       200:
 *         description: Job details
 *       404:
 *         description: Job not found
 */

const getJobs = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (req.params.jobId) {
    const { jobId } = req.params;

    const jobQueryResponse = await Hasura(getJobByIdQuery, { id: jobId });

    const job = jobQueryResponse.result.data.jobs[0];
    if (!job) {
      return res.status(404).json({
        status: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      status: true,
      data: job,
    });
  }

  const filters = {};
  const { job_type, location, limit = 10, offset = 0 } = req.query;

  if (job_type) filters.job_type = job_type;
  if (location) filters.location = location;

  const jobsQueryResponse = await Hasura(getJobsQuery, {
    ...filters,
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return res.status(200).json({
    status: true,
    data: jobsQueryResponse.result.data.jobs,
  });
});

module.exports = getJobs;
