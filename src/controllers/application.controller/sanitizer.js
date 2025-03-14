const { param, body, query } = require("express-validator");

const applyForJobSanitizer = [
  param("jobId").isInt().withMessage("Job ID must be an integer").toInt(),

  body("name").notEmpty().withMessage("Name is required").trim().escape(),

  body("assignmentLink")
    .optional()
    .isURL()
    .withMessage("Assignment link must be a valid URL")
    .trim(),
];

const getJobApplicantsSanitizer = [
  param("jobId").isInt().withMessage("Job ID must be an integer"),

  query("sortBy")
    .optional()
    .isIn(["date_asc", "date_desc", "score_asc", "score_desc"])
    .withMessage(
      "Sort must be one of: date_asc, date_desc, score_asc, score_desc"
    ),

  query("status")
    .optional()
    .isIn([
      "pending",
      "reviewing",
      "shortlisted",
      "rejected",
      "selected",
      "withdrawn",
    ])
    .withMessage("Status must be a valid application status"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100")
    .toInt(),

  query("offset")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Offset must be a non-negative integer")
    .toInt(),
];

const withdrawApplicationSanitizer = [
  param("applicationId")
    .isUUID()
    .withMessage("Application ID must be a valid UUID"),
];

const changeApplicationStatusSanitizer = [
  param("applicationId")
    .isUUID()
    .withMessage("Application ID must be a valid UUID"),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["pending", "reviewing", "shortlisted", "rejected", "selected"])
    .withMessage(
      "Status must be one of: pending, reviewing, shortlisted, rejected, selected"
    ),

  body("score")
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage("Score must be an integer between 0 and 100")
    .toInt(),
];

module.exports = {
  applyForJobSanitizer,
  getJobApplicantsSanitizer,
  withdrawApplicationSanitizer,
  changeApplicationStatusSanitizer,
};
