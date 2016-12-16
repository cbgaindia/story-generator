"use strict";

var DATA = require("../../../data/7-states-budgets.json");

var COLORS = [
            "#00A7F1",
            "#CBDF8E",
            "#FFE395",
            "#004B6C",
            "#819D2C"
            ];

var YEARS = [{"from"   :"2012",
            "to"      :"2013",
            "duration":"2012-13"},
            {"from"   :"2013",
            "to"      :"2014",
            "duration":"2013-14"},
            {"from"   :"2014",
            "to"      :"2015",
            "duration":"2014-15"},
            {"from"   :"2015",
            "to"      :"2016",
            "duration":"2015-16"}];

var BUDGETATTRIBUTES = [
              { "name":"BE","value" : "BUDGET ESTIMATE"},
              { "name":"RE","value" : "REVISED ESTIMATE"},
              { "name":"AC","value" : "ACTUALS"}
            ]

module.exports = {
  DATA: DATA,
  COLORS: COLORS,
  YEARS: YEARS,
  BUDGETATTRIBUTES: BUDGETATTRIBUTES
};

