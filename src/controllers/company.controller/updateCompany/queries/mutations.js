const upsertCompanyQuery = `
  mutation UpsertCompanySettings($object: company_settings_insert_input!) {
    insert_company_settings_one(
      object: $object,
      on_conflict: {
        constraint: company_settings_user_id_key,
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
      user_id
      updated_at
    }
  }
`;

module.exports = { upsertCompanyQuery };
