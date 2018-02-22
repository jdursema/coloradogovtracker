import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Actions';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';
import './BarGraph.css';
import { initialTotalsFetch } from '../../Helper/helper';



export class BarGraph extends Component {
  constructor() {
    super();
    this.state = {
      candidates: []
    };
  }
  
  componentDidMount = async () => {
    let totalsData = await initialTotalsFetch();
    this.props.handleCandidateTotals(totalsData);
    this.setState({candidates: totalsData});
  }

  alphabetizeData = () => {
    const alphabetizedCandidates = this.state.candidates.sort((a, b) => {
      if (a.name.split(' ')[1] < b.name.split(' ')[1]) return -1;
      if (a.name.split(' ')[1] > b.name.split(' ')[1]) return 1;
      return 0;
    });
    this.setState({candidates: alphabetizedCandidates});
  }

  sortData = () => {
    const sortedContributions = this.state.candidates.sort((a, b) => {
      return b.contributionTotal - a.contributionTotal;
    });

    this.setState({contributions: sortedContributions});
  }

  sortAverage = () => {
    const sortedByAverage = this.state.candidates.sort((a,b) => {
      return b.avgContribution - a.avgContribution;
    });

    this.setState({ contributions: sortedByAverage });
  }

  candidateColor = (party) => {
    if( party === 'Republican'){
      return 'red'
    } else if (party === 'Democrat'){
      return 'blue'
    } else {
      return 'gray'
    }
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
              tickFormat={this.state.candidates.map(candidate => candidate.name.split(' ')[1] )}
              style={{
                tickLabels: {fontSize: '6px'}
              }}
              tickLabelComponent= {<VictoryLabel angle={45} offsetX = {10}/>}
            />
            <VictoryAxis
              dependentAxis
              label = "Total Contributions ($)"
              tickFormat={(x) => (`${x / 1000000}m`)}
              style={{
                tickLabels: {fontSize: '6px'}
              }}
            />
            <VictoryBar 
              data = {this.state.candidates}
              x = 'name'
              y = 'contributionTotal'
              style = {{
                data: {
                  fill: (d) => this.candidateColor(d.party),
                }
              }}
              events={[{
                target: "data",
                eventHandlers: {
                  onMouseOver: () => {
                    return [
                      {
                        target: "data",
                        mutation: (props) => {
                          const fill = props.style && props.style.fill;
                          return fill === "yellow" ? null : { style: { fill: "yellow" } };
                        }
                      },
                      {
                        target: 'labels',
                        mutation: (props) => {
                          return props.text === props.datum.contributionTotal ? null : {text: props.datum.contributionTotal };
                        }
                      }

                      
                    ];
                  },
                  onMouseOut: () => {
                    return [
                      { target: "data",
                        mutation: () => {
                          return null;
                        }
                      },
                      { target: 'labels',
                        mutation: () => {
                          return null;
                        }}

                    ];
                  }
                }
              }]}/>
          </VictoryChart>
        </div>
        <div>
          <VictoryChart
            domainPadding={10}
            height = {200}
            width = {500}
            >
            <VictoryAxis
              tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
              tickFormat={this.state.candidates.map(candidate => candidate.name.split(' ')[1] )}
              style={{
                tickLabels: {fontSize: '6px'}
              }}
              tickLabelComponent= {<VictoryLabel angle={45} offsetX = {10}/>}
            />
            <VictoryAxis
              dependentAxis
              label = "Total Contributions (#)"
              tickFormat={(x) => (`${x / 1000000}m`)}
              style={{
                tickLabels: {fontSize: '6px'}
              }}
            />
            <VictoryBar 
              data = {this.state.candidates}
              x = 'name'
              y = 'contributionNum'
              style = {{
                data: {
                  fill: (d) => this.candidateColor(d.party),
                }
              }}
              events={[{
                target: "data",
                eventHandlers: {
                  onMouseOver: () => {
                    return [
                      {
                        target: "data",
                        mutation: (props) => {
                          const fill = props.style && props.style.fill;
                          return fill === "yellow" ? null : { style: { fill: "yellow" } };
                        }
                      },
                      {
                        target: 'labels',
                        mutation: (props) => {
                          return props.text === props.datum.contributionTotal ? null : {text: props.datum.contributionTotal };
                        }
                      }

                      
                    ];
                  },
                  onMouseOut: () => {
                    return [
                      { target: "data",
                        mutation: () => {
                          return null;
                        }
                      },
                      { target: 'labels',
                        mutation: () => {
                          return null;
                        }}

                    ];
                  }
                }
              }]}/>
          </VictoryChart>
        </div>
  
  
        <div>
          <VictoryChart
            domainPadding={10}
            height = {200}
            width = {500}
            >
            <VictoryAxis
              tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
              tickFormat={this.state.candidates.map(candidate => candidate.name.split(' ')[1] )}
              style={{
                tickLabels: {fontSize: '6px'}
              }}
              tickLabelComponent= {<VictoryLabel angle={45} offsetX = {10}/>}
            />
            <VictoryAxis
              dependentAxis
              label = "Total Expenditures ($)"
              tickFormat={(x) => (`${x / 1000000}m`)}
              style={{
                tickLabels: {fontSize: '6px'}
              }}
            />
            <VictoryBar 
              data = {this.state.candidates}
              x = 'name'
              y = 'expenditureTotal'
              style = {{
                data: {
                  fill: (d) => this.candidateColor(d.party),
                }
              }}
              events={[{
                target: "data",
                eventHandlers: {
                  onMouseOver: () => {
                    return [
                      {
                        target: "data",
                        mutation: (props) => {
                          const fill = props.style && props.style.fill;
                          return fill === "yellow" ? null : { style: { fill: "yellow" } };
                        }
                      },
                      {
                        target: 'labels',
                        mutation: (props) => {
                          return props.text === props.datum.contributionTotal ? null : {text: props.datum.contributionTotal };
                        }
                      }

                      
                    ];
                  },
                  onMouseOut: () => {
                    return [
                      { target: "data",
                        mutation: () => {
                          return null;
                        }
                      },
                      { target: 'labels',
                        mutation: () => {
                          return null;
                        }}

                    ];
                  }
                }
              }]}/>
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
    handleCandidateTotals: totals => {
      dispatch(actions.addCandidateTotalsToStore(totals))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BarGraph);