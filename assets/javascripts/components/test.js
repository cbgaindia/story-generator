var _          = require("lodash"),
    BUDGETATTRIBUTES = require("../utils/data").BUDGETATTRIBUTES;

var DATA = JSON.parse(JSON.stringify(require("../utils/data").DATA));
var COLORS = require("../utils/data").COLORS;
var yearsData = require("../utils/data").YEARS;
var wrappedColors = _(COLORS);

var allocations = getAllStateIndicatorValue("total-expenditure-from-state-budget","Actuals");
console.log(allocations)
var bands = computeBands(allocations["2013-2014"])
console.log(bands);
var allo = allocations["2013-2014"];
var band = getband(allo["Madhya Pradesh"],bands)


function getAllStateIndicatorValue(indicator,attribute){
    var returnarr1 = [];
    _.each(DATA,function(item){
           var indicatordetails = _.find(item.indicators,function(item){
                                         return item.slug===indicator;});
           var returnarr2 = [];
           _.each(indicatordetails.budgets,function(budgetItem){
                  var duration = budgetItem.years.from+"-"+budgetItem.years.to;
                  var allocations = _.find(budgetItem.allocations,function(alloItem){
                                           return alloItem.type === attribute;
                                           });
                  if(allocations){
                  var duraValue = {};
                  duraValue[item.name] = allocations.amount;
                  var duraDet = {};
                  duraDet[duration]=duraValue
                    returnarr2=_.concat(returnarr2,duraDet);
                  };
                  
                })
             returnarr1=_.merge(returnarr1,returnarr2);
           
           })
           var returnobj = {}
            _.each(returnarr1,function(item){
                   returnobj[_.keysIn(item).toString()] = item[_.keysIn(item).toString()]
                   })
    
            return returnobj
    
}

function computeBands(allocations){
    
    var min = Math.min.apply(null, _.map(allocations,function(item) {
                                         return item;
                                         }));
    var max = Math.max.apply(null, _.map(allocations,function(item) {
                                         return item;
                                         }));
    
    return {
        "20%":[min,min+(20*(max-min))/100,1],
        "40%":[min+(20*(max-min))/100,min+(40*(max-min))/100,2],
        "60%":[min+(40*(max-min))/100,min+(60*(max-min))/100,3],
        "80%":[min+(60*(max-min))/100,min+(80*(max-min))/100,4],
        "100%":[min+(80*(max-min))/100,min+(100*(max-min))/100,5]
        }
}
function  getband(value,bands){
    var band = _.chain(bands)
               .map(function(item){return item})
               .find(function(fitem){return value>=fitem[0] && value<=fitem[1]})
               .value()
    console.log(band[2])

}
           