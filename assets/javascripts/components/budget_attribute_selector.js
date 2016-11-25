"use strict";

var React    = require("react"),
    ReactDOM = require("react-dom"),
    _        = require("lodash"),
    Fuse     = require("fuse.js");

var BudgetAttributeSelectorTemplate = require("../templates/components/budget_attribute_selector.jsx");

var BudgetAttributeSelector = React.createClass({

  getDefaultProps: function () {
    return {
      maximumStatesCount: 5
    };
  },

  getInitialState: function () {
    return {
      states        : this.props.states,
      selectedStates: [],
      stateSearch   : new Fuse(this.props.states, {
        keys: ["name"]
      })
    };
  },

  componentDidMount: function () {
    
  },

  render: function () {
    return BudgetAttributeSelectorTemplate(this);
  }

});

module.exports = BudgetAttributeSelector;