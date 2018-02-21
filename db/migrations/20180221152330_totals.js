exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('candidateTotals', function (table) {
      table.increments('id').primary();
      table.string('candidateId');
      table.string('name');
      table.string('party');
      table.decimal('expenditureTotal');
      table.decimal('contributionTotal');
      table.integer('contributionNum');
      table.decimal('avgContribution');
    }),
    knex.schema.createTable('stateTotals', function(table) {
      table.increments('id').primary();
      table.string('state');
      table.decimal('total');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('candidateTotals'),
    knex.schema.dropTable('stateTotals')
  ]);
};