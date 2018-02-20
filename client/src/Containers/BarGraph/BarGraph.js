import React from 'react';
import { connect } from 'react-redux';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import './BarGraph.css';



export const BarGraph = props => {
  let contributionData = [];
  let candidateName = [];
  let cashData = []


  if (props.contributions.length){
    //   data = [
    //   {candidate: props.contributions[0].candidate_name, totalContributions: props.contributions[0].candidate_contributions},
    //   {candidate: props.contributions[1].candidate_name, totalContributions: props.contributions[1].candidate_contributions},
    //   {candidate: props.contributions[2].candidate_name, totalContributions: props.contributions[2].candidate_contributions},
    //   {candidate: props.contributions[3].candidate_name, totalContributions: props.contributions[3].candidate_contributions},
    //   {candidate: props.contributions[4].candidate_name, totalContributions: props.contributions[4].candidate_contributions}
    // ]
    contributionData = props.contributions.map(contribution => {
      return {candidate: contribution.candidate_name, totalContributions: contribution.candidate_contributions}
    })
    // candidateName = [
    //   props.contributions[0].candidate_name,
    //   props.contributions[1].candidate_name,
    //   props.contributions[2].candidate_name, 
    //   props.contributions[3].candidate_name,
    //   props.contributions[4].candidate_name
    // ]
    cashData = props.contributions.map(contribution => {
      return {candidate: contribution.candidate_name, totalContributions: contribution.candidate_cash}
    })

    candidateName = props.contributions.map(contribution => ((contribution.candidate_name).split(' '))[1])
  }
  return (
    <div>
      <div>
        <VictoryChart
          domainPadding={20}
          height = {200}
          width = {400}
          style = {{
            labels: {fontSize: 6}
          }}>
          <VictoryAxis
            tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
            tickFormat={candidateName}
            style = {{
              labels: {fontSize: 6}
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => (`${x / 1000}k`)}
            style = {{
              labels: {fontSize: 6}
            }}
          />
          <VictoryBar 
            data = {contributionData}
            x = 'candidate'
            y = 'totalContributions'/>
        </VictoryChart>
      </div>
      <div>
        <VictoryChart
          domainPadding={20}
          height = {200}
          width = {400}
          style = {{
            labels: {fontSize: 6}
          }}>
          <VictoryAxis
            tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
            tickFormat={candidateName}
            style = {{
              labels: {fontSize: 6}
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => (`$${x / 1000000}m`)}
            style = {{
              labels: {fontSize: 6}
            }}
          />
          <VictoryBar 
            data = {cashData}
            x = 'candidate'
            y = 'totalContributions'/>
        </VictoryChart>
      </div>
    </div>
    
  )
}

const mapStateToProps = state => ({
  contributions: state.contributions
})

export default connect(mapStateToProps, null)(BarGraph);