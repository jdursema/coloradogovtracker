exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('candidatetotals', function (table) {
      table.increments('id').primary();
      table.string('candidateId');
      table.string('name');
      table.string('party');
      table.decimal('expenditureTotal', 11, 2);
      table.decimal('contributionTotal', 11, 2);
      table.integer('contributionNum', 11, 2);
      table.decimal('avgContribution', 11, 2);
      table.string('active')
    }),
    knex.schema.createTable('statetotals', function(table) {
      table.increments('id').primary();
      table.string('state');
      table.decimal('total', 11, 2);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('candidatetotals'),
    knex.schema.dropTable('statetotals')
  ]);
};