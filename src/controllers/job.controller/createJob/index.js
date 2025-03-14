const { validationResult } = require("express-validator");
const { query: Hasura } = require("../../../utils/hasura");
const catchAsync = require("../../../utils/catchAsync");
const { createJobQuery } = require("./queries/mutations");
const getCompanyId = require("./queries/queries");

/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Create a new job posting
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - job_title
 *               - job_type
 *     responses:
 *       201:
 *         description: Job created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */

const createJob = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (
    req.body.min_salary &&
    req.body.max_salary &&
    Number(req.body.min_salary) > Number(req.body.max_salary)
  ) {
    return res.status(400).json({
      errors: [{ msg: "Minimum salary cannot be greater than maximum salary" }],
    });
  }

  const {
    job_title,
    job_type,
    location,
    min_salary,
    max_salary,
    job_description,
    assignment_description,
    assignment_deadline,
    application_deadline,
    city,
    monthly_stipend,
    duration,
    required_skills,
    preferred_skills,
    job_status = "active",
  } = req.body;

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
  console.log(
    job_title,
    job_type,
    location,
    min_salary,
    max_salary,
    job_description,
    assignment_description,
    assignment_deadline,
    application_deadline,
    city,
    monthly_stipend,
    duration,
    required_skills,
    preferred_skills,
    job_status,
    companyId
  );

  const createJobQueryResponse = await Hasura(createJobQuery, {
    objects: [
      {
        job_title,
        job_type,
        location,
        min_salary,
        max_salary,
        job_description,
        assignment_description,
        assignment_deadline,
        application_deadline,
        city,
        monthly_stipend,
        duration,
        required_skills,
        preferred_skills,
        job_status,
        posted_by: companyId,
      },
    ],
  });

  return res.status(201).json({
    status: true,
    data: createJobQueryResponse.result.data.insert_jobs,
  });
});

module.exports = createJob;
