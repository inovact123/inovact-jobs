const checkJobExistsAndExistingApplicationQuery = `
  query CheckJobExistsAndExistingApplication($id: Int!, $applicant_id: Int!) {
    jobs_by_pk(id: $id) {
      id
      job_title
      application_deadline
      job_status
    }
    applications(where: {job_id: {_eq: $id}, applicant_id: {_eq: $applicant_id}}) {
      id
      status
    }
  }
`;

module.exports = { checkJobExistsAndExistingApplicationQuery };
