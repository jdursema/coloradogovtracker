exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('expenditures', function (table) {
      table.increments('id').primary();
      table.string('committee_id');
      table.decimal('expenditure_amt');
      table.date('expenditure_date');
      table.string('expenditure_recipient');
      table.string('address');
      table.string('city');
      table.string('state');
      table.string('zip');
      table.string('explanation');
      table.string('record_id');
      table.string('expenditure_type');
      table.string('payment_type');
      table.string('disbursement_type');
      table.string('committee_type');
      table.string('committee_name');
      table.string('candidate_name');
      table.string('jurisdiction');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('expenditures')
  ]);
};