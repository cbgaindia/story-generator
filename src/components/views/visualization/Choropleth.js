import React, { Component } from 'react';
import {TopojsonData} from '../../../data/StatesTopojson';
import {
  Circle,
  FeatureGroup,
  LayerGroup,
  Map,
  Popup,
  Rectangle,
  TileLayer, GeoJSON
} from 'react-leaflet';
import { expenditure_metadata } from "../../../data/expenditure_data_metadata";
import 'bootstrap/dist/css/bootstrap.css';
import { concordance_data } from "../../../data/concordance_data";

let config = {};

config.params = {
  center: [23.59, 81.96],
  zoomControl:true,
  zoom: 4,
  maxZoom: 5,
  minZoom: 4,
  scrollwheel: false,
  legends: true,
  infoControl: true,
  attributionControl: false,
  dragging:false
};

config.tileLayer = {
  uri: 'https://api.mapbox.com/styles/v1/suchismitanaik/cj1nivbus001x2sqqlhmct7du/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3VjaGlzbWl0YW5haWsiLCJhIjoiY2lqMmZ5N2N5MDAwZnVna25hcjE2b2Q1eCJ9.IYx8Zoc0yNPcp7Snd7yW2A',
  params: {
    minZoom: 4,
    id: '',
    accessToken: ''
  }
};

config.geojson = {
  weight:"1",
  color:"#183152",
  fill:true
};

class YearSelector extends Component{
  render(){
    let props = this.props;
    return (
      <div className="btn-group " role="group" aria-label="...">
              {this.props.fiscalYears.map(function(item,index){
              return (
              <button type="button" key={item} value={item} className={props.selectedYear===item ? "btn btn-default focus active" : "btn btn-default"} onClick={props.handleYearChange} >{item}</button>          
              );
          })}
      </div>
    );
  }
}

YearSelector.propTypes = {
   fiscalYears: React.PropTypes.object
};


class StateToolTip extends React.Component{
  render(){ 
    if (this.props.statetooltip==null){
      return(
        <div className="statetoolPanelHeading">Please select a state from the map</div>
      );
    }
    return(
       <div>
          <div className="statetoolPanelHeading">
            <span className="glyphicon glyphicon-map-marker"></span>&nbsp;{this.props.statetooltip}</div>
            <div>
              <AllocationDetails allocations={this.props.allocations} unit={this.props.unit} />
            </div>
        </div>
      );
    }
  }

StateToolTip.propTypes = {
   statetooltip: React.PropTypes.string,
   allocations: React.PropTypes.number,
   unit:React.PropTypes.string
};

class AllocationDetails extends React.Component{
  render(){
  if(this.props.allocations ==null || isNaN(parseFloat(this.props.allocations))){
      return (
          <span>Data unavailable</span>
      );
    }
  return (
    <span> {this.props.allocations} {this.props.unit =="Percentage" ? "%" : "Rs.Crore"}</span>
    );
  }
}

AllocationDetails.propTypes = {
   allocations: React.PropTypes.number,
   unit:React.PropTypes.string
};


class LegendStep extends React.Component{
  render(){
    return (
        <li>
        <span className="legendspanside" style={{"background" :this.props.bgColor}}>{(this.props.range[0]).toFixed(2)} - {(this.props.range[1]).toFixed(2)}</span>
        </li>
      );  
  }
}

LegendStep.propTypes = {
   bgColor: React.PropTypes.string,
   range:React.PropTypes.array
};

export default class Choropleth extends Component {
    constructor(){
      super();
      this.state = {
        budgetAttr:"BE",
        selectedYear:null, 
        selectedFigure:null,
        hoverstate:null,
        hoverFigure:null,
        indicatorUnit:null,
        bandFigures:null,
        notesText:null,
        vizActive:true,
        concordanceData:null
      };

      this.computeBands = this.computeBands.bind(this);
      this.mungeData = this.mungeData.bind(this);
      this.getYearList = this.getYearList.bind(this);
      this.handleYearChange = this.handleYearChange.bind(this);
      this.getstyle = this.getstyle.bind(this);
      this.onEachFeature = this.onEachFeature.bind(this);
      this.highlightFeature = this.highlightFeature.bind(this);
      this.resetHighlight = this.resetHighlight.bind(this);
      this.setToolTipContent = this.setToolTipContent.bind(this);
      this.getBandNum = this.getBandNum.bind(this);
      this.fillColor = this.fillColor.bind(this);
      this.updateNotes = this.updateNotes.bind(this);
      this.showConcordanceData = this.showConcordanceData.bind(this);
      this.updateConcordanceData = this.updateConcordanceData.bind(this);
    }

