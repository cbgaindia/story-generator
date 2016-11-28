"use strict";

var DATA = require("../../../data/7-states-budgets.json");

var COLORS = [
  "#00A7F1",
  "#CBDF8E",
  "#FFE395",
  "#004B6C",
  "#819D2C"
];

var BUDGETATTRIBUTES = [
  { "name":"BE","value" : "BUDGET ESTIMATE"},
  { "name":"RE","value" : "REVISED ESTIMATE"},
  { "name":"AC","value" : "ACTUALS"}
]

module.exports = {
  DATA: DATA,
  COLORS: COLORS,
  BUDGETATTRIBUTES: BUDGETATTRIBUTES
};

