/*eslint-disable no-unused-vars*/
/*eslint-disable no-console*/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Listening on port ${port}`));



const authCheck = (request, response, next) => {
  if (environment !== 'test') {
    const token = request.headers.token;
    if (!token) {
      return response.status(403).json('You must have an authorized token');
    }
    try {
      const code = jwt.verify(token, app.get('secretKey'));
      response.locals.email = code.email;
      next();
    } catch (error) {
      return response.status(403).json('Invalid token');
    }
  } else {
    next();
  }
 
};


const checkAdmin = (request, response, next) => {
  if (response.locals.email.includes('@turing.io')) {
    next();
  } else {
    return response.status(403).json({ error: 'You are not authorized at this endpoint' });
  }
};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(`${__dirname}/client/build`));


app.set('secretKey', process.env.BYOB_SECRET_KEY);

app.post('/api/v1/tokens', (request, response) => {
 
  for (let requiredParameter of ['email', 'name']) {
    if (!request.body[requiredParameter]){
      return response.status(422).json({error:`Missing parameter ${requiredParameter}`});
    }
  }
  const {email, name} = request.body;
  const admin = email.endsWith('@turing.io');
  const certification = app.get('secretKey');
  const webToken = jwt.sign({email, name}, certification, {expiresIn: '24h'});
  return response.status(200).json(webToken);
});




//get all candidates
app.get('/api/v1/candidates', (request, response) => {

  database('candidates').select()

    .then(candidates => {
      return response.status(200).json({
        candidates
      });
    })
    .catch(error => {
      return response.status(500).json({
        error
      });
    });
});

//get all expenditures

app.get('/api/v1/expenditures', (request, response) => {
  database('expenditures').select()

  .then(expenditures => {
    return response.status(200).json({
      expenditures
    })
  })
  .catch(error => {
    return response.status(500).json({
      error
    })
  })
})


// get all contributions or all contributions in a specific zip code (query parameter)

app.get('/api/v1/contributions', (request, response) => {
  const zip = (request.query.zip);
  const committeeId = (request.query.committeeId);
  if (zip) {
    database('contributors').where('donor_zip', zip).select()
      .then(contributors => {
        if (contributors.length){
          return response.status(200).json({
            contributors
          });
        } else {
          return response.status(404).json({
            error: `Could not find contributors for candadite with zip code of ${zip}`
          });
        }
      })
      .catch(error => {
        return response.status(500).json({
          error
        });
      });
  } else {
    database('contributors').select()
      .then(contributors => {
        if (contributors.length) {
          return response.status(200).json({contributors});
        } else {
          return response.status(404).json({error: "could not find contributors"});
        }
      })
      .catch(error => {
        return response.status(500).json({error});
      });
  }
});

//get all contributions for a specific candidate or all contributions for a specific candidate in a specific zip code (query parameter)

app.get('/api/v1/candidates/:committeeId/contributions', (request, response) => {
  const zip = (request.query.zip);


  if (zip){
    database('contributors').where({
      committee_id: request.params.committeeId,
      donor_zip: zip}).select()
    
      .then(contributions => {
        if(contributions.length){
          return response.status(200).json({
            contributions
          })
        } else {
          return response.status(404).json({
            error: `Could not find contributions in zip ${zip} for candidate with committee id ${request.params.committeeId}`
          })
        }
      })
      .catch(error => {
        return response.status(500).json({
          error
        })
      })
  } else {
    database('contributors').where('committee_id', request.params.committeeId)
    .then(contributors => {
      if(contributors.length){
        return response.status(200).json({
          contributors
        })
      } else {
        return response.status(404).json({
          error: `Could not find contributions for candidate with committe id ${request.params.committeeId}`
        })
      }
    })
    .catch(error => {
      return response.status(500).json({
        error
      })
    })
  }
  
})

//get all expenditures for specific candidates

app.get('/api/v1/candidates/:committeeId/expenditures', (request, response) => {
  database('expenditures').where('committee_id', request.params.committeeId).select()

  .then(expenditures => {
    if(expenditures.length){
      return response.status(200).json({
        expenditures
      })
    } else {
      return response.status(404).json({
        error: `Could not find expenditures for candadite with commmitte id of 
        ${request.params.committeeId}`
      })
    }
  })
  .catch(error => {
    return response.status(500).json({
      error
    })
  })
})

//get a specific contribution by it's contributionId

app.get('/api/v1/contributions/:contributionId', (request, response) => {
  database('contributors').where('record_id', request.params.contributionId).select()
    .then(contributors => {
      if (contributors.length) {
        return response.status(200).json({contributors});
      } else {
        return response.status(404).json({
          error: `Could not find contribution for record ${request.params.contributionId}`});
      }
    })
    .catch(error => {
      return response.status(500).json({error});
    });
});

//post a candidate

app.post('/api/v1/candidates', authCheck, (request, response) => {
  
  const candidate = request.body;

  for (let requiredParameter of [
    'committee_id',
    'last_name',
    'full_name', 
    'candidate_id', 
    'committee_name', 
    'party',
    'active']){

    if (!candidate[requiredParameter]){

      return response.status(422).json({
        error: `You are missing the required parameter ${requiredParameter}`
      });
    }
  }
  database('candidates').insert(candidate, 'id')
    .then(candidate => {
      return response.status(201).json({
        id: candidate[0]
      });
    })

    .catch( error => {
      return response.status(500).json({
        error
      });
    });
});


// post a contributor

app.post('/api/v1/contributions', authCheck, (request, response) => {
  const contribution = request.body;
  for (let requiredParameter of ['committee_id', 
    'contribution_amount', 
    'contribution_date',
    'donor_last',
    'donor_first',
    'donor_address',
    'donor_city',
    'donor_state',
    'donor_zip',
    'record_id',
    'committee_type',
    'Jurisdiction']) {
    if (!contribution[requiredParameter]){
      return response.status(403).json({
        error: `You are missing the required parameter ${requiredParameter}`
      });
    }
  }
  database('contributors').insert(contribution, 'id')
    .then(contribution => {
      return response.status(201).json({
        id: contribution[0]
      });
    })

    .catch( error => {
      return response.status(500).json({
        error
      });
    });
});

// patch a candidate

app.patch('/api/v1/candidate/:committeeId', authCheck, (request, response) => {
  database('candidates').where('committee_id', request.params.committeeId).update(request.body, '')
    .then(update => {
      if (!update){
        return response.status(404).json({
          error: 'Could not update candidate'
        });
      } else {
        return response.sendStatus(202);
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

//patch a contribution

app.patch('/api/v1/contributions/:contributionId', authCheck, (request, response) => {
  database('contributors')
    .where('record_id', request.params.contributionId)
    .update(request.body, '')
    .then(update => {
      if (!update) {
        return response.status(404).json({
          error: 'Could not update contribution'
        });
      } else {
        return response.sendStatus(202);
      }
    })
    .catch(error => {
      return response.status(500).json({error});
    });
});


//delete a candidate (and all of candidates contributions)

app.delete('/api/v1/candidates/:committeId', authCheck, (request, response) => {
  database('contributors').where('committee_id', request.params.committeId).delete()

    .then(() => {
      database('candidates').where('committee_id', request.params.committeId).delete()
        .then(candidate => {
          return response.sendStatus(202);
        })
        .catch(error => {
          return response.status(500).json({
            error
          });
        });  
    });
});

//delete a contributor

app.delete('/api/v1/contributions/:contributionId', authCheck, (request, response) => {
  database('contributors').where('id', request.params.contributionId).delete()
    .then(contribution => {
      return response.sendStatus(202);
    })
    .catch(error => {
      return response.status(500).json({error});
    });
});

app.listen(app.get('port'), () => {
  console.log('listening');
});


module.exports = app;

