"use strict";

var React    = require("react"),
    ReactDOM = require("react-dom"),
    _        = require("lodash"),
    Link     = require("react-router").Link;

var stateSelectionDisplay = function (self) {
  if (_.isEmpty(self.state.selectedStates)) {
    return (
      <div className="states-selected-inactive">
        No states selected
      </div>
    );
  }
  return (
    <div className="states-selected-active">
      {self.state.selectedStates.map(function (state) {
        return (
          <div className="state" key={state.slug}>
            <div className="state-content">
              <span className="state-avtar">{state.name.charAt(0).toUpperCase()}</span>
              <span className="state-name">{state.name}</span>
            </div>
            <span className="state-remove">
              <Link to={self.removeStateLink(state)}
                    onClick={(event) => self.onStateRemoval(state)}>
                <span className="glyphicon glyphicon-remove">
                </span>
              </Link>
            </span>
          </div>
        );
      })}
    </div>
  );
};

var Template = function (self) {
  return (
    /* jshint ignore:start */
    /* jscs ignore:start */
    <div className="state-selector">
      <div className="states">
        <div className="states-header">
          <div className="states-header-title">Selected States</div>
          <div className="dropdown">
            <button id="select-state-dropdown"
                    className="btn btn-default dropdown-toggle btn-bat"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true">
              Select State &nbsp;
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="select-state-dropdown">
              {self.state.states.map(function (state, stateIndex) {
                if (self.canAddState()) {
                  return (
                    <li key={stateIndex}>
                      <Link to={self.addStateLink(state)}
                            onClick={(event) => self.onStateAddition(state)}>
                        {state.name}
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={stateIndex}>
                    <a href="javascript: void(0);">
                      {state.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="states-selected">
          {stateSelectionDisplay(self)}
        </div>
      </div>
    </div>
    /* jshint ignore:end */
    /* jscs ignore:end */
  );
};

module.exports = Template;
