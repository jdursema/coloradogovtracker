process.env.NODE_ENV = 'test';

const chai = require('chai')
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex');

chai.use(chaiHttp);

describe('Client routes', function() {
  it('should return the home page', () => {
    return chai.request(server)
    .get('/')
    .then(response => {
      response.should.have.status(200)
    })
    .catch(error => {
      throw error;
    })
  })
  it('should return a 404 for a route that does not exist', () => {
    return chai.request(server)
    .get('/thisisnottherouteyourlookingfor')
    .then(() => { 
    })
    .catch(error => {
      error.should.have.status(404);
    });
  });
});


describe('authentication', () => {
  it('should get a token if the user has @turing.io email', () => {
  return chai.request(server)
    .post('/api/v1/tokens')
    .send({
      name: 'maria',
      email: 'maria@turing.io'
    })
    .then(response => {
      response.should.have.status(201);
      response.body.should.be.a('object');
      response.body.should.have.property('token');
    })
    .catch(error => {
    });
});

  it('should have an error if the email does not end with turing.io', () => {
    return chai.request(server)
    .post('/api/v1/tokens')
    .send({
      name: 'maria',
      email: 'maria@maria.com'
    })
    .then(response => {
    })
    .catch(error => {
      error.should.have.status(403);
    })
  })
})

