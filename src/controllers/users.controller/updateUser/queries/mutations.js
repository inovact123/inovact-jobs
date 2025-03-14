const updateUserMutation = `
  mutation UpdateUser($cognito_sub: String!, $updates: recruitment_users_set_input!) {
    update_recruitment_users(where: {cognito_sub: {_eq: $cognito_sub}}, _set: $updates) {
      returning {
        id
        cognito_sub
        email
        updated_at
      }
    }
  }
`;

module.exports = { updateUserMutation };
