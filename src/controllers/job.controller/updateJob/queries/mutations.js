const updateJobQuery = `
  mutation UpdateJob($id: Int!, $updates: jobs_set_input!) {
    update_jobs(where: {id: {_eq: $id}}, _set: $updates) {
      affected_rows
      returning {
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
        updated_at
      }
    }
  }
`;

module.exports = {
  updateJobQuery,
};
