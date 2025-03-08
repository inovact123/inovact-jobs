const { query, body, param } = require("express-validator");

const cognito_sub = body("cognito_sub", "User Not Authorized")
  .exists()
  .isString();

const createJobSanitizer = [
  cognito_sub,
  body("job_title")
    .isString()
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage("Job title is required and must be between 3-255 characters"),
  body("job_type")
    .isString()
    .trim()
    .isIn(["full-time", "part-time", "contract", "internship", "remote"])
    .withMessage("Valid job type is required"),
  body("location").optional().isString().trim().isLength({ max: 255 }),
  body("min_salary")
    .optional()
    .isNumeric()
    .withMessage("Min salary must be a number"),
  body("max_salary")
    .optional()
    .isNumeric()
    .withMessage("Max salary must be a number"),
  body("job_description").optional().isString().trim(),
  body("assignment_description").optional().isString().trim(),
  body("assignment_deadline")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Valid ISO date required for assignment deadline"),
  body("application_deadline")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Valid ISO date required for application deadline"),
  body("city").optional().isString().trim().isLength({ max: 100 }),
  body("monthly_stipend")
    .optional()
    .isNumeric()
    .withMessage("Monthly stipend must be a number"),
  body("duration").optional().isString().trim().isLength({ max: 100 }),
  body("required_skills")
    .optional()
    .isArray()
    .withMessage("Required skills must be an array"),
  body("preferred_skills")
    .optional()
    .isArray()
    .withMessage("Preferred skills must be an array"),
  body("job_status")
    .optional()
    .isIn(["active", "inactive", "draft"])
    .withMessage("Invalid job status"),
];

const updateJobSanitizer = [
  cognito_sub,
  param("jobId").isInt().withMessage("Valid job ID is required"),
  body("job_title")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage("Job title must be between 3-255 characters"),
  body("job_type")
    .optional()
    .isString()
    .trim()
    .isIn(["full-time", "part-time", "contract", "internship", "remote"])
    .withMessage("Valid job type is required"),
  body("location").optional().isString().trim().isLength({ max: 255 }),
  body("min_salary")
    .optional()
    .isNumeric()
    .withMessage("Min salary must be a number"),
  body("max_salary")
    .optional()
    .isNumeric()
    .withMessage("Max salary must be a number"),
  body("job_description").optional().isString().trim(),
  body("assignment_description").optional().isString().trim(),
  body("assignment_deadline")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Valid ISO date required for assignment deadline"),
  body("application_deadline")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Valid ISO date required for application deadline"),
  body("city").optional().isString().trim().isLength({ max: 100 }),
  body("monthly_stipend")
    .optional()
    .isNumeric()
    .withMessage("Monthly stipend must be a number"),
  body("duration").optional().isString().trim().isLength({ max: 100 }),
  body("required_skills")
    .optional()
    .isArray()
    .withMessage("Required skills must be an array"),
  body("preferred_skills")
    .optional()
    .isArray()
    .withMessage("Preferred skills must be an array"),
  body("job_status")
    .optional()
    .isIn(["active", "inactive", "draft"])
    .withMessage("Invalid job status"),
];

const deleteJobSanitizer = [
  cognito_sub,
  param("jobId").isInt().withMessage("Valid job ID is required"),
];

const getJobByIdSanitizer = [
  param("jobId").isInt().withMessage("Valid job ID is required"),
];

const getJobsSanitizer = [
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1-100")
    .toInt(),
  query("offset")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Offset must be a positive number")
    .toInt(),
  query("job_type")
    .optional()
    .isString()
    .trim()
    .isIn(["full-time", "part-time", "contract", "internship", "remote"])
    .withMessage("Invalid job type"),
  query("location").optional().isString().trim(),
  query("min_salary")
    .optional()
    .isNumeric()
    .withMessage("Min salary must be a number")
    .toFloat(),
  query("max_salary")
    .optional()
    .isNumeric()
    .withMessage("Max salary must be a number")
    .toFloat(),
  query("job_status")
    .optional()
    .isString()
    .trim()
    .isIn(["active", "inactive", "draft"])
    .withMessage("Invalid job status"),
];

module.exports = {
  createJobSanitizer,
  updateJobSanitizer,
  deleteJobSanitizer,
  getJobsSanitizer,
  getJobByIdSanitizer,
};
