const withdrawApplicationMutation = `
  mutation WithdrawApplication($id: uuid!, $status: String!) {
    update_applications_by_pk(
      pk_columns: {id: $id}, 
      _set: {status: $status}
    ) {
      id
      status
    }
  }
`;

module.exports = { withdrawApplicationMutation };
