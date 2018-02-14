import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initialCandidatesFetch } from '../../Actions';

export class CandidatesBar extends Component {

  async componentDidMount () {
    this.props.handleCandidates();
  }

  render() {
    return (
      <div>
        all the candidates
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  handleCandidates: () => dispatch(initialCandidatesFetch())
})

export default connect(null, mapDispatchToProps)(CandidatesBar);