"use strict";

var _ = require("lodash");

var indicatorAmountsRowParser = {
  parse: function (statesYearsHeaders, indicatorAmountsRow) {
    var indicatorLabelsAndAmounts = _.chain(indicatorAmountsRow.split(","))
          .map(_.trim)
          .valueOf(),
        indicatorLabels           = _.take(indicatorLabelsAndAmounts, 2),
        indicatorAmount           = _.drop(indicatorLabelsAndAmounts, 2);
    indicatorAmount               = _.chain(statesYearsHeaders)
      .reduce(function (indicatorsAmounts, statesYearsHeader, statesYearsHeaderIndex) {
        var accumulator = _.chain(indicatorAmount)
          .drop(_.chain(indicatorsAmounts)
              .reduce(function(sum, n,index) {
                  if(index<statesYearsHeaderIndex)
                      return sum + n.length;
                  else
                      return sum;
              }, 0).value())
          .take(statesYearsHeader.subColumnsCount)
          .valueOf();
        return _.concat(indicatorsAmounts, [accumulator]);
      }, [])
      .valueOf();
    return _.chain(statesYearsHeaders)
      .map(function (statesYearsHeader, statesYearsHeaderIndex) {
        var currentIndicatorAmount = _.get(indicatorAmount, statesYearsHeaderIndex),
            allocationsOffsets     = _.chain(statesYearsHeader.subColumns)
              .reduce(function (allocations, subColumn, subColumnIndex) {
                var allocationsCount = allocations[subColumnIndex] + _.size(subColumn.allocations);
                return _.concat(allocations, allocationsCount);
              }, [0])
              .valueOf(),
            budgets                = _.chain(statesYearsHeader.subColumns)
              .map(function (subColumn, subColumnIndex) {
                var allocations = _.chain(subColumn.allocations)
                  .map(function (allocation, allocationIndex) {
                    var allocationOffset     = allocationsOffsets[subColumnIndex],
                        indicatorAmountIndex = allocationOffset + allocationIndex;
                    return _.merge({}, allocation, {
                      amount: _.get(currentIndicatorAmount, indicatorAmountIndex)
                    });
                  })
                  .valueOf();
                return _.merge({}, subColumn, {allocations: allocations});
              })
              .valueOf();
        return _.merge({}, statesYearsHeader, {
          indicator: {
            name   : _.first(indicatorLabels),
            slug   : _.chain(indicatorLabels).first().kebabCase().valueOf(),
            unit   : _.last(indicatorLabels),
            budgets: budgets
          }
        });
      })
      .valueOf();
  }
};

module.exports = indicatorAmountsRowParser;
