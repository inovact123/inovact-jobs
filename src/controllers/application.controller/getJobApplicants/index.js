const { validationResult } = require("express-validator");
const { query: Hasura } = require("../../../utils/hasura");
const catchAsync = require("../../../utils/catchAsync");
const {
  getJobApplicantsQuery,
  checkJobOwnershipQuery,
} = require("./queries/queries");

/**
 * @swagger
 * /api/jobs/{jobId}/applicants:
 *   get:
 *     summary: Get all applicants for a job with sorting and filtering
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the job
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [date_asc, date_desc, score_asc, score_desc]
 *         description: Sort applications by date or score
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by application status
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of records to skip
 *     responses:
 *       200:
 *         description: List of applicants
 *       401:
 *         description: Not authorized to view applicants
 *       404:
 *         description: Job not found
 */

const getJobApplicants = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { jobId } = req.params;
  const cognito_sub = req.body.cognito_sub;

  const ownershipResponse = await Hasura(checkJobOwnershipQuery, {
    job_id: parseInt(jobId),
    cognito_sub,
  });

  if (ownershipResponse.result.data.jobs.length === 0) {
    return res.status(401).json({
      status: false,
      message:
        "Job does not exist or not authorized to view applicants for this job",
    });
  }

  const sortBy = req.query.sortBy || "date_desc";
  const status = req.query.status;
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  let order_by = [];
  switch (sortBy) {
    case "date_asc":
      order_by = [{ application_date: "asc" }];
      break;
    case "date_desc":
      order_by = [{ application_date: "desc" }];
      break;
    case "score_asc":
      order_by = [{ score: "asc" }];
      break;
    case "score_desc":
      order_by = [{ score: "desc" }];
      break;
    default:
      order_by = [{ application_date: "desc" }];
  }

  let where = {};
  if (status) {
    where = { status: { _eq: status } };
  }

  const applicantsResponse = await Hasura(getJobApplicantsQuery, {
    job_id: parseInt(jobId),
    order_by,
    where,
    limit,
    offset,
  });

  const { applications, applications_aggregate } =
    applicantsResponse.result.data;

  return res.status(200).json({
    status: true,
    message: "Applicants retrieved successfully",
    data: applications,
    pagination: {
      total: applications_aggregate.aggregate.count,
      limit,
      offset,
    },
  });
});

module.exports = getJobApplicants;
