const createJobQuery = `mutation creteJob($objects: [jobs_insert_input!]!){
  insert_jobs(objects: $objects) {
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
    posted_by
    job_status
    posted_date
    company{
      id
      company_name
      contact_person
    }
    }
  }
}`;

module.exports = { createJobQuery };
