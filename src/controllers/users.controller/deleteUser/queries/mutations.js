const deleteUserMutation = `
  mutation DeleteUser($cognito_sub: String!) {
    delete_recruitment_users(where: {cognito_sub: {_eq: $cognito_sub}}) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

module.exports = { deleteUserMutation };
