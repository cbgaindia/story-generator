"use strict";

var React    = require("react"),
    ReactDOM = require("react-dom"),
    Link     = require("react-router").Link;

var Template = function (self) {

  return (
    /* jshint ignore:start */
    /* jscs ignore:start */
    <div className="budget-attributes">
      <div className="budget-attributes-title">Budget Attributes</div>
      <div className="budget-attributes-labels">
        <div className="budget-attribute selected" 
          onClick={(event) => self.toggleBudgetAttribute("BE")}>
            BE - Budget Estimate
        </div>
        <div className="budget-attribute" 
          onClick={(event) => self.toggleBudgetAttribute("RE")}>
            RE - Revised Estimate
        </div>
        <div className="budget-attribute" 
          onClick={(event) => self.toggleBudgetAttribute("AC")}>
            AC - Actuals
        </div>
      </div>
    </div>
    /* jshint ignore:end */
    /* jscs ignore:end */
  );
};

module.exports = Template;
