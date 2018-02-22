const contributionsData = require('../../../data/allContributions.js');
const candidatesData = require('../../../data/candidateLookup');
const expenditureData = require('../../../data/allExpenditures.js');
const candidateTotalData = require('../../../data/totals.js');
const stateTotalData = require('../../../data/stateTotals.js')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contributors').del()
    .then(() => knex('statetotals').del())
    .then(() => knex('candidatetotals').del())
    .then(() => knex('expenditures').del())
    .then(() => knex('candidates').del())
    .then(() => {
      // Inserts seed entries
      let candidatePromises = [];
      let contributionPromises = [];
      let expenditurePromises = [];
      let stateTotalPromises = [];
      let candidateTotalPromises = [];

      candidatesData.forEach((candidate) => {
        candidatePromises.push(createCandidate(knex, candidate));
      });
      contributionsData.forEach((contribution) => {
        contributionPromises.push(createContributor(knex, contribution));
      });
      expenditureData.forEach((expenditure) => {
        expenditurePromises.push(createExpenditure(knex, expenditure));
      });
       candidateTotalData.forEach((candidate) => {
        candidateTotalPromises.push(createTotal(knex, candidate));
      });
       stateTotalData.forEach((state) => {
        stateTotalPromises.push(createStateTotal(knex, state));
      });

      return Promise.all([...candidatePromises, ...contributionPromises, ...expenditurePromises,...candidateTotalPromises,...stateTotalPromises]);
    });
};



const createCandidate = (knex, candidate) => {
  return knex('candidates').insert(candidate);
};

const createContributor = (knex, contributor) => {
  return knex('contributors').insert(contributor);
};

const createExpenditure = (knex, expenditure) => {
  return knex('expenditures').insert(expenditure);
};

const createTotal = (knex, candidate) => {
  return knex('candidatetotals').insert(candidate);
};

const createStateTotal = (knex, state) => {
  return knex('statetotals').insert(state);
};