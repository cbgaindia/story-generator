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
import 'bootstrap/dist/css/bootstrap.css';
import * as topojson from "topojson-client";

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
  attributionControl: true,
  dragging:false
};

config.tileLayer = {
  uri: 'https://api.mapbox.com/styles/v1/suchismitanaik/cj1nivbus001x2sqqlhmct7du/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3VjaGlzbWl0YW5haWsiLCJhIjoiY2lqMmZ5N2N5MDAwZnVna25hcjE2b2Q1eCJ9.IYx8Zoc0yNPcp7Snd7yW2A',
  params: {
    minZoom: 4,
    attribution: '  © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
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
   fiscalYears: React.PropTypes.array
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
    <span> {this.props.allocations} {this.props.unit =="Percentage" ? "%" : this.props.unit}</span>
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
      bandFigures:null
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
  }

  componentWillMount(){
    let MappedFigures = this.mungeData();
    this.setState({selectedFigure: MappedFigures});
    let defaultYear = this.getYearList(this.props.data)[this.getYearList(this.props.data).length -1];
    this.props.setYearChange(defaultYear);
    this.setState({budgetAttr:this.props.budgetAttr,selectedYear:defaultYear });
    this.computeBands(MappedFigures, defaultYear);
  }
    
  componentDidUpdate(prevProps, prevState){
    if(prevProps.data != this.props.data || prevProps.budgetAttr != this.props.budgetAttr){
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
        this.props.setYearChange(yearList[yearList.length-1]);
      } 
      else{
      this.computeBands(MappedFigures, this.state.selectedYear);
      }
    }
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
      else{
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
    let GeoJSONData = new topojson.feature(TopojsonData, TopojsonData.objects.india_state_boundaries);
    let record = this.props.data.record_figures;
    let budgetAttr = this.props.budgetAttr;
    let MappedFigures = new Array();
    MappedFigures = GeoJSONData.features.map(function(state, index){      
      let temp = record.find(function(x){
      if(x.grpby_name==state.properties.NAME_1)
      {   
          return x;
      }
      else{
        return false;
          }
      });
      for ( let variable in state.properties ){
        if (variable != "HASC_1" && variable != "NAME_1")
        {
          delete state.properties[variable];
        }
      }
      if(temp != null){
        let tempFigure = temp.figures[budgetAttr];

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
    this.props.setYearChange(e.target.value);
  }

  getYearList(data){
    let yearList = [];
    for (let key in data.record_figures[0].figures[this.props.budgetAttr]){
      yearList.push(Object.keys(data.record_figures[0].figures[this.props.budgetAttr][key])[0]);
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
    return (
      <div className="row vis-wrapper" >
        <Map center={config.params.center} zoom={config.params.zoom} zoomControl={config.params.zoomControl} dragging={config.params.dragging}>
          <TileLayer
          url={config.tileLayer.uri}
          maxZoom={config.params.maxZoom}
          minZoom={config.params.minZoom}
          attribution={config.tileLayer.params.attribution}
          />
          }
          <div className="tcontainer">
              <YearSelector handleYearChange = {this.handleYearChange} fiscalYears={this.getYearList(this.props.data)} selectedYear={this.state.selectedYear}/>
          </div>
          
          <div className="statetooltip">
              <StateToolTip statetooltip={this.state.hoverstate} allocations={this.state.hoverFigure} unit={this.props.unit} />
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
          <div className="license-text">
            License - <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC-BY 4.0</a> | <a href="https://openbudgetsindia.org" target="_blank">Open Budgets India</a>
          </div>
        </Map>

      </div>

    );
  }
}

Choropleth.propTypes = {
   data: React.PropTypes.object,
   budgetAttr:React.PropTypes.string,
   selectedSector:React.PropTypes.string,
   selectedIndicator:React.PropTypes.string,
   sectorName:React.PropTypes.string,
   setYearChange:React.PropTypes.func,
   unit:React.PropTypes.string
};