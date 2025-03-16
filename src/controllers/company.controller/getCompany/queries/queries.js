const getCompanyQuery = `query GetCompany($id: uuid!) {
    recruitment_companies(where: {id: {_eq: $id}}) {
      id
      name
      website
      linkedin_url
      created_at
      updated_at
    }
  }`;

module.exports = { getCompanyQuery };
