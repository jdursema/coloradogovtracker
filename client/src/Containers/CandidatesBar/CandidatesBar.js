import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSelectedCandidate, initialCandidatesFetch }from '../../Helper/helper';
import './CandidatesBar.css';
import * as actions from '../../Actions/';
import { Link, withRouter} from 'react-router-dom';


export class CandidatesBar extends Component {

  selectCandidate = async (candidateId) => {
    const candidateData = await getSelectedCandidate(candidateId)
    this.props.setCandidate(candidateData)
  }


  
             
    //       
  render() {


    const mappedCandidates = this.props.candidates.map((candidate) => {
      if (candidate.active === true) {
        return (
          <div className='candidate-img-div grow' onClick={() => this.selectCandidate(candidate.committee_id)}>
            <Link to = {`/candidates/${candidate.committee_id}`}>
              <img className="candidate-img" src={`${candidate.image}`} alt= {`${candidate.name}`} />
             </Link>
              <div className = "dropdown-content">
                <p> {candidate.full_name} </p>
                <p> {candidate.party} </p>
              </div>
          </div>
        )
      }
    })
        
  return (
    <div> 
        <header>
        </header>
      <div className='candidate-bar'>
        {mappedCandidates}
      </div>
    </div>
  )
  }
}

const mapStateToProps = state => ({
  candidates: state.candidates,
  selectedCandidate: state.selectedCandidate
})

const mapDispatchToProps = dispatch => {
  return {
    setCandidate: candidate => {
      dispatch(actions.setSelectedCandidate(candidate))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CandidatesBar));