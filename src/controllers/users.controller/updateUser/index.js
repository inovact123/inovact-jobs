const { validationResult } = require("express-validator");
const { query: Hasura } = require("../../../utils/hasura");
const catchAsync = require("../../../utils/catchAsync");
const { updateUserMutation } = require("./queries/mutations");

/**
 * @swagger
 * /api/users/{userId}:
 *   put:
 *     summary: Update user details
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to update
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Not authorized to update this user
 *       404:
 *         description: User not found
 */

const updateUser = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;
  const cognito_sub = req.body.cognito_sub;

  const updateResponse = await Hasura(updateUserMutation, {
    cognito_sub,
    updates: { email },
  });

  return res.status(200).json({
    status: true,
    message: "User updated successfully",
    data: updateResponse.result.data.update_recruitment_users[0],
  });
});

module.exports = updateUser;