    componentWillMount(){
      this.updateNotes();
      let MappedFigures = this.mungeData();
      this.setState({selectedFigure: MappedFigures});
      let defaultYear = this.getYearList(this.props.data)[this.getYearList(this.props.data).length -1];
      this.updateConcordanceData();
      this.setState({budgetAttr:this.props.attrType,selectedYear:defaultYear , indicatorUnit:this.props.data.unit});
      this.computeBands(MappedFigures, defaultYear);
    }

    componentDidMount(){
      let defaultYear = this.getYearList(this.props.data)[this.getYearList(this.props.data).length -1];
      this.setState({budgetAttr:this.props.attrType, selectedYear:defaultYear });
    }
    
    componentDidUpdate(prevProps, prevState){
      if(this.state.indicatorUnit != this.props.data.unit){
        this.setState({indicatorUnit:this.props.data.unit});
      }
      if(prevProps.data != this.props.data || prevProps.attrType != this.props.attrType){
        let MappedFigures = this.mungeData();
        let yearList = this.getYearList(this.props.data);
        let flag = 0;
        for(let year in yearList){
          if(this.state.selectedYear == yearList[year]){
              flag=1;
              break;
          }
        }
          
        this.setState({selectedFigure:  MappedFigures});
        if(flag==0){
          this.computeBands(MappedFigures,  yearList[yearList.length-1]);
          this.setState({selectedYear: yearList[yearList.length-1]});   
        } 
        else{
        this.computeBands(MappedFigures, this.state.selectedYear);
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

    computeBands(tempData, year){
        let data = tempData;
        let currentState = this.state;
    
        let max = Math.max.apply(null, data.features.map(function(state, index) {
          if(state.properties[year] != null && !isNaN(parseFloat(state.properties[year])) ){
            return parseFloat(state.properties[year]);
            }
          else{
            return -Infinity;
          }
          }));
        max = max + max*0.1;

        let min = Math.min.apply(null, data.features.map(function(state, index) {
          if(state.properties[year] != null && !isNaN(parseFloat(state.properties[year])) ){
            return parseFloat(state.properties[year]);
            }
          else
          {
            return Infinity;
          }
          })) ;
         min = min - min*0.1;

         let retvalue = {
          "20%":[min,min+(20*(max-min))/100,1],
           "40%":[min+(20*(max-min))/100,min+(40*(max-min))/100,2],
           "60%":[min+(40*(max-min))/100,min+(60*(max-min))/100,3],
           "80%":[min+(60*(max-min))/100,min+(80*(max-min))/100,4],
           "100%":[min+(80*(max-min))/100,min+(100*(max-min))/100,5]
           };
          this.setState({bandFigures:retvalue});
      }

    mungeData(){
      let GeoJSONData = topojson.feature(TopojsonData, TopojsonData.objects.india_state_boundaries);
      let stateFigures = this.props.data;
      let attrType = this.props.attrType;
      let MappedFigures = new Array();
      MappedFigures = GeoJSONData.features.map(function(state, index){      
        let temp = stateFigures.stateFigures.find(function(x){
        if(x.state==state.properties.NAME_1)
            return x;
        else{
          return false;
            }
        });

        if(temp != null){
          let tempFigure = temp.figures[attrType];
          for (let fiscalFigure in tempFigure){
            let tempYear = Object.keys(tempFigure[fiscalFigure])[0];
            state.properties[tempYear] = parseFloat(tempFigure[fiscalFigure][tempYear]);
            }
        }
      return state;
      });
      return {"type": "FeatureCollection", "features": MappedFigures};
    }

  getBandNum(figure){
    if(figure!=null){
    let bandFigures = this.state.bandFigures;
    let bandKeys = Object.keys(bandFigures);
    for(let band in bandKeys){
      if(figure>=bandFigures[bandKeys[band]][0] && figure<=bandFigures[bandKeys[band]][1]){
        return bandFigures[bandKeys[band]][2];
      }
    }
  }
  else{
     return 0; 
    }
  }

  fillColor(band){
     if (band===0 || band ==null){
      return "#BFBFBF";
     }
     if(band===1){
      return "#B3EAFF";
     }
     if(band===2){
      return "#73D9FF";
     }
     if(band===3){
      return "#40C1F3";
     }
     if(band===4){
      return "#4094B3";
     }
     if(band===5){
      return "#406573 ";
     }
   }


    getstyle (feature){
      let selectedYear = this.state.selectedYear;
      return{
        fillColor: this.fillColor(this.getBandNum(feature.properties[selectedYear])),
        weight: 1.3,
        opacity: 1,
        color: 'grey',
        dashArray:0,
        fillOpacity: 0.8
      };
    }

    handleYearChange(e){
      this.computeBands(this.state.selectedFigure, e.target.value);
      this.setState({selectedYear:e.target.value});
    }

  getYearList(data){
    let yearList = [];
    for (let key in data.stateFigures[0].figures[this.props.attrType]){
      yearList.push(Object.keys(data.stateFigures[0].figures[this.props.attrType][key])[0]);
    }
    return yearList;
  }

  highlightFeature (e) {
    let layer = e.target;
    this.setToolTipContent(e.target);
    layer.setStyle({
      weight: 2,
      color: '#000',
      fillOpacity: 0.9
    });
  }

  resetHighlight (e) {
      this.refs.geojson.leafletElement.resetStyle(e.target);
      this.resetTooltipContent();
  }

  onEachFeature (component, feature, layer) {
    layer.on({
      mouseover: this.highlightFeature,
      mouseout: this.resetHighlight
    });
  }

  setToolTipContent(values){
    this.setState({hoverstate:values.feature.properties.NAME_1 , hoverFigure:values.feature.properties[this.state.selectedYear]});
  }

  resetTooltipContent(){
    this.setState({hoverstate:null, hoverFigure:null});
  }

  showConcordanceData(){
    this.setState({vizActive:this.state.vizActive? false : true});
  }

render (){
  const attributeKey = {"BE":" Budget Estimates", "RE":"Revised Estimates", "A":"Actuals"};
    return (
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
              {this.state.selectedYear} | {attributeKey[this.state.budgetAttr]}
            </h5>      
          </div>
          <div className="col-lg-4 sub-text">
            <h5 className="figures-unit">Unit : Figures in {this.state.indicatorUnit}</h5>
          </div>
        </div>
      </div>
      <div className="row vis-wrapper"  style={this.state.vizActive?{"overflow-y":"hidden"}:{"overflow-y":"scroll"}}>
      {
        this.state.vizActive?(
      <Map center={config.params.center} zoom={config.params.zoom} zoomControl={config.params.zoomControl} dragging={config.params.dragging}>
        <TileLayer
        url={config.tileLayer.uri}
        maxZoom={config.params.maxZoom}
        minZoom={config.params.minZoom}
        />
        }
        <div className="tcontainer">
            <YearSelector handleYearChange = {this.handleYearChange} fiscalYears={this.getYearList(this.props.data)} selectedYear={this.state.selectedYear}/>
        </div>
        
        <div className="statetooltip">
            <StateToolTip statetooltip={this.state.hoverstate} allocations={this.state.hoverFigure} unit={this.state.indicatorUnit} />
        </div>
        <FeatureGroup >
          <GeoJSON 
          data={this.state.selectedFigure} 
          weight={config.geojson.weight} 
          style={this.getstyle}
          valueProperty={(feature) => feature.properties.NAME_1}
          onEachFeature={this.onEachFeature.bind(null, this)}
          ref="geojson"/>
        </FeatureGroup>
        
        <div className="legendcontainer">
           <div className="legend-scale">
              <ul className="legend-labels">

                <LegendStep bgColor="#B3EAFF" band="20%" range={this.state.bandFigures["20%"]}/>
                <LegendStep bgColor="#73D9FF" band="40%" range={this.state.bandFigures["40%"]}/>
                <LegendStep bgColor="#40C1F3" band="60%" range={this.state.bandFigures["60%"]}/>
                <LegendStep bgColor="#4094B3" band="80%" range={this.state.bandFigures["80%"]}/>
                <LegendStep bgColor="#406573" band="100%" range={this.state.bandFigures["100%"]}/>
                <li>
                  <span className="legendspanside" style={{"background" :"#BFBFBF"}}>Data Unavailable</span>
                </li>
            </ul>
          </div>
        </div>



      </Map>
      ):
        (
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

Choropleth.propTypes = {
   data: React.PropTypes.object,
   attrType:React.PropTypes.string,
   selectedSector:React.PropTypes.string,
   selectedIndicator:React.PropTypes.string,
   sectorName:React.PropTypes.string
};