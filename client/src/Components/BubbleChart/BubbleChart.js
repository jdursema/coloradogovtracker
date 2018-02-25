import React, { Component } from 'react';
import ReactBubbleChart from 'react-bubble-chart';
import { connect } from 'react-redux';
import './style.css'

var colorLegend = [
  //reds from dark to light
  {color: "#67000d", text: 'Negative', textColor: "#ffffff"}, "#a50f15", "#cb181d", "#ef3b2c", "#fb6a4a", "#fc9272", "#fcbba1", "#fee0d2",
  //neutral grey
  {color: "#00798C", text: 'Neutral'},
  // blues from light to dark
  "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", {color: "#08306b", text: 'Positive', textColor: "#ffffff"}
];

class BubbleChart extends Component {
  constructor (props) {
    super(props);
    this.state = {
      candidateData: []
    }
  }

  

  componentWillReceiveProps (nextProps) {
    const candidateData = nextProps.candidateTotals.map(candidate => {
      return ({
        _id: candidate.candidateId,
        value: parseInt(candidate.avgContribution),
        displayText: candidate.name,
        colorValue: 'Neutral'
      })
    })
    const totalCash= nextProps.candidateTotals.reduce((acc, candidate) => {
    acc += (candidate.averageContribution*candidate.contributionNum)
        return acc
      },0)

    const totalContributions = nextProps.candidateTotals.reduce((acc, candidate) => {
        acc += candidate.contributionNum
      }, 0)

    candidateData.push({_id: 'avgCont', value: totalCash/totalContributions, colorValue: 'Neutral'})


    
  this.setState({ candidateData: candidateData })

  }

  render () {
    return <ReactBubbleChart
        data = {this.state.candidateData}
        colorLegend = {colorLegend}
        
        />
    
  }

}


const mapStateToProps = state => ({
  candidateTotals: state.candidateTotals
})

export default connect(mapStateToProps, null)(BubbleChart);