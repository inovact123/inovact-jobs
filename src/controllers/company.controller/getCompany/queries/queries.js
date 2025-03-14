const getCompanyQuery = `
  query GetCompany($id: Int!) {
    company(where: {id: {_eq: $id}}) {
      id
      company_name
      website
      linkedin
      contact_person
      email
      email_notifications
      created_at
      updated_at
    }
  }
`;

module.exports = { getCompanyQuery };
