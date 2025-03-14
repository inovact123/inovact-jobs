const addCompanyQuery = `mutation AddCompany(
  $email_id: String!
  $cognito_sub: String!
) {
  insert_user_one(
    object: {
      email_id: $email_id
      cognito_sub:$cognito_sub
    }
  ) {
    id
    email_id
  }
}
`;

module.exports = {
  addCompanyQuery,
};
