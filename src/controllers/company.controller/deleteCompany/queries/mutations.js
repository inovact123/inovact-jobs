const deleteCompanyQuery = `
mutation DeleteCompany($id: Int!, $cognito_sub: String) {
  delete_company(where: {
    id: {_eq: $id}, 
    cognito_sub: {_eq: $cognito_sub}
  }) {
    affected_rows
    returning {
      id
      company_name
    }
  }
}
`;

module.exports = { deleteCompanyQuery };