describe('API Routes', () => {

  before((done) => {
    knex.seed.run()
      .then(() => {
        done();
      })
  })


  describe('GET /api/v1/candidates', () => {
    it('should return all of the candidates', () => {
      return chai.request(server)
      .get('/api/v1/candidates')
      .then(response => {
        response.should.have.status(200)
        response.should.be.json;
        response.body.candidates[0].should.have.property('id')
        response.body.candidates[0].should.have.property('last_name')
        response.body.candidates[0].should.have.property('full_name')
        response.body.candidates[0].should.have.property('candidate_id')
        response.body.candidates[0].should.have.property('committee_name')
        response.body.candidates[0].should.have.property('party')
        response.body.candidates[0].should.have.property('active')
        response.body.candidates[0].should.have.property('website')
        response.body.candidates[0].should.have.property('image')

        const foundCandidate= response.body.candidates.find( candidate => candidate.last_name === 'Ginsburg');

        foundCandidate.last_name.should.equal('Ginsburg')
        foundCandidate.full_name.should.equal('Noel Ginsburg')
        foundCandidate.candidate_id.should.equal('20165031885')
        foundCandidate.committee_name.should.equal('Noel For Colorado')
        foundCandidate.party.should.equal('Democrat')
        foundCandidate.active.should.equal(true)
        foundCandidate.website.should.equal('https://www.noelforcolorado.com/')
        foundCandidate.image.should.equal('http://msantray.fatcow.com/governor_photos/noel_ginsburg.jpeg')

      })
      .catch(error => {
        throw error
      })
    })
  })

  describe('GET /api/v1/contributions', () => {
    it('should return all of the contributions', () => {
      return chai.request(server)
      .get('/api/v1/contributions')
      .then(response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.contributors[0].should.have.property('id');
        response.body.contributors[0].should.have.property('committee_id');
        response.body.contributors[0].should.have.property('committee_name');
        response.body.contributors[0].should.have.property('contribution_amount');
        response.body.contributors[0].should.have.property('contribution_date');
        response.body.contributors[0].should.have.property('donor_last');
        response.body.contributors[0].should.have.property('donor_first');
        response.body.contributors[0].should.have.property('donor_address');
        response.body.contributors[0].should.have.property('donor_city');
        response.body.contributors[0].should.have.property('donor_state');
        response.body.contributors[0].should.have.property('donor_zip');
        response.body.contributors[0].should.have.property('record_id');
        response.body.contributors[0].should.have.property('contribution_type');
        response.body.contributors[0].should.have.property('donor_type');
        response.body.contributors[0].should.have.property('committee_type');
        response.body.contributors[0].should.have.property('candidate_name');
        response.body.contributors[0].should.have.property('donor_employer');
        response.body.contributors[0].should.have.property('donor_occupation');
        response.body.contributors[0].should.have.property('Jurisdiction');

        const foundCandidate = response.body.contributors.find( contributor => contributor.donor_last === 'SHIPPS');
        foundCandidate.donor_last.should.equal('SHIPPS');
        foundCandidate.donor_first.should.equal('THOMAS');
        foundCandidate.donor_city.should.equal('DURANGO');
      })
      .catch(error => {
        throw error
      })
    })
    it('should return all of the contributions by zip code', () => {
      return chai.request(server)
      .get('/api/v1/contributions?zip=80112')
      .then (response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.contributors[0].donor_zip.should.equal('80112')
      })
    })

  })


  describe('GET /api/v1/contributions/:contributionID', () => {
    it('should return all of the contibutors with a record id', () => {
      return chai.request(server)
      .get('/api/v1/contributions/4673277')
      .then(response => {
        response.should.have.status(200)
      })
      .catch(error => {
        throw error
      })
    })
    it('should return an error if the record is not found', () => {
      return chai.request(server)
      .get('/api/v1/contributions/9')
      .then(response => {
      })
      .catch(error => {
        error.should.have.status(404)
      })
    })
  })

  describe('GET /api/v1/candidates/:committeeId/contributors', () => {
    it('should return all of the contributors to a specific candidate', () => {
      return chai.request(server)
      .get('/api/v1/candidates/20165031883/contributors')
      .then(response => {
        response.should.have.status(200)
        response.body.contributors.should.be.a('array');
        response.body.contributors.length.should.equal(6)

      })
      .catch(error => {
        throw error
      })
    })
    it('should return an error if the candidate does not exist', () => {
      return chai.request(server)
      .get('/api/v1/candidates/20165031888/contributors')
      .then(response => {

      })
      .catch(error => {
        error.should.have.status(404)
      })
    })
  })

  describe('POST /api/v1/candidates', () => {
    it('should create a new candidate', () => {
      return chai.request(server)
      .post('/api/v1/candidates')
      .send({
          committee_id: '20165031889',
          candidate_id: '20165031881',
          last_name: "Turing",
          full_name: "Alan Turing",
          committee_name: "DECODE!",
          party: "Allies",
          active: "FALSE",
          website: "https://www.noelforcolorado.com/",
          image: "https://media1.britannica.com/eb-media/81/191581-004-95328E05.jpg"
      })
      .then(response => {

        response.should.have.status(201);
        response.body.should.be.a('object')
        response.body.should.have.property('id');
      })
      .catch(error => {
        throw error
      })
    })
    it('should not create a new candidate if the user forgot to include a parameter', () => {
      return chai.request(server)
      .post('/api/v1/candidates')
      .send({
        committee_id: '20165031889',
        candidate_id: '20165031881',
        last_name: "Turing",
        committee_name: "DECODE!",
        party: "Allies",
        active: "FALSE",
        website: "https://www.noelforcolorado.com/",
        image: "https://media1.britannica.com/eb-media/81/191581-004-95328E05.jpg"
    })
      .then(response => {
      })
      .catch(error => {
        error.should.have.status(422)
        error.response.body.error.should.equal('You are missing the required parameter full_name')
      })
    })

  })

    describe('PATCH /api/v1/candidate/:committee', () => {
      it('should be able to patch a specific candidate', () => {
        return chai.request(server)
        .patch('/api/v1/candidate/20165031883')
        .send({
          party: "Rager"
        })
        .then(response => {
          response.should.have.status(202);
        })
        .catch(error => {
          throw error
        })
      })
      it('should return an error if the candidate does not exist', () => {
        return chai.request(server)
        .patch('/api/v1/candidate/20165031000')
        .send({
          party: "Love it"
        })
        .then(response => {
        })
        .catch(error => {
          error.should.have.status(404)
        })
      })
    })

  describe('PATCH /api/v1/contributions/:contributionId', () => {
    it('should be able to patch a specific contribution', () => {
      return chai.request(server)
      .patch('/api/v1/contributions/4673278')
      .send({contribution_amount:  995 })
    
      .then(response => {
        response.should.have.status(202);
      })
      .catch(error =>{
        throw error
      })
       })
      it('should return an error if the contribution does not exist', () => {
        return chai.request(server)
        .patch('/api/v1/contributions/9999999')
        .send({contribution_amount: 87888})
        .then(response => {})
        .catch(error => {
          error.should.have.status(404)
        })
      })
   
  })

    describe('DELETE /api/v1/candidates/:candidateId', () => {
      it('should be able to delete a candidate', () => {
        return chai.request(server)
        .delete('/api/v1/candidates/20165031883')
        .then(response => {
          response.should.have.status(202)
        })
        .catch(error => {
          throw error
        })
      })
    })

  describe('DELETE /api/v1/contributions/:contributionId', () => {
    it('should be able to delete a contribution', () => {
      return chai.request(server)
      .delete('/api/v1/contributions/226')
      .then (response => {
        response.should.have.status(202)
      })
      .catch(error => {
        throw error
      })
    })
  })



    describe('POST /api/v1/contributions', () => {
    it('should create a new contribution', () => {
      return chai.request(server)
      .post('/api/v1/contributions')
      .send({
            committee_id: 20165031883,
            committee_name: "NOEL FOR COLORADO",
            contribution_amount: "25.00",
            contribution_date: "2017-07-28T06:00:00.000Z",
            donor_last: "STEELER",
            donor_first: "MELISSA",
            donor_address: "6965 E 3RD AVE",
            donor_city: "DENVER",
            donor_state: "CO",
            donor_zip: "80220",
            record_id: "4673278",
            contribution_type: "Monetary (Itemized)",
            donor_type: "Individual",
            committee_type: "Candidate Committee",
            candidate_name: "NOEL GINSBURG",
            donor_employer: "SELF EMPLOYED",
            donor_occupation: "Healthcare/Medical",
            Jurisdiction: "STATEWIDE"

      })
      .then(response => {
        response.should.have.status(201);
        response.body.should.be.a('object')
        response.body.should.have.property('id');
      })
      .catch(error => {
        throw error
      })
    })
    it('should not create a new contribution if the user forgot to include a parameter', () => {
      return chai.request(server)
      .post('/api/v1/contributions')
      .send({
            committee_name: "NOEL FOR COLORADO",
            contribution_amount: "25.00",
            contribution_date: "2017-07-28T06:00:00.000Z",
            donor_last: "STEELER",
            donor_first: "MELISSA",
            donor_address: "6965 E 3RD AVE",
            donor_city: "DENVER",
            donor_state: "CO",
            donor_zip: "80220",
            record_id: "4673278",
            contribution_type: "Monetary (Itemized)",
            donor_type: "Individual",
            committee_type: "Candidate Committee",
            candidate_name: "NOEL GINSBURG",
            donor_employer: "SELF EMPLOYED",
            donor_occupation: "Healthcare/Medical",
            Jurisdiction: "STATEWIDE"
    })
      .then(response => {
      })
      .catch(error => {
        error.should.have.status(403)
      
      })
    })

  })


});

