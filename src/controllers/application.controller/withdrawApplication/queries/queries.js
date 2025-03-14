const checkApplicationOwnershipQuery = `
  query CheckApplicationOwnership($id: Int!, $cognito_sub: String!) {
    applications(where: {id: {_eq: $id}, user:{
      cognito_sub: {
        _eq: $cognito_sub
      }
    }}) {
      id
    }
  }
`;

module.exports = { checkApplicationOwnershipQuery };
