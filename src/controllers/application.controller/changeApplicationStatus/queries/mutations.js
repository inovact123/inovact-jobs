const updateApplicationStatusMutation = `
  mutation UpdateApplicationStatus($id: uuid!, $updates: applications_set_input!) {
    update_applications_by_pk(
      pk_columns: {id: $id}, 
      _set: $updates
    ) {
      id
      status
      score
    }
  }
`;

module.exports = { updateApplicationStatusMutation };
