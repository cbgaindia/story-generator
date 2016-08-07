"use strict";

var React      = require("react"),
    ReactDOM   = require("react-dom"),
    _          = require("lodash"),
    DOMToImage = require("dom-to-image");

var COLORS = require("../utils/data").COLORS;
var wrappedColors = _(COLORS);


var ReportTemplate = require("../templates/components/report.jsx");

var Report = React.createClass({

  getInitialState: function () {
    return {
      selectedStates   : [],
      selectedIndicator: {},
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
    self.setState({
      selectedStates   : selectedStates,
      selectedIndicator: selectedIndicator,
      config           : this.generateConfig(selectedStates, selectedIndicator)
    });
  },

  onDownload: function () {
    var report = document.querySelector("#main-container > div > div.content > div.content-body > div.report");
    DOMToImage.toSvg(report, {
      "style": {
        "font-family": "PT Sans"
      }
    }).then(function (dataUrl) {
      var img = new Image();
      img.src = dataUrl;
      document.body.appendChild(img);
    }).catch(console.error);
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
          re: self.getTypeOper(value, "BE"),
          be: self. getTypeOper(value, "RE")
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
    var tempDATA = JSON.parse(JSON.stringify(require("../utils/data").DATA));
    if (_.isEmpty(selectedStates) || _.isEmpty(selectedIndicator)) {
      return [];
    }
    return _.chain(tempDATA)
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
