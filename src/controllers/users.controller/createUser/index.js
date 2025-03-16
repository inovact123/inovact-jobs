const { validationResult } = require("express-validator");
const { query: Hasura } = require("../../../utils/hasura");
const catchAsync = require("../../../utils/catchAsync");
const { createUserMutation } = require("./queries/mutations");
const { checkExistingUserQuery } = require("./queries/queries");

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cognito_sub
 *               - email
 *             properties:
 *               cognito_sub:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input or user already exists
 */

const createUser = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { cognito_sub, email } = req.body;

  const existingUserResponse = await Hasura(checkExistingUserQuery, {
    cognito_sub,
  });

  console.log(JSON.stringify(existingUserResponse))

  if (existingUserResponse.result.data.recruitment_users.length > 0) {
    return res.status(400).json({
      status: false,
      message: "User with this cognito_sub already exists",
    });
  }

  const createResponse = await Hasura(createUserMutation, {
    object: {
      cognito_sub,
      email,
    },
  });

  return res.status(201).json({
    status: true,
    message: "User created successfully",
    data: createResponse.result.data.insert_recruitment_users_one,
  });
});

module.exports = createUser;
