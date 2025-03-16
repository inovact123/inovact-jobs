const checkIfCanUpdate = `query checkIfCanUpdateCompany($companyId: uuid!, $cognito_sub: String) {
  recruitment_companies(where: {
    id: {
      _eq: $companyId
    },
    _and: [
      {
        company_members: {
          user: {
            cognito_sub: {
              _eq: $cognito_sub
            }
          },
          role: {
            _eq: "owner"
          }
        }
      }
    ]
  }) {
    id
  }
}`;

module.exports = checkIfCanUpdate;