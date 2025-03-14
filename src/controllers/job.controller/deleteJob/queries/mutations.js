const deleteJobQuery = `
mutation DeleteJob($id: Int!, $companyId: Int!) {
  delete_jobs(where: {id: {_eq: $id}, company: {id: {_eq: $companyId}}}) {
    affected_rows
    returning {
      id
    }
  }
}
`;

module.exports = {
  deleteJobQuery,
};
