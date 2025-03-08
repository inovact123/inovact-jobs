const checkJobOwnershipFromApplicationQuery = `
  query CheckJobOwnershipFromApplication($application_id: uuid!, $user_id: String!) {
    applications(
      where: {
        id: {_eq: $application_id}, 
        job: {posted_by: {_eq: $user_id}}
      }
    ) {
      id
    }
  }
`;

module.exports = {
  checkJobOwnershipFromApplicationQuery,
};
