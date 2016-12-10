"use strict";
var React      = require("react"),
    ReactDOM   = require("react-dom"),
    L          = require("leaflet"),
    topojson   = require("topojson"),
    $          = require("jquery"),
    chroma     =require("chroma-js"),
    _          =require("lodash");

var DATA = require("../utils/data").DATA;
var yearsData = require("../utils/data").YEARS;
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
        getInitialState: function() {
            return {
                years         : yearsData,
                yearchosen    : {"yearchosen":0},
                allallocations:[],
                allocations   : {},
                topoLayer     : null,
                topojson      : null,
                statetooltip  :{},
                duration      :{"duration":yearsData[0].duration},
                bands         :{}
            };
        },
    
        // a variable to store our instance of L.map
        map: null,
    
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
           this.state.allallocations = this.computeBands(props);
           if(this.state.statetooltip.name)
               this.state.allocations = this.getStateIndicatorValue(this.state.statetooltip.name);
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
       computeBands:function(props){
       var allAllocV1 = this.getAllStateIndicatorValue(props.indicator.slug,this.state.years[this.state.yearchosen.yearchosen]);
       var min = Math.min.apply(null, allAllocV1.map(function(item) {
                                                     return item.allocations;
                                                     }))
       var max = Math.max.apply(null, allAllocV1.map(function(item) {
                                                     return item.allocations;
                                                }))
       this.state.bands={
          "20%":[min,min+(20*(max-min))/100,1],
          "40%":[min+(20*(max-min))/100,min+(40*(max-min))/100,2],
          "60%":[min+(40*(max-min))/100,min+(60*(max-min))/100,3],
          "80%":[min+(60*(max-min))/100,min+(80*(max-min))/100,4],
          "100%":[min+(80*(max-min))/100,min+(100*(max-min))/100,5]
       }
       var allAllocV2 = [];
       var self= this;
       _.each(allAllocV1,function(item){
              var retalloc = {
              "state": item.state,
              "allocation": item.allocations,
              "unit":item.unit,
              "band":self.getband(item.allocations)
              }
              console.log(retalloc.state + ","+retalloc.allocation+" , "+retalloc.band);

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
       getband:function(stateIndValue){
          var band =_.find(this.state.bands,function(item){
              return stateIndValue>=item[0] && stateIndValue<=item[1];
          })
          return band[2];
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