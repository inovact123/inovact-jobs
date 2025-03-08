const deleteJobQuery = `
  mutation DeleteJob($id: Int!) {
    delete_jobs(where: {id: {_eq: $id}}) {
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
