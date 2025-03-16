const upsertCompanyQuery = `mutation UpsertCompanySettings($object: recruitment_companies_insert_input!) {
    insert_recruitment_companies_one(
      object: $object,
      on_conflict: {
        constraint: companies_pkey,
        update_columns: [name, website, linkedin_url]
      }
    ) {
      id
      name
      website
      linkedin_url
    }
  }`;

module.exports = { upsertCompanyQuery };
