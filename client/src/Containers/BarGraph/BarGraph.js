import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Actions';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from 'victory';
import './BarGraph.css';
import { initialTotalsFetch } from '../../Helper/helper';
import Scrollchor from 'react-scrollchor';
import PropTypes from 'prop-types';



export class BarGraph extends Component {
  constructor() {
    super();
    this.state = {
      candidates: [],
      active: 2
    };
  }
  
  componentDidMount = async () => {
    let totalsData = await initialTotalsFetch();
    this.props.handleCandidateTotals(totalsData);
    this.setState({candidates: totalsData});
    this.sortData(2);
    this.setState({active:2});
  }

  alphabetizeData = (position) => {
    const alphabetizedCandidates = this.state.candidates.sort((a, b) => {
      if (a.name.split(' ')[1] < b.name.split(' ')[1]) return -1;
      if (a.name.split(' ')[1] > b.name.split(' ')[1]) return 1;
      return 0;
    });
    this.setState({candidates: alphabetizedCandidates});
    this.toggleActive(position);
  }

  sortData = (position) => {
    const sortedContributions = this.state.candidates.sort((a, b) => {
      return b.contributionTotal - a.contributionTotal;
    });

    this.setState({contributions: sortedContributions});
    this.toggleActive(position);
  }

  sortAverage = (position) => {
    const sortedByAverage = this.state.candidates.sort((a, b) => {
      return b.avgContribution - a.avgContribution;
    });

    this.setState({ contributions: sortedByAverage });
    this.toggleActive(position);
  }

  candidateColor = (party) => {
    if ( party === 'Republican'){
      return '#a2000b';
    } else if (party === 'Democrat'){
      return '#184982';
    } else {
      return '#ecebeb';
    }
  }

   toggleActive = (position) => {
     if (this.state.active === position) {
       this.setState({active : null });
     } else {
       this.setState({active: position});
     }
   }

  activeClass = (position) => {
    if (this.state.active === position) {
      return 'filter-button active';
    } return 'filter-button';
  }


  render() {
    return (
      <div className = 'all-bar-graphs'>
        <div className= 'filter-btns center'>

          <button className = {this.activeClass(1)} onClick = {() => this.alphabetizeData(1)}>Aphabetical</button>
          <button className = {this.activeClass(2)} onClick = {() => this.sortData(2)}>Most Raised</button>
          <button className = {this.activeClass(3)} onClick = {() => this.sortAverage(3)}>Average Contribution</button>
        </div>
        <div className='bar-graph'>
          <h3 className='graph-title'>Total Contributions ($)</h3>
          <VictoryChart
            domainPadding={10}
            height = {400}
            width = {1000}
          >
            <VictoryAxis
              tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
              tickFormat={this.state.candidates.map(candidate => candidate.name.split(' ')[1] )}
              style={{
                tickLabels: {fontSize: '12px', fontFamily: 'Open Sans'}
              }}
              tickLabelComponent= {<VictoryLabel angle={45} dx = {12}/>}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (`${x / 1000000}m`)}
              style={{
                axisLabel: {fontSize: '8px', fontFamily: 'Open Sans', padding: 30}
              }}
            />
            <VictoryBar 
              data = {this.state.candidates}
              x = 'name'
              y = 'contributionTotal'
              style = {{
                data: {
                  fill: (d) => this.candidateColor(d.party)
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
                          return fill === "#ffcd2f" ? null : { style: { fill: "#ffcd2f" } };
                        }
                      },
                      {
                        target: 'labels',
                        mutation: (props) => {
                          return props.text === props.datum.contributionTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) ? null : {text: props.datum.contributionTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) };
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
        <div className='bar-graph'>
          <h3 className='graph-title'>Total Contributions (#)</h3>
          <VictoryChart
            domainPadding={10}
            height = {400}
            width = {1000}
          >
            <VictoryAxis
              tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
              tickFormat={this.state.candidates.map(candidate => candidate.name.split(' ')[1] )}
              style={{
                tickLabels: {fontSize: '12px'}
              }}
              tickLabelComponent= {<VictoryLabel angle={45} dx={12}/>}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (`${x / 1000}k`)}
            />
            <VictoryBar 
              data = {this.state.candidates}
              x = 'name'
              y = 'contributionNum'
              style = {{
                data: {
                  fill: (d) => this.candidateColor(d.party)
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
                          return props.text === props.datum.contributionNum.toLocaleString() ? null : {text: props.datum.contributionNum.toLocaleString() };
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
  
  
        <div className='bar-graph'>
          <h3 className='graph-title'>Total Expenditures ($)</h3>
          <VictoryChart
            domainPadding={10}
            height = {400}
            width = {1000}
          >
            <VictoryAxis
              tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
              tickFormat={this.state.candidates.map(candidate => candidate.name.split(' ')[1] )}
              style={{
                tickLabels: {fontSize: '12px'}
              }}
              tickLabelComponent= {<VictoryLabel angle={45} dx={12}/>}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (`${x / 100000}k`)}
            />
            <VictoryBar 
              data = {this.state.candidates}
              x = 'name'
              y = 'expenditureTotal'
              style = {{
                data: {
                  fill: (d) => this.candidateColor(d.party)
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
                          return props.text === props.datum.expenditureTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) ? null : {text: props.datum.expenditureTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) };
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
        <div className = "scroll-top">
          <Scrollchor to= '#home-id' className="top-button"> Top </Scrollchor>
        </div>
      </div>
      
    );
  }

}



const mapDispatchToProps = dispatch => {
  return {
    handleCandidateTotals: totals => {
      dispatch(actions.addCandidateTotalsToStore(totals));
    }
  };
};

export default connect(null, mapDispatchToProps)(BarGraph);

BarGraph.propTypes = {
  handleCandidateTotals: PropTypes.func
};