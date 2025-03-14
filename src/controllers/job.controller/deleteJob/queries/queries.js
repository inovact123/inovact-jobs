const getCompanyId = `query getCompanyId($cognito_sub: String) {
  company(where: {cognito_sub: {_eq: $cognito_sub}}) {
    id
  }
}
`;

module.exports = getCompanyId;
