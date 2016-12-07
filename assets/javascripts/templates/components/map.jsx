    "use strict"
var React = require("react"),
        _ = require('lodash');


var Template=function(self){
    var StateToolTip = function(props){
    if (_.isEmpty(props.statetooltip)){
      return(
        <div className="statetoolPanelHeading">Please select a state from the map</div>
      )
    }
    return(
       <div>
<div className="statetoolPanelHeading"><span className="glyphicon glyphicon-map-marker"></span>&nbsp;{props.statetooltip}</div>
            <div>
                <AllocationDetails allocations={props.allocations}/>
            </div>
        </div>
      )

    };
    var AllocationDetails=function(props){
        if(_.isEmpty(props.allocations)){
            return (
                <span>Data unavailable</span>
            )
        }
        return (
<span>{props.allocations.allocations.unit.length > 0 && props.allocations.allocations.unit}&nbsp; {props.allocations.allocations.allocation}</span>
        )
    };

    var Timeline = function(props){
    return (
            <ol className="timeline timeline--summary">
                {props.years.map(function(item,index){
                    return (
                        <li key={item.duration} className={"timeline__step " + (props.duration.duration==item.duration ? 'done' : '')} onClick={(event) => timeChosen(event)}>
                            <input className="timeline__step-radio" type="radio" name="radioset"/>
                            <span className="timeline__step-title">{item.duration}</span>
                            <i className="timeline__step-marker">1</i>
                        </li>
                    );
                })}
            </ol>
        );
    };
    var LegendStep = function(props){
        var legendStep = {
            backgroundColor: props.bgColor
        };
        return (
            <li><span style={legendStep}></span>{props.children}</li>
        );
    };

    var timeChosen = function(key){
        key.currentTarget.getElementsByTagName("input")[0].checked = true
        var items = key.currentTarget.parentElement.getElementsByTagName("li");
        var i = 0;
        for(i=0;i<items.length;i++){
            var item = items[i];
            if(item.getElementsByTagName("input")[0].checked){
                self.handleClick(i);
            }
        }
    };

    return (
     <div id = 'map'>
        <div className="statetooltip">
            <StateToolTip statetooltip={self.state.statetooltip.name} allocations={self.state.allocations}></StateToolTip>
        </div>
        <div className="tcontainer">
            <Timeline years={self.state.years} duration={self.state.duration}/>
        </div>
        <div className="legendcontainer">
           <div className='legend-scale'>
              <ul className='legend-labels'>
                    <LegendStep bgColor='#F1EEF6'>0 - 20%</LegendStep>
                    <LegendStep bgColor='#BDC9E1'>40%</LegendStep>
                    <LegendStep bgColor='#74A9CF'>60%</LegendStep>
                    <LegendStep bgColor='#2B8CBE'>80%</LegendStep>
                    <LegendStep bgColor='#045A8D'>100%</LegendStep>
             </ul>
          </div>
        </div>
    </div>
    )
};


module.exports = Template;