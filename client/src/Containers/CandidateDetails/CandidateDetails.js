import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import * as actions from '../../Actions/';
import { getSelectedCandidate } from '../../Helper/helper';
import { VictoryPie, VictoryChart, VictoryBar, VictoryAxis, VictoryLabel } from 'victory';
import ContributionContainer from '../../Components/ContributionContainer/ContributionContainer.js';
import './CandidateDetails.css';
import Header from '../../Components/Header/Header.js';
import handshake from '../../images/handshake.png';
import dollar from '../../images/dollar-symbol.png';
import profile from '../../images/profile.png';
import PropTypes from 'prop-types';




class CandidateDetails extends Component {
  constructor(props) {
    super(props);
  }



setCandidateRoute = (async() => {
  const idArray = Object.values(this.props.match.params);
  const candidateId = idArray[0];
  const candidateData = await getSelectedCandidate(candidateId);
  if (candidateData) {
    this.props.setCandidate(candidateData);
  }
});

 formatNumber = (amount) => {
   let formattedNumber = (amount + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
     return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
   });
   return formattedNumber;
 
 }

getCandidateInfo = () => {
  if (this.props.selectedCandidate.name) {
    const { image, party, contributionTotal, contributionNum, avgContribution} = this.props.selectedCandidate;
    return (
      <div className = "candidate-info">


        <img className="details-image"src = {image} />
        <p> {party}</p>
        <div className = "stat-details">

          <div className = "details-stat details-stat1">
            <div className = "details-icon">
              <img src = {dollar} alt = "dollar sign" />
            </div>
            <div className = "numbers">
              <span className = "big-number">
              ${this.formatNumber(contributionTotal)}
              </span>
              <span className = "number-description">
                Total money raised
              </span>
            </div>
          </div>
          <div className = "details-stat details-stat1">
            <div className = "details-icon">
              <img src = {handshake} alt = "handshake" />
            </div>
            <div className = "numbers">
              <span className = "big-number">
                {this.formatNumber(contributionNum)}
              </span>
              <span className = "number-description">
                Contributions reported
              </span>
            </div>
          </div>
          <div className = "details-stat details-stat1">
            <div className = "details-icon">
              <img src = {profile} alt = "handshake" />
            </div>
            <div className = "numbers">
              <span className = "big-number">
               ${this.formatNumber(avgContribution)}
              </span>
              <span className = "number-description">
                Average contribution 
              </span>
            </div>
            
          </div>
          <button className='webpage-btn' onClick={()=> window.open(this.props.selectedCandidate.website, "_blank")}>Candidate Site</button>

        </div>
      </div>
     
    );
  } else {
    this.setCandidateRoute();
  }
}





render () {
  console.log(this.props.selectedCandidate.website)
  window.scrollTo(0, 0);


  return (

    <div className = "candidate-details">
      <div className = "details-head">
    
        <Header />
        <div className = "details-name-div">
          <h1>{this.props.selectedCandidate.name}</h1>
        </div>
      </div>

      <div className = "details-content">

        <div className = "candidate-breakdown">
          {this.getCandidateInfo()}
          
        </div>
        

        <div className = "main-details-container">
          <div className = 'charts'>
            <div>
              <h3 className='candidate-graph-title'>Percent of Total Contributions</h3>
              <VictoryPie
                data={[
                  { x: this.props.selectedCandidate.name, y: parseInt(this.props.selectedCandidate.contributionTotal) },
                  { x: 'Total', y: 7401324.15999997}
                ]}
                colorScale={["#184982", "#ecebeb"]}
                width={200}
                height={200}
                style = {{
                  labels: {
                    fontSize: '12px'
                  }
                }}
              />
            </div>
            <div>
              <h3 className='candidate-graph-title'>Average Contribution ($)</h3>
              <VictoryChart
                domainPadding={10}
                height = {200}
                width = {200}
              >
                <VictoryAxis
                  tickValues={[1, 2]}
                  tickFormat={[this.props.selectedCandidate.name, 'Overall Average']}
                  style={{
                    tickLabels: {fontSize: '10px', fontFamily: 'Open Sans'},
                    axisLabel: {fontSize: '8px', fontFamily: 'Open Sans'}
                  }}
                  tickLabelComponent= {<VictoryLabel angle={45} dx={20} dy={10}/>}
                />
                <VictoryAxis
                  dependentAxis
                />
                <VictoryBar 
                  data = {[
                    { x: this.props.selectedCandidate.name, y: parseInt(this.props.selectedCandidate.avgContribution) },
                    { x: 'Overall Average', y: 12.05}
                  ]}
                  style = {{
                    data: {
                      fill: (d) => d.x === "Overall Average" ? "#ecebeb" : "#a2000b"
                    }
                  }}
                />
              </VictoryChart>
            </div>

          </div>

          { this.props.selectedCandidate.contributions &&
      <ContributionContainer
        contributions = {this.props.selectedCandidate.contributions} />
          }
          { !this.props.selectedCandidate.contributions &&
        <p> This candidate has no recorded contributions </p>
          }
        </div>
      </div>
    </div>
  );
}
}

const mapStateToProps = state => ({
  selectedCandidate: state.selectedCandidate,
  candidates: state.candidates,
  candidateTotals: state.candidateTotals
});

const mapDispatchToProps = dispatch => {
  return {
    setCandidate: candidate => {
      dispatch(actions.setSelectedCandidate(candidate));
    }
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CandidateDetails));

CandidateDetails.propTypes = {
  match: PropTypes.object,
  setCandidate: PropTypes.func,
  selectedCandidate: PropTypes.object

};
