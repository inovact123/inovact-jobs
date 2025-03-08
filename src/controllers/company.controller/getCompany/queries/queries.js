const getCompanyQuery = `
  query GetCompany($id: Int!) {
    company_settings(where: {id: {_eq: $id}}) {
      id
      company_name
      website
      linkedin
      contact_person
      email
      email_notifications
      user_id
      created_at
      updated_at
    }
  }
`;

module.exports = { getCompanyQuery };
