const { body } = require("express-validator");

const cognito_sub = body("cognito_sub", "User Not Authorized")
  .exists()
  .isString();

const companySanitizer = [
  cognito_sub,
  body("company_name")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage("Company name must be between 2-255 characters"),
  body("website").optional().isURL().withMessage("Website must be a valid URL"),
  body("linkedin")
    .optional()
    .isURL()
    .withMessage("LinkedIn must be a valid URL"),
  body("contact_person")
    .optional()
    .isString()
    .trim()
    .isLength({ max: 255 })
    .withMessage("Contact person name cannot exceed 255 characters"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Must be a valid email address"),
  body("email_notifications")
    .optional()
    .isBoolean()
    .withMessage("Email notifications must be true or false"),
];

const addCompanySanitizer = [
  cognito_sub,
  body("email_id").isEmail().withMessage("Must be a valid email address"),
];

module.exports = {
  addCompanySanitizer,
  companySanitizer,
};
