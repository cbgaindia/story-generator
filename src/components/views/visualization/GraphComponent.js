import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {
  Hint,
  HorizontalGridLines,
  MarkSeries,
  VerticalGridLines,
  XAxis,FlexibleXYPlot,
  XYPlot,VerticalBarSeries,
  DiscreteColorLegend,
  DynamicHints,
  YAxis
} from 'react-vis';

import "../../../../node_modules/react-vis/dist/style.css";
import { expenditure_metadata } from "../../../data/expenditure_data_metadata";
import { concordance_data } from "../../../data/concordance_data";

const {LEFT, RIGHT, TOP, BOTTOM_EDGE, RIGHT_EDGE, TOP_EDGE} =
  Hint.ALIGN;

class GraphComponent extends React.Component {
  constructor(){
    super();
    this.state = {
      value : [],
      selectedAttr:null,
      selectedFigures:null,
      stateOptions:null,
      hoverValue:null,
      indicatorUnit:null,
      notesText:null,
      vizActive:true,
      concordanceData:null  
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.getStateFigures = this.getStateFigures.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
    this.onBarHover =this.onBarHover.bind(this);
    this.outBarHover = this.outBarHover.bind(this);
    this.showConcordanceData = this.showConcordanceData.bind(this);
    this.updateConcordanceData = this.updateConcordanceData.bind(this);
  }

  componentWillMount(){
    this.updateNotes();
    this.updateConcordanceData();
  }

  componentDidMount(){
    this.setState({selectedAttr:this.props.attrType,indicatorUnit:this.props.data.unit});
    this.getStateFigures();   
  }

  componentDidUpdate(prevProps, prevState){
    if (this.state.selectedAttr != this.props.attrType){
      this.setState({selectedAttr:this.props.attrType});
    }
    if(this.state.indicatorUnit != this.props.data.unit){
      this.setState({indicatorUnit:this.props.data.unit});
    }
    if(prevState.value != this.state.value || prevState.selectedAttr != this.state.selectedAttr || prevProps.data !=this.props.data ){
      if(this.state.value.length != 0){
      let stateArray = this.state.value.split(",");
      let selectedFigures = [];

      for(let selectedState in stateArray){
        selectedFigures.push(this.props.data.stateFigures.find(function(value, index) {
        if(value.state == stateArray[selectedState]){
          return value.state;
           } 
         }
        ));
      }
      let currentState = this.state;
      let mungedFigures = [];
      selectedFigures.map(function(value, index){
        let tempState = {};
        tempState.name = value.state;
        tempState.figures = [];
      
        value.figures[currentState.selectedAttr].map(function(figure, index){
          let tempFigure = {};
          tempFigure.x = Object.keys(figure)[0];
          tempFigure.y = parseFloat(figure[Object.keys(figure)[0]]);
          tempFigure.state = value.state;
          tempState.figures.push(tempFigure);
        });

        mungedFigures.push(tempState);
      });
      
      if(this.state.value[0] == null && prevState.value != null){
        this.setState({selectedFigures:null});
      }
      else{
      this.setState({selectedFigures:mungedFigures});
     }
    }
  }
   
    if(prevProps.selectedSector != this.props.selectedSector){
      this.updateConcordanceData();
    }

    if(prevProps.selectedSector != this.props.selectedSector || prevProps.data.slugIndicator != this.props.data.slugIndicator){
          this.updateNotes();
    }
  }


  updateNotes(){
      let self = this;
      let description = expenditure_metadata.find(function(record, index){
        if(record.slugSector == self.props.selectedSector && record.slugIndicator == self.props.data.slugIndicator){
          return record;
        }
      });
      this.setState({notesText :description});
    }

  updateConcordanceData(){
    let selected_sector = this.props.selectedSector;
    let sector_notes = concordance_data.find(function(sector){
      if(sector.slugSector == selected_sector){
        return sector;
      }
    });
    this.setState({concordanceData : sector_notes});
  }

  showConcordanceData(){
    this.setState({vizActive:this.state.vizActive? false : true});
  }

  getStateFigures(){
    let statesData = [];
    for(let state in this.props.data.stateFigures){
      let temp = {};
      temp.value = this.props.data.stateFigures[state].state;
      temp.label = this.props.data.stateFigures[state].state;
      statesData.push(temp);
    }
    this.setState({stateOptions:statesData});
  }

    onBarHover(d, info){
      this.setState({hoverValue:d});
    }

    outBarHover(d, info){
      this.setState({hoverValue:null});
    }

    handleSelectChange (value) {
      this.setState({ value });
    }

render (){
    let accessthis =this;
    const attributeKey = {"BE":" Budget Estimates", "RE":"Revised Estimates", "A":"Actuals"};
    const color = ['#26393D','#40627C','#D0A825','#D64700','#002A4A','#A7A37E','#B9121B','#1B1E26'].reverse();
  
    return(
      <div id="card-container">
        <div className="row selected-params">
          <div className="row">
            <div className="col-lg-10 indicator-title-wrapper">
              <h3 className="indicator-title">{this.props.selectedIndicator} 
            </h3>
            </div>
            <div className="col-lg-2 know-more-text">
              <a className= "know-more-link" onClick={this.showConcordanceData}>Know More</a>     
            </div>
            
          </div>

          <div className="row">
            <div className="col-lg-8 sub-text">
              <h4 className="sector-title">
                {this.props.sectorName}
              </h4>
            </div>
          
          </div>  
          <div className="row row-sub-text">
            <div className="col-lg-8 sub-text">
              <h5 className="budgetattr-year">
                {attributeKey[this.state.selectedAttr]}
              </h5>      
            </div>
            <div className="col-lg-4 sub-text">
              <h5 className="figures-unit">Unit : Figures in {this.state.indicatorUnit}</h5>
            </div>
          </div>
        </div> 
     <div className="vis-wrapper" style={this.state.vizActive?{"overflow-y":"hidden"}:{"overflow-y":"scroll"}}>
     {
      this.state.vizActive?
      (
        <div className="container-fluid graph-container">
          <div className="row">
            <div className="select-container">
              <div className="col-lg-12 state-select">
                <Select multi={true} simpleValue value={this.state.value} placeholder="Select a State" options={this.state.stateOptions} onChange={this.handleSelectChange} />
              </div>
            </div>
          </div>
          {this.state.value[0] != null && this.state.selectedFigures !=null ? 
            (<div className="row legend-row">
              <DiscreteColorLegend
                orientation="horizontal"
                items={this.state.selectedFigures.map(function(value,index){
                  return {title: value.name, color:color[index]};
                  })
                }
              />
            </div>)
            :
            (<div></div>)
          }
          <div className="row graph-area">
            {this.state.value[0] != null && this.state.selectedFigures !=null? (
              <div id="chart">
                <XYPlot
                  width={600}
                  height={300} 
                  xType="ordinal"
                  margin={{top:20, left:40, right:0, bottom:40}}>
                <HorizontalGridLines />
                
                <VerticalGridLines />
                {this.state.selectedFigures.map(function(state, index){ 
               
                return(
                  <VerticalBarSeries
                    color={color[index]}
                    onValueMouseOver = {accessthis.onBarHover}
                    onValueMouseOut = {accessthis.outBarHover}
                    data={state.figures}
                    key={state.name}
                    />
                    );
                })
              } 
             
              <XAxis title="Fiscal Years" />
              <YAxis title ="Indicator"/>

              {this.state.hoverValue ? 
              (<Hint value={this.state.hoverValue}  >
                  <div className="rv-hint__content">
                    <div>
                      <span className="rv-hint__title"> {this.state.hoverValue.state}</span>
                      <br />
                      <span className="rv-hint__title">Fiscal Year : </span>
                      <span className="rv-hint__value">{this.state.hoverValue.x}</span>
                    </div>
                    <div>
                      <span className="rv-hint__title">Figure : </span>
                      <span className="rv-hint__value">{this.state.hoverValue.y}</span>
                    </div>
                  </div> 
              </Hint>)
              :null
              }
            </XYPlot>
          </div>
          ):
            (<div className="col-lg-12 select-placeholder">
              <div className="jumbotron">
                <h2 className="text-center">Select states to generate Visualization</h2>
              </div>
            </div>
            )
          }
          </div>
         </div>
      ):(
          <div className="concordance-container">
            <div className="panel panel-default">
            
              <div className="panel-heading"> Concordance Table <span className="close-icon"> <a className= "close-link" onClick={this.showConcordanceData}><i className="fa fa-times" aria-hidden="true"></i></a></span> </div>

              <table className="table">
                <thead> 
                  <tr> 
                    <th>States</th> 
                    <th>Details of the Budget Document from which data have been recorded</th> 
                  </tr> 
                </thead>
                <tbody>
                  {
                    this.state.concordanceData.state_value.map((state) => {
                      return(
                        <tr key={state.name}>
                          <td>{state.name}</td>
                          <td>{state.description}</td>
                        </tr>);
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        )
     }   
      
       </div>
       <div className="row indicator-description">
        Source - {this.state.notesText.source}  
      </div>
     </div>
    );
  }
}

GraphComponent.propTypes = {
   data: React.PropTypes.object,
   attrType:React.PropTypes.string,
   selectedSector:React.PropTypes.string,
   selectedIndicator:React.PropTypes.string,
   sectorName:React.PropTypes.string
};

export default GraphComponent;