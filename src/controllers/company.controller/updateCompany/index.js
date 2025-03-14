const { validationResult } = require("express-validator");
const { query: Hasura } = require("../../../utils/hasura");
const catchAsync = require("../../../utils/catchAsync");
const { upsertCompanyQuery } = require("./queries/mutations");

/**
 * @swagger
 * /v1/settings/company:
 *   put:
 *     summary: Create or update company settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company_name:
 *                 type: string
 *               website:
 *                 type: string
 *               linkedin:
 *                 type: string
 *               contact_person:
 *                 type: string
 *               email:
 *                 type: string
 *               email_notifications:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Company settings updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */

const upsertCompany = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    company_name,
    website,
    linkedin,
    contact_person,
    email,
    email_notifications,
    cognito_sub,
  } = req.body;

  const upsertResponse = await Hasura(upsertCompanyQuery, {
    object: {
      company_name,
      website,
      linkedin,
      contact_person,
      email,
      email_notifications,
      cognito_sub,
    },
  });

  return res.status(200).json({
    status: true,
    message: "Company settings updated successfully",
    data: upsertResponse.result.data.insert_company_settings_one,
  });
});

module.exports = upsertCompany;
