const { body, param } = require("express-validator");

const cognito_sub = body("cognito_sub", "User Not Authorized")
  .exists()
  .isString();

const createUserSanitizer = [
  cognito_sub,
  body("email").isEmail().withMessage("Valid email is required"),
];

const updateUserSanitizer = [
  cognito_sub,
  body("email").optional().isEmail().withMessage("Valid email is required"),
];

const deleteUserSanitizer = [
  cognito_sub,
  param("userId").isUUID().withMessage("Valid user ID is required"),
];

const getUserSanitizer = [
  cognito_sub,
  param("userId").optional().isUUID().withMessage("Valid user ID is required"),
];

module.exports = {
  createUserSanitizer,
  updateUserSanitizer,
  deleteUserSanitizer,
  getUserSanitizer,
};
