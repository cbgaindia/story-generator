"use strict";
var React      = require("react"),
    ReactDOM   = require("react-dom"),
    L          = require("leaflet"),
    topojson   = require("topojson"),
    $          = require("jquery"),
    chroma     =require("chroma-js"),
    _          =require("lodash");

var config = {};
var DATA = require("../utils/data").DATA;
var yearsData = [{"from"   :"2012",
             "to"      :"2013",
             "duration":"2012-13"},
             {"from"   :"2013",
             "to"      :"2014",
             "duration":"2013-14"},
             {"from"   :"2014",
             "to"      :"2015",
             "duration":"2014-15"},
             {"from"   :"2015",
             "to"      :"2016",
                 "duration":"2015-16"}];
// using webpack json loader we can import our topojson file like this
var topodata = require("../../../data/india_states.topo.json");

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
var colorScale = chroma
.scale(["#D5E3FF", "#003171"]);

var MapTemplate = require("../templates/components/map.jsx");

var MapLeaflet = React.createClass(
    {
        getInitialState: function() {
            return {
                years         : yearsData,
                yearchosen    : {"yearchosen":0},
                allocations   : {},
                topoLayer     : null,
                topojson      : null,
                statetooltip  :{},
                duration      :{"duration":yearsData[0].duration},
                allallocations:[]
            };
        },
    
        // a variable to store our instance of L.map
        map: null,
    
        componentWillMount: function() {
            // code to run just before adding the map
        },
    
        componentDidMount: function() {
            // create the Leaflet map object
            if (!this.map) {
                this.init(this.getID());
            }
        },
    
        componentDidUpdate:function(prevProps, prevState) {
           if(prevProps.indicator.slug!=this.props.indicator.slug){
            this.state.allallocations = this.computeBands();
            this.state.allocations = this.getStateIndicatorValue(this.state.statetooltip.name);
           };

        },
        
        componentWillUnmount: function() {
            this.map.remove();
        },
        
                                   
        getID: function() {
            // get the "id" attribute of our component's DOM node
            return ReactDOM.findDOMNode(this);
        },
          init: function(id) {
            if (this.map) {
                return;
            }
                                   
           this.state.topojson = topodata;
           this.map = L.map(id,{maxZoom:6,minZoom:4});
           this.map.setView([23.59, 81.96], 4);
           this.state.allallocations = this.computeBands();
                                   
           var tileLayer = L.tileLayer("https://api.mapbox.com/styles/v1/rachetana/ciu45yngf00aj2ho8vvno6kum/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmFjaGV0YW5hIiwiYSI6ImNpc3g2cnlmZTA4NW0yeXBnMDZiNHUyMWMifQ.XCAmIR_6wdmkYDOBYrGk9Q");
           tileLayer.addTo(this.map);
           
           var topoLayer = new L.TopoJSON();
           topoLayer.addData(this.state.topojson);
           topoLayer.addTo(this.map);
           topoLayer.eachLayer(this.handleLayer);

           
        },
       handleLayer:function(layer){

                                   
           var allo = _.chain(this.state.allallocations)
           .find(function(item){
                 return (item.state===layer.feature.properties.NAME_1);})
           .valueOf();
                             
           var fillColor = this.fillColor(allo);

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
       fillColor:function(allo){
               
               if (!allo){
                 return 'grey';
               }
               var band = allo.band;

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
       computeBands:function(){
       var allAllocV1 = this.getAllStateIndicatorValue(this.props.indicator.slug,this.state.years[this.state.yearchosen.yearchosen]);
       var min = Math.min.apply(null, allAllocV1.map(function(item) {
                                                     return item.allocations;
                                                     }))
       var max = Math.max.apply(null, allAllocV1.map(function(item) {
                                                     return item.allocations;
                                                     }))
       var allAllocV2 = [];
       var self= this;
       _.each(allAllocV1,function(item){
              var retalloc = {
              "state": item.state,
              "allocation": item.allocations,
              "unit":item.unit,
              "band":self.getband(item.allocations,min,max)
              }
              allAllocV2= _.concat(allAllocV2,retalloc)
              })
       return allAllocV2;
       },
       getStateIndicatorValue:function(state){

           var chosenstate = _.chain(this.state.allallocations)
                                   .find(function(item){
                                         return (item.state==state);})
                          .valueOf();
           if(_.isEmpty(chosenstate)){
           return;
           }
           var retallocations = {
                   "allocations":chosenstate
           }
           return retallocations;
       },
       getAllStateIndicatorValue:function(indicator,years){
           var retallocations = [];
                                   
           _.each(DATA,function(item){
                  var indicatordetails = _.chain(item.indicators)
                  .find(function(item){return item.slug===indicator;})
                  .valueOf();
                  var indTimeFrame = _.chain(indicatordetails.budgets)
                  .find(function(item){return (item.years.from===years.from && item.years.to === years.to);})
                  .valueOf();
                  var retalloc = [{
                            "state": item.name,
                            "allocations":Number(indTimeFrame.allocations[0].amount),
                            "unit":indicatordetails.unit
                  }]
                  retallocations= _.concat(retallocations,retalloc);
            })
       return retallocations;
       },
       getband:function(item,min,max){
          var value = (item-min)*100/(max-min)
          if(value>=0 && value <20)
            return 1;
          if(value>=20 && value <40)
            return 2;
          if(value>=40 && value <60)
           return 3;
          if(value>=60 && value <80)
           return 4;
          if(value>=80 && value <=100)
           return 5;
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