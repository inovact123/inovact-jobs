const checkExistingUserQuery = `
  query CheckExistingUser($cognito_sub: String!) {
    recruitment_users(where: {cognito_sub: {_eq: $cognito_sub}}) {
      id
      cognito_sub
      email
    }
  }
`;

module.exports = { checkExistingUserQuery };
