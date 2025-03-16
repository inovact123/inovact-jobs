const { body } = require("express-validator");

const cognito_sub = body("cognito_sub", "User Not Authorized")
  .exists()
  .isString();

const addCompanySanitizer = [
  cognito_sub,
  body("name")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage("Company name must be between 2-255 characters"),
  body("website").optional().isURL().withMessage("Website must be a valid URL"),
  body("linkedin_url")
    .optional()
    .isURL()
    .withMessage("LinkedIn must be a valid URL"),
];

module.exports = {
  addCompanySanitizer,
};
