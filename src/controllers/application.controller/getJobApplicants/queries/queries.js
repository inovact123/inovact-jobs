const getJobApplicantsQuery = `
  query GetJobApplicants(
    $job_id: Int!, 
    $order_by: [applications_order_by!], 
    $limit: Int!, 
    $offset: Int!,
    $where: applications_bool_exp = {}
  ) {
    applications(
      where: {job_id: {_eq: $job_id}, _and: [$where]}
      order_by: $order_by
      limit: $limit
      offset: $offset
    ) {
      id
      job_id
      applicant_id
      name
      status
      application_date
      assignmentLink
      score
      applicant {
        id
        name
        email
        profile_picture
      }
    }
    applications_aggregate(where: {job_id: {_eq: $job_id}, _and: [$where]}) {
      aggregate {
        count
      }
    }
  }
`;

const checkJobOwnershipQuery = `
  query CheckJobOwnership($job_id: Int!, $user_id: String!) {
    jobs(where: {id: {_eq: $job_id}, posted_by: {_eq: $user_id}}) {
      id
    }
  }
`;

module.exports = {
  getJobApplicantsQuery,
  checkJobOwnershipQuery,
  checkJobExistsQuery,
};
