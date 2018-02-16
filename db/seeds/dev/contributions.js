const contributionsData = require('../../../data/allContributions.js');
const candidatesData = require('../../../data/candidateLookup');
const expenditureData = require('../../../data/allExpenditures.js');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contributors').del()
    .then(() => knex('expenditures').del())
    .then(() => knex('candidates').del())
    .then(() => {
      // Inserts seed entries
      let candidatePromises = [];
      let contributionPromises = [];
      let expenditurePromises = [];
      candidatesData.forEach((candidate) => {
        candidatePromises.push(createCandidate(knex, candidate));
      });
      contributionsData.forEach((contribution) => {
        contributionPromises.push(createContributor(knex, contribution));
      });
      expenditureData.forEach((expenditure) => {
        expenditurePromises.push(createExpenditure(knex, expenditure));
      });
      return Promise.all([...candidatePromises, ...contributionPromises, ...expenditurePromises]);
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
}