"use strict";

var React    = require("react"),
    ReactDOM = require("react-dom"),
<<<<<<< b13e135acc8d16af86091325a195cedce577a2db
=======
    ReactRouter = require("react-router"),
>>>>>>> Budget Attribute component introduced & layout changes
    _        = require("lodash"),
    Fuse     = require("fuse.js");

var BudgetAttributeSelectorTemplate = require("../templates/components/budget_attribute_selector.jsx");

var BudgetAttributeSelector = React.createClass({

<<<<<<< b13e135acc8d16af86091325a195cedce577a2db
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
    
=======
  toggleBudgetAttribute: function(attr){
    var attributes = _.chain(this.props)
      .get("location.query.attrs", "")
      .split("|")
      .filter(function (attr) {
        return !_.isEmpty(attr);
      })
      .valueOf();
    
    if(attributes.length === 0){
      attributes.push(attr)
    }else if(~attributes.indexOf(attr)){
      _.pull(attributes,attr)
    } else {
      attributes.push(attr)
    }
    var attrs = _.chain(attributes)
                  .uniq()
                  .join("|")
                  .valueOf()
    console.log(this.props.location,attrs)
    // ReactRouter.browserHistory.push()
>>>>>>> Budget Attribute component introduced & layout changes
  },

  render: function () {
    return BudgetAttributeSelectorTemplate(this);
  }

});

module.exports = BudgetAttributeSelector;