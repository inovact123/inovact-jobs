const { validationResult } = require("express-validator");
const { query: Hasura } = require("../../../utils/hasura");
const catchAsync = require("../../../utils/catchAsync");
const { getCompanyQuery } = require("./queries/queries");

/**
 * @swagger
 * /v1/settings/company:
 *   get:
 *     summary: Get company settings for the authenticated user
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Company settings retrieved successfully
 *       404:
 *         description: Company settings not found
 *       401:
 *         description: Unauthorized
 */

const getCompany = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;

  const getResponse = await Hasura(getCompanyQuery, {
    id: id,
  });

  const companySettings = getResponse.result.data.company[0];

  if (!companySettings) {
    return res.status(404).json({
      status: false,
      message: "Company settings not found",
    });
  }

  return res.status(200).json({
    status: true,
    data: companySettings,
  });
});

module.exports = getCompany;
