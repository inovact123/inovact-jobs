const deleteCompanyQuery = `
  mutation DeleteCompany($id: Int!) {
    delete_company(where: {id: {_eq: $id}}) {
      affected_rows
      returning {
        id
        company_name
      }
    }
  }
`;

module.exports = { deleteCompanyQuery };
