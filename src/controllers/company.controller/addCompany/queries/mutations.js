const addCompanyQuery = `mutation AddCompany(
  $name: String,
  $website: String,
  $linkedin_url: String
) {
  insert_recruitment_companies_one(
    object: {
      name: $name
      website:$website
      linkedin_url:$linkedin_url
    }
  ) {
    id
    name
    website
    linkedin_url
    created_at
    updated_at
  }
}
`;

const addMemberToCompany = `mutation addMemberToCompany(
  $role: String,
  $user_id: uuid!,
  $company_id: uuid!
) {
  insert_recruitment_company_members_one(
    object: {
      role: $role
      user_id:$user_id
      company_id:$company_id
    }
  ) {
    id
    user_id
    company_id
    role
    created_at
    updated_at
  }
}`;

module.exports = {
  addCompanyQuery,
  addMemberToCompany
};
