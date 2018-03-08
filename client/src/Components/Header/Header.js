import React, {Component} from 'react';
import './Header.css';
import trackerLogo from '../../images/gov_tracker_logo_dkblue-04.png';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSelectedCandidate } from '../../Helper/helper.js';
import * as actions from '../../Actions/index.js';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  
  mapCandidateSelect = () => {
    const mappedCandidates = this.props.candidates.map((candidate, index) => {
      if (candidate.active === true) {
     
        return (
          <option key = {index} value = {candidate.committee_id}>
            {candidate.full_name}
          </option>
        );
      }
    });
    return mappedCandidates;
  }

  selectCandidate = async(event, candidateId) => {
    const candidateData = await getSelectedCandidate(candidateId);
    this.props.setCandidate(candidateData);
    this.props.history.push(`/candidates/${candidateId}`);
  }


  render() {
    return (
      <div className = "app-header"> 
        <div className = "logo-div" onClick= {() => {
          this.props.history.push('/')
        }}>
        <img src = {trackerLogo} className = "tracker-logo" alt = 'logo' />
        </div>
        <div className = "header-select">
          <select className = "candidate-select" onChange = {(event) => this.selectCandidate(event, event.target.value)}>
            <option> Select a candidate </option>
            {this.mapCandidateSelect()}
          </select>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  candidates: state.candidates
});

const mapDispatchToProps = dispatch => {
  return {
    setCandidate: candidate => {
      dispatch(actions.setSelectedCandidate(candidate));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

Header.propTypes = {
  candidates: PropTypes.string,
  setCandidate: PropTypes.func,
  history: PropTypes.object

};