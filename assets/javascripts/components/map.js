"use strict";
var React      = require("react"),
    ReactDOM   = require("react-dom"),
    L          = require("leaflet"),
    topojson   = require("topojson"),
    $          = require("jquery"),
    chroma     =require("chroma-js"),
    _          =require("lodash");


var topodata = require("../../../data/india_state_boundaries.json");

L.TopoJSON = L.GeoJSON.extend({
    addData: function(jsonData) {
                  if (jsonData.type === "Topology") {
                    for (var key in jsonData.objects) {
                        var geojson = topojson.feature(jsonData, jsonData.objects[key]);
                        L.GeoJSON.prototype.addData.call(this, geojson);
                    }
                  }    
                  else {
                    L.GeoJSON.prototype.addData.call(this, jsonData);
                  }
                }
            });
var topoLayer = new L.TopoJSON();

var MapTemplate = require("../templates/components/map.jsx");

var MapLeaflet = React.createClass(
    {
       // a variable to store our instance of L.map
       map: null,
       
       getInitialState: function() {
            return {
                topoLayer     : null,
                topojson      : null,
                yearchosen    : {"yearchosen":0},
                allocations   : {},
                statetooltip  : {},
                bands         : {},
                years         : this.props.years,
                duration         : {"duration":"2012-13"}
            };
        },
    
        componentDidMount: function() {
            // create the Leaflet map object
            this.reinitialize(this.props);
            if (!this.map) {
                this.init(this.getID());
            }
           topoLayer.eachLayer(this.handleLayer);
           
        },
        
       componentWillReceiveProps: function (nextProps) {
            this.reinitialize(nextProps);
           
       },
       componentWillUnmount: function() {
            this.map.remove();
        },
        getID: function() {
            // get the "id" attribute of our component's DOM node
            return ReactDOM.findDOMNode(this);
        },
        reinitialize:function(props){
           if(this.state.statetooltip.name)
               this.state.allocations = this.getStateIndicatorValue(this.state.statetooltip.name);
           topoLayer.eachLayer(this.handleLayer);
        },
        init: function(id) {
           this.state.topojson = topodata;
           this.map = L.map(id,{maxZoom:6,minZoom:4});
           this.map.setView([23.59, 81.96], 4);
                                   
           var tileLayer = L.tileLayer("https://api.mapbox.com/styles/v1/rachetana/ciu45yngf00aj2ho8vvno6kum/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmFjaGV0YW5hIiwiYSI6ImNpc3g2cnlmZTA4NW0yeXBnMDZiNHUyMWMifQ.XCAmIR_6wdmkYDOBYrGk9Q");
           tileLayer.addTo(this.map);
           topoLayer.addData(this.state.topojson);
           topoLayer.addTo(this.map);
           
        },
       handleLayer:function(layer){
           var yearAllo = this.props.allallocations["2012-2013"];
           var band = 0;
           console.log(layer.feature.properties.NAME_1)
           if (yearAllo[layer.feature.properties.NAME_1]){
             console.log(layer.feature.properties.NAME_1 +" , "+yearAllo[layer.feature.properties.NAME_1])
             band = this.getband(yearAllo[layer.feature.properties.NAME_1]);
                 }
           
           var fillColor = this.fillColor(band);

           layer.setStyle({
                          fillColor : fillColor,
                          fillOpacity: 0.75,
                          color:"#555",
                          weight:1,
                          opacity:0.5
                          });
           var _self = this;
           
           var targetlayer = layer;
           layer.on("mouseover",function(e){
                    _self.enterLayer(this);
                    });
           layer.on("mouseout",function(e){
                    _self.leaveLayer(this);
                    });
       },
       fillColor:function(band){
               if (band==0){
                 return 'grey';
               }
               if(band===1){
                 return '#F1EEF6';
               }
               if(band===2){
                 return '#BDC9E1';
               }
               if(band===3){
                 return '#74A9CF';
               }
               if(band===4){
                 return '#2B8CBE';
               }
               if(band===5){
                 return '#045A8D';
               }
       },
       getband:function(value){
           var band = _.chain(this.props.bands)
                       .map(function(item){return item})
                       .find(function(fitem){return value>=fitem[0] && value<=fitem[1]})
                       .value()
           return band[2];
       
       },
       getStateIndicatorValue:function(state){
           var yearAllo = this.props.allallocations["2012-2013"]
           var chosenstate = yearAllo[state];
           
           if(_.isEmpty(chosenstate)){
           return;
           }
           var retallocations = {
                   "allocations":chosenstate
           }
           return retallocations;
       },

    
       enterLayer:function(layer){
           var chosenState = layer.feature.properties.NAME_1;
           if(this.state.statetooltip!=chosenState){
               this.setState({
                             statetooltip:{"name":chosenState},
                             allocations:this.getStateIndicatorValue(chosenState)
                             });
               layer.bringToFront();
               layer.setStyle({
                             weight:2,
                             opacity: 1
                             });
            }
       },
       leaveLayer:function(layer){
           layer.bringToBack();
           layer.setStyle({
                         weight:1,
                         opacity:0.5
                         });
       
       },
       handleClick(yearchosenvalue){
           this.setState({
                  duration:{"duration":this.state.years[yearchosenvalue]},
                  yearchosen:{"yearchosen":yearchosenvalue}
             });
           var getState = this.state.statetooltip.name;
           var getYears = this.state.years[this.state.yearchosen.yearchosen];
           this.setState({
                         statetooltip:{"name":getState},
                         duration:{"duration":getYears.duration},
                         allocations:this.getStateIndicatorValue(getState,this.props.indicator.slug,getYears)
                         });
       },
        render: function () {
            return MapTemplate(this);
        }
    }
);

module.exports = MapLeaflet;