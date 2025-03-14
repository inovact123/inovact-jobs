const { validationResult } = require("express-validator");
const { query: Hasura } = require("../../../utils/hasura");
const catchAsync = require("../../../utils/catchAsync");
const { deleteUserMutation } = require("./queries/mutations");

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Not authorized to delete this user
 *       404:
 *         description: User not found
 */

const deleteUser = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const cognito_sub = req.body.cognito_sub;

  const deleteResponse = await Hasura(deleteUserMutation, {
    cognito_sub,
  });

  return res.status(200).json({
    status: true,
    message: "User deleted successfully",
    data: {
      id: userId,
    },
  });
});

module.exports = deleteUser;
