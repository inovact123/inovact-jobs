const getJobsQuery = `
  query GetJobs($limit: Int!, $offset: Int!, $where: jobs_bool_exp = {}) {
    jobs(
      limit: $limit
      offset: $offset
      where: $where
      order_by: { created_at: desc }
    ) {
      id
      job_title
      job_type
      location
      min_salary
      max_salary
      job_description
      assignment_description
      assignment_deadline
      application_deadline
      city
      monthly_stipend
      duration
      required_skills
      preferred_skills
      job_status
      created_at
      updated_at
    }
  }
`;

const getJobByIdQuery = `
  query GetJobById($id: Int!) {
    jobs(where: {id: {_eq: $id}}) {
      id
      job_title
      job_type
      location
      min_salary
      max_salary
      job_description
      assignment_description
      assignment_deadline
      application_deadline
      city
      monthly_stipend
      duration
      required_skills
      preferred_skills
      job_status
      created_at
      updated_at
    }
  }
`;

module.exports = {
  getJobsQuery,
  getJobByIdQuery,
};
