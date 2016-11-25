"use strict";

var React    = require("react"),
    ReactDOM = require("react-dom"),
    ReactRouter = require("react-router"),
    _        = require("lodash"),
    Fuse     = require("fuse.js");

var BudgetAttributeSelectorTemplate = require("../templates/components/budget_attribute_selector.jsx");

var BudgetAttributeSelector = React.createClass({

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
  },

  render: function () {
    return BudgetAttributeSelectorTemplate(this);
  }

});

module.exports = BudgetAttributeSelector;