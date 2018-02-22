import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Actions';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';
import './BarGraph.css';
import {getAllContributions, initialExpenditureFetch} from '../../Helper/helper';



export class BarGraph extends Component {
  constructor() {
    super();
    this.state = {
      contributions: [],
      expenditures: []
    }
  }
  
  componentDidMount = async () => {
    let contributionData;
    let expenditureData;
    if(!localStorage.contributions){
      contributionData = await getAllContributions();
      localStorage.setItem('contributions', JSON.stringify(contributionData))
    } else {
      contributionData = JSON.parse(localStorage.getItem('contributions')); 
    }
    this.props.handleContributions(contributionData);

    const organizedContributionData = contributionData.map(contribution => {
      return {
        candidate: ((contribution.candidate_name).split(' '))[((contribution.candidate_name).split(' ')).length-1], 
        totalNumberContributions: contribution.candidate_contributions, 
        totalCashContributions: contribution.candidate_cash,
        averageContribution: (contribution.candidate_cash/contribution.candidate_contributions)};
    });
    this.setState({contributions: organizedContributionData});
  

    

    if(!localStorage.expenditures){
      expenditureData = await initialExpenditureFetch();
      localStorage.setItem('expenditures', JSON.stringify(expenditureData))
      
    } else {
      expenditureData = JSON.parse(localStorage.getItem('expenditures'))
      this.props.handleExpenditures(expenditureData);
    }
    this.props.handleExpenditures(expenditureData);
    const organizedExpenditureData = expenditureData.map(expenditure => {
      return {candidate: ((expenditure.candidate_name).split(' '))[((expenditure.candidate_name).split(' ')).length-1], totalExpences: expenditure.candidate_expences};
    });
    this.setState({expenditures: organizedExpenditureData});
  }

  alphabetizeData = () => {
    const alphabetizedContibutions = this.state.contributions.sort((a, b) => {
      if (a.candidate < b.candidate) return -1;
      if (a.candidate > b.candidate) return 1;
      return 0;
    });
    this.setState({candidates: alphabetizedContibutions})

    const alphabetizedExpenditures = this.state.expenditures.sort((a, b) => {
      if (a.candidate < b.candidate) return -1;
      if (a.candidate > b.candidate) return 1;
      return 0;
    });
    this.setState({candidates: alphabetizedExpenditures})
  }

  sortData = () => {
    const sortedContributions = this.state.contributions.sort((a, b) => {
      return b.totalCashContributions - a.totalCashContributions
    })

    this.setState({contributions: sortedContributions})
  }

  sortAverage = () => {
    const sortedByAverage = this.state.contributions.sort((a,b) => {
      return b.averageContribution - a.averageContribution;
    })

    this.setState({ contributions: sortedByAverage })
  }



  render() {
    return (
      <div>
        <div className= 'filter-btns'>
          <button onClick = {this.alphabetizeData}>Aphabetical</button>
          <button onClick = {this.sortData}>Most Raised</button>
          <button onClick = {this.sortAverage}>Average Contribution</button>
        </div>
        <div>
          <VictoryChart
            domainPadding={10}
            height = {200}
            width = {500}
            >
            <VictoryAxis
              tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
              tickFormat={this.state.contributions.map(contribution => contribution.candidate)}
              style={{
                tickLabels: {fontSize: '6px'}
              }}
              tickLabelComponent= {<VictoryLabel angle={45}/>}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (`${x / 1000}k`)}
              style={{
                tickLabels: {fontSize: '6px'}
              }}
            />
            <VictoryBar 
              data = {this.state.contributions}
              x = 'candidate'
              y = 'totalNumberContributions'/>
          </VictoryChart>
        </div>
        <div>
          <VictoryChart
            domainPadding={10}
            height = {200}
            width = {400}
            style={{
              tickLabels: {fontSize: '6px'}
            }}>
            <VictoryAxis
              tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
              tickFormat={this.state.contributions.map(contribution => contribution.candidate)}
              style={{
                tickLabels: {fontSize: '6px'}
              }}
              tickLabelComponent= {<VictoryLabel angle={45}/>}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (`${x / 1000}k`)}
              style={{
                tickLabels: {fontSize: '6px'}
              }}
            />
            <VictoryBar 
              data = {this.state.contributions}
              x = 'candidate'
              y = 'totalCashContributions'/>
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
              tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}
              tickFormat={this.state.expenditures.map(expenditure => expenditure.candidate)}
              style={{
                tickLabels: {fontSize: '6px'}
              }}
              tickLabelComponent= {<VictoryLabel angle={45}/>}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (`$${x / 1000}k`)}
              style={{
                tickLabels: {fontSize: '6px'}
              }}
            />
            <VictoryBar 
              data = {this.state.expenditures}
              x = 'candidate'
              y = 'totalExpences'/>
          </VictoryChart>
        </div>
        
      </div>
      
    );
  }

}

const mapStateToProps = state => ({
  contributions: state.contributions,
  expenditures: state.expenditures
});

const mapDispatchToProps = dispatch => {
  return {
    handleContributions: contributions => {
      dispatch(actions.addContributionsToStore(contributions))
    },
    handleExpenditures: expenditures => {
      dispatch(actions.addExpendituresToStore(expenditures))

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarGraph);