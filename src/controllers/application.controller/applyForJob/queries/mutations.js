const applyForJobMutation = `
  mutation ApplyForJob($object: applications_insert_input!) {
    insert_applications_one(object: $object) {
      id
      job_id
      applicant_id
      name
      status
      application_date
      assignment_link
      score
    }
  }
`;

module.exports = { applyForJobMutation };
