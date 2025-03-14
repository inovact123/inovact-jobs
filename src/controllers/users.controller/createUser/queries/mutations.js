const createUserMutation = `
  mutation CreateUser($object: recruitment_users_insert_input!) {
    insert_recruitment_users_one(object: $object) {
      id
      cognito_sub
      email
      created_at
      updated_at
    }
  }
`;

module.exports = { createUserMutation };
