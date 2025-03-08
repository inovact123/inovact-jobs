const checkApplicationOwnershipQuery = `
  query CheckApplicationOwnership($id: uuid!, $applicant_id: String!) {
    applications(where: {id: {_eq: $id}, applicant_id: {_eq: $applicant_id}}) {
      id
    }
  }
`;

module.exports = { checkApplicationOwnershipQuery };
