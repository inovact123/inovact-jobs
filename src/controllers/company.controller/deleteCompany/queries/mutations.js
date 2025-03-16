const deleteCompanyQuery = `mutation DeleteCompany($id: uuid!, $cognito_sub: String) {
  delete_recruitment_companies(where: {
    id: {_eq: $id}, 
    company_members: {
      user:{
        cognito_sub: {
          _eq: $cognito_sub
        }
      },
      role: {
        _eq: "owner"
      }
    }
  }) {
    affected_rows
    returning {
      id
      
    }
  }
}
`;

module.exports = { deleteCompanyQuery };
