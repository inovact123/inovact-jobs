const upsertCompanyQuery = `
  mutation UpsertCompanySettings($object: company_insert_input!) {
    insert_company_one(
      object: $object,
      on_conflict: {
        constraint: company_cognito_sub_key,
        update_columns: [company_name, website, linkedin, contact_person, email, email_notifications]
      }
    ) {
      id
      company_name
      website
      linkedin
      contact_person
      email
      email_notifications
    }
  }
`;

module.exports = { upsertCompanyQuery };
