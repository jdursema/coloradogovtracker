import React, {Component} from 'react';
import './Header.css';
import trackerLogo from '../../images/gov_tracker_logo_dkblue-04.png'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props)
  }
  
  mapCandidateSelect = () => {
   const mappedCandidates = this.props.candidates.map((candidate, index) => {
    if(candidate.active === true) {
     
      return (
        <option key = {index} value = {candidate.committee_id}>
          {candidate.full_name}
        </option>
      )
    }
   })
   return mappedCandidates
  }

  selectCandidate = (event, id) =>{
    console.log(id)
  }


  render() {
  return (
    <div> 
        <img src = {trackerLogo} className = "tracker-logo" alt = 'logo' />
        <select onChange = {(event) => this.selectCandidate(event, event.target.value)}>
          <option> Select a candidate </option>
          {this.mapCandidateSelect()}
        </select>
    </div>
  )
  }
}

const mapStateToProps = state => ({
  candidates: state.candidates
})

export default withRouter(connect(mapStateToProps, null)(Header));