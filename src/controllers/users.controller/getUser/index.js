const { validationResult } = require("express-validator");
const { query: Hasura } = require("../../../utils/hasura");
const catchAsync = require("../../../utils/catchAsync");
const { getUserByIdQuery, getUserBySubQuery } = require("./queries/queries");

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       404:
 *         description: User not found
 *
 * /api/users/by-sub/{cognito_sub}:
 *   get:
 *     summary: Get user by cognito_sub
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: cognito_sub
 *         required: true
 *         schema:
 *           type: string
 *         description: cognito_sub of the user
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       404:
 *         description: User not found
 */

const getUser = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let user;

  if (req.params.userId) {
    const userId = req.params.userId;
    const userResponse = await Hasura(getUserByIdQuery, { id: userId });
    user = userResponse.result.data.users_by_pk;

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: true,
      data: user,
    });
  }

  const cognitoSub = req.body.cognito_sub;
  const userResponse = await Hasura(getUserBySubQuery, {
    cognito_sub: cognitoSub,
  });
  user = userResponse.result.data.users[0];

  if (!user) {
    return res.status(404).json({
      status: false,
      message: "User not found",
    });
  }

  return res.status(200).json({
    status: true,
    data: user,
  });
});

module.exports = getUser;
