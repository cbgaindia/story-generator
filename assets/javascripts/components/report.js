"use strict";

var React      = require("react"),
    ReactDOM   = require("react-dom"),
    _          = require("lodash"),
    BUDGETATTRIBUTES = require("../utils/data").BUDGETATTRIBUTES;

var DATA = JSON.parse(JSON.stringify(require("../utils/data").DATA));
var COLORS = require("../utils/data").COLORS;
var yearsData = require("../utils/data").YEARS;
var wrappedColors = _(COLORS);



var ReportTemplate = require("../templates/components/report.jsx");

var Report = React.createClass({

  getInitialState: function () {
    return {
      years            : yearsData,
      allallocations   : [],
      bands            : {},
      selectedStates   : [],
      selectedIndicator: {},
      selectedAttribute: BUDGETATTRIBUTES[0].name,
      config           : {}
    };
  },

  componentDidMount: function () {
    this.reinitialize(this.props);
  },

  componentWillReceiveProps: function (nextProps) {
    this.reinitialize(nextProps);
  },

  reinitialize: function (props) {
    var self                = this,
        selectedStatesSlugs = self.getSelectedStatesSlug(props),
        selectedStates      = _.chain(props.states)
          .filter(function (state) {
            return _.includes(selectedStatesSlugs, state.slug);
          })
          .valueOf(),
        selectedIndicator   = _.find(props.indicators, function (indicator) {
          return _.eq(props.location.query.indicator, indicator.slug);
        });
    var allallocations;
    var years;
    var bands;
        if(selectedIndicator && !selectedStates.length>0){
            allallocations = this.getAllStateIndicatorValue(selectedIndicator);
            years=_.keysIn(allallocations);
            bands=this.computeBands(allallocations[years[0].toString()]);
        }
    self.setState({
      selectedStates   : selectedStates,
      selectedIndicator: selectedIndicator,
      allallocations   : allallocations,
      bands            : bands,
      config           : this.generateConfig(selectedStates, selectedIndicator)
    });
  },
  getAllStateIndicatorValue:function(indicator,attribute){
        attribute = "Actuals"
        var returnarr1 = [];
        _.each(DATA,function(item){
              var indicatordetails = _.find(item.indicators,function(fitem){
                                            return fitem.slug===indicator.slug;
                                            });
              var returnarr2 = [];
              _.each(indicatordetails.budgets,function(budgetItem){
                     var duration = budgetItem.years.from+"-"+budgetItem.years.to;
                     var allocations = _.find(budgetItem.allocations,function(alloItem){
                                              return alloItem.type === attribute;
                                              });
                     if(allocations){
                     var duraValue = {};
                     duraValue[item.name] = allocations.amount;
                     var duraDet = {};
                     duraDet[duration]=duraValue
                     returnarr2=_.concat(returnarr2,duraDet);
                     };
                     
                     })
              returnarr1=_.merge(returnarr1,returnarr2);
              })
        var returnobj = {}
        _.each(returnarr1,function(item){
              returnobj[_.keysIn(item).toString()] = item[_.keysIn(item).toString()]
              })
              console.log(returnobj)
        return returnobj;
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
     console.log(retvalue)
    return retvalue;
   },
  getSelectedStatesSlug: function (props) {
    return _.chain(props)
      .get("location.query.states", "")
      .split("|")
      .filter(function (state) {
        return !_.isEmpty(state);
      })
      .valueOf();
  },
  getTypeOper:function(inputvalue,inputtype){
    var typevalue = inputvalue.allocations.filter(function(allocation){return allocation.type === inputtype;})[0];
    if(!typevalue){
      return 0;
    }
    return typevalue.amount;
  },

  transformData: function (budgets) {
    var self = this;
    if (budgets && budgets.length === 1) {
      return _.map(budgets[0].indicators[0].budgets, function (value) {
        return {
          from: value.years.from,
          to: value.years.to,
          actuals: self.getTypeOper(value, "Actuals"),
          re: self.getTypeOper(value, "RE"),
          be: self. getTypeOper(value, "BE")
        };
      });
    }

  return _.flatten(_.map(budgets, function (value) {
      return _.map(value.indicators[0].budgets,function(allocation){
         return _.assign({
           state: value.name,
           slug : value.slug
           },{
           from : allocation.years.from,
           to   : allocation.years.to,
           [value.slug] : self.getTypeOper(allocation,"BE")
         });
       });
  }));
  },

  getChartSeries: function (selectedStates) {
    wrappedColors = _(COLORS);
    var self  = this,
        style = {
          strokeWidth  : 2,
          strokeOpacity: 0.8,
          fillOpacity  : 0.9
        };
    if (_.size(selectedStates) > 1) {
      return _.map(selectedStates, function (selectedState) {
        return {
          field: selectedState.slug,
          name : selectedState.name,
          color: wrappedColors.next().value,
          style: style
        };
      });
    }
    return [{
      field: "be",
      name : "Budget Estimate",
      color: wrappedColors.next().value,
      style: style
    }, {
      field: "re",
      name : "Revised Estimate",
      color: wrappedColors.next().value,
      style: style
    }, {
      field: "actuals",
      name : "Actuals",
      color: wrappedColors.next().value,
      style: style
    }];
  },

  generateConfig: function (selectedStates, selectedIndicator) {
    var budgets     = this.getBudgets(selectedStates, selectedIndicator),
        budget      = _.first(budgets),
        data        = this.transformData(budgets),
        chartSeries = this.getChartSeries(selectedStates);
    if (_.size(budgets) < 0) {
      return [];
    }
    return {
      xAxisLabel : _.get(budget, "name", ""),
      yAxisLabel : _.get(budget, "indicators.unit", ""),
      y0         : 100000,
      data       : data,
      chartSeries: chartSeries
    };
  },

  getBudgets: function (selectedStates, selectedIndicator) {
    
    if (_.isEmpty(selectedStates) || _.isEmpty(selectedIndicator)) {
      return [];
    }
    return _.chain(DATA)
      .filter(function (state) {
        return _.includes(_.map(selectedStates, function (item) {
          return item.slug;
        }), state.slug);
      })
      .map(function (state) {
        return _.assign(state, {
          indicators: _.chain(state)
            .get("indicators", [])
            .filter(function (indicator) {
              return _.eq(selectedIndicator.slug, indicator.slug);
            })
            .valueOf()
        });
      })
      .valueOf();
  },

  render: function () {
    return ReportTemplate(this);
  }

});

module.exports = Report; 
