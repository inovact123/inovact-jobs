const checkJobOwnershipFromApplicationQuery = `
query CheckJobOwnershipFromApplication($application_id: Int!, $cognito_sub: String!) {
  applications(
    where: {
      id: {_eq: $application_id}, 
      job: {
        company: {
          cognito_sub: {
            _eq: $cognito_sub
          }
        }
      }
    }
  ) {
    id
  }
}
`;

module.exports = {
  checkJobOwnershipFromApplicationQuery,
};
