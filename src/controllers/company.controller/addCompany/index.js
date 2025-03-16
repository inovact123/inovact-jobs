const { validationResult } = require("express-validator");
const { query: Hasura } = require("../../../utils/hasura");
const { addCompanyQuery, addMemberToCompany} = require("./queries/mutations");
const catchAsync = require("../../../utils/catchAsync");

const addCompany = catchAsync(async (req, res) => {
  const sanitizerErrors = validationResult(req);
  if (!sanitizerErrors.isEmpty()) {
    return res.status(400).json({
      success: false,
      ...sanitizerErrors,
    });
  }

  const { name, website, linkedin_url, userId } = req.body;

  const companyData = {
    name,
    website,
    linkedin_url,
  };

  const createCompanyQueryResponse = await Hasura(addCompanyQuery, companyData);

  const companyid = createCompanyQueryResponse.result.data.insert_recruitment_companies_one.id;

  const addMemberToCompanyQueryResponse = await Hasura(addMemberToCompany, {
    role:"owner",
    user_id: userId,
    company_id: companyid
  })

  return res.status(201).json({
    success: true,
    errorCode: "",
    errorMessage: "",
    data: addMemberToCompanyQueryResponse.result.data.insert_recruitment_company_members_one,
  });
});

module.exports = addCompany;
