const getUserByIdQuery = `
  query GetUserById($id: uuid!) {
    recruitment_users_by_pk(id: $id) {
      id
      cognito_sub
      email
      created_at
      updated_at
    }
  }
`;

const getUserBySubQuery = `
  query GetUserBySub($cognito_sub: String!) {
    recruitment_users(where: {cognito_sub: {_eq: $cognito_sub}}) {
      id
      cognito_sub
      email
      created_at
      updated_at
    }
  }
`;

module.exports = { getUserByIdQuery, getUserBySubQuery };
