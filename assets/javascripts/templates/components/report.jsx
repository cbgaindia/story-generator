"use strict";

var React    = require("react"),
    ReactDOM = require("react-dom"),
    _        = require("lodash"),
    $          = require("jquery");

var Visualization = require("../../components/visualization");
var MapLeaflet = require("../../components/map");

var Template = function (self) {
  
  if (_.isEmpty(self.state.selectedIndicator)) {
    return (
      <div className="report">
        <span className="report-message">
          Please Select an indicator
        </span>
      </div>
    );
  }
  
  return (
    <div className="report">
      <div className="report-header">
        <div className="report-header-left">
          <div className="report-title">{self.state.selectedIndicator.name}</div>
        </div>
        <div className="report-header-right">
          <div className="budget-attributes">
            <div className="budget-attributes-title">Budget Attributes</div>
            <div className="budget-attributes-labels">
              <span className="budget-attribute selected">BE</span>
              <span className="budget-attribute">AC</span>
              <span className="budget-attribute">RE</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mk-viz">
          {_.isEmpty(self.state.selectedStates)?<MapLeaflet indicator={self.state.selectedIndicator}/>:<Visualization config={self.state.config} />}
      </div>
      <div className="content-footer">
        <div className="information">
          <div className="information-title">Description</div>
          <div className="information-content">
            Nam dapibus nisl vitae elit fringilla rutrum. Aenean sollicitudin, erat a elementum rutrum, neque sem
            pretium metus, quis mollis
          </div>
        </div>
        <div className="information">
          <div className="information-title">Notes</div>
          <div className="information-content">
            Nam dapibus nisl vitae elit fringilla rutrum. Aenean sollicitudin, erat a elementum rutrum, neque sem
            pretium metus, quis mollis
          </div>
        </div>
      </div>
    </div>
  );
};

module.exports = Template;
