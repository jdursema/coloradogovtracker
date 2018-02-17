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

  // mappedCandidates = () => {
  //   this.props.candidates.candidates.map((candidate) => {
    
  //       return (
  //         <div className='candidate-img' onClick={() => this.selectCandidate(candidate.committee_id)}>
  //           <Link to = {`/candidates/${candidate.committee_id}`}>
  //             <img className="candidate-img" src={`${candidate.image}`} alt= {`${candidate.name}`} />
  //           </Link>
  //         </div>
  //       )
      
  //   })
  // }

  render() {
    const mappedCandidates = this.props.candidates.candidates.map((candidate) => {
      if (candidate.active === true) {
        return (
          <div className='candidate-img' onClick={() => this.selectCandidate(candidate.committee_id)}>
            <Link to = {`/candidates/${candidate.committee_id}`}>
              <img className="candidate-img" src={`${candidate.image}`} alt= {`${candidate.name}`} />
            </Link>
          </div>
        )
      }
    })
        
  return (
    <div> 
        <header>
          <h1> Colorado Governor Tracker </h1>
        </header>
      <div className='candidate-bar'>
        {mappedCandidates}
      </div>
    </div>
  )
  }
}

const mapStateToProps = state => ({
  candidates: state.candidates
})

const mapDispatchToProps = dispatch => {
  return {
    setCandidate: candidate => {
      dispatch(actions.setSelectedCandidate(candidate))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CandidatesBar));