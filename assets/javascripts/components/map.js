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
                allallocations   : {},
                allocations   : {},
                statetooltip  : {},
                bands         : this.props.bands,
                years         : this.props.years,
                duration      : {"duration":this.props.years[0].duration}
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
            // get the "id" attribute of our component"s DOM node
            return ReactDOM.findDOMNode(this);
        },
        reinitialize:function(props){
 
           var yrCh = this.state.years[this.state.yearchosen.yearchosen];
           this.state.allallocations = this.props.allallocations[yrCh.from+"-"+yrCh.to];
           this.state.bands = this.computeBands(this.state.allallocations);
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
           var yearAllo = this.state.allallocations;
           if(!yearAllo){
             return;
           }
           var band = 0;
           if (yearAllo[layer.feature.properties.NAME_1]){
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
               if (band===0){
                 return "grey";
               }
               if(band===1){
                 return "#F1EEF6";
               }
               if(band===2){
                 return "#BDC9E1";
               }
               if(band===3){
                 return "#74A9CF";
               }
               if(band===4){
                 return "#2B8CBE";
               }
               if(band===5){
                 return "#045A8D";
               }
       },
       getband:function(value){
           var band = _.chain(this.state.bands)
                       .map(function(item){return item})
                       .find(function(fitem){return value>=fitem[0] && value<=fitem[1]})
                       .value();
           return band[2];
       
       },
       getStateIndicatorValue:function(state){
           var yearAllo = this.state.allallocations;
           if(!yearAllo){
              return;
            }
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
       yearChosenChange:function(yearchosenvalue){
           var yrCh = this.state.years[this.state.yearchosen.yearchosen];
           this.state.allallocations = this.props.allallocations[yrCh.from+"-"+yrCh.to];
           this.state.bands = this.computeBands(this.state.allallocations);
           console.log(this.state.bands);
           topoLayer.eachLayer(this.handleLayer);
           this.setState({
                  yearchosen:{"yearchosen":yearchosenvalue}
             });
           var chosenState = this.state.statetooltip.name;
           var chosenYear = this.state.years[this.state.yearchosen.yearchosen];
           this.setState({
                         statetooltip:{"name":chosenState},
                         duration:{"duration":chosenYear.duration},
                         allocations:this.getStateIndicatorValue(chosenState)
                         });
       },
       computeBands:function(allocations){
       
       var min = Math.min.apply(null, _.map(allocations,function(item) {
                                            return item;
                                            }));
       var max = Math.max.apply(null, _.map(allocations,function(item) {
                                            return item;
                                            }));
       
       var retvalue = {
       "20%":[min,min+(20*(max-min))/100,1],
       "40%":[min+(20*(max-min))/100,min+(40*(max-min))/100,2],
       "60%":[min+(40*(max-min))/100,min+(60*(max-min))/100,3],
       "80%":[min+(60*(max-min))/100,min+(80*(max-min))/100,4],
       "100%":[min+(80*(max-min))/100,min+(100*(max-min))/100,5]
       };
       return retvalue;
       },
       
        render: function () {
            return MapTemplate(this);
        }
    }
);

module.exports = MapLeaflet;