var environment = process.env.NODE_ENV || 'test';
var config = require('../knexfile')[environment];

module.exports = require('knex')(config);