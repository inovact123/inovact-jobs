const { validationResult } = require("express-validator");
const { query: Hasura } = require("../../../utils/hasura");
const catchAsync = require("../../../utils/catchAsync");
const { deleteCompanyQuery } = require("./queries/mutations");

/**
 * @swagger
 * /v1/settings/company:
 *   delete:
 *     summary: Delete company settings for the authenticated user
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Company settings deleted successfully
 *       404:
 *         description: Company settings not found
 *       401:
 *         description: Unauthorized
 */

const deleteCompany = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const cognito_sub = req.body.cognito_sub;

  const deleteResponse = await Hasura(deleteCompanyQuery, {
    id,
    cognito_sub,
  });

  if (deleteResponse.result.data.delete_company.affected_rows === 0) {
    return res.status(404).json({
      status: false,
      message: "Company not found",
    });
  }

  return res.status(200).json({
    status: true,
    message: "Company deleted successfully",
    data: deleteResponse.result.data.delete_company_settings,
  });
});

module.exports = deleteCompany;
