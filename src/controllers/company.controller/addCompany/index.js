const { validationResult } = require("express-validator");
const { query: Hasura } = require("../../../utils/hasura");
const { addCompanyQuery } = require("./queries/mutations");
const catchAsync = require("../../../utils/catchAsync");

const addCompany = catchAsync(async (req, res) => {
  const sanitizerErrors = validationResult(req);
  if (!sanitizerErrors.isEmpty()) {
    return res.status(400).json({
      success: false,
      ...sanitizerErrors,
    });
  }

  const { email_id, cognito_sub } = req.body;

  const companyData = {
    email_id,
    cognito_sub,
  };

  const createCompanyQueryResponse = await Hasura(addCompanyQuery, companyData);

  return res.status(201).json({
    success: true,
    errorCode: "",
    errorMessage: "",
    data: null,
  });
});

module.exports = addCompany;
