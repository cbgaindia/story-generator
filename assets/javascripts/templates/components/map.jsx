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
<span> {props.allocations.allocations}</span>
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
        }
        return (
            <li><span className='legendspan' style={legendStep}></span><span className='legendspanside'>{props.range[0]} - {props.range[1]}</span>
            </li>
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
                    <LegendStep bgColor='#F1EEF6' band='20%' range={self.state.bands["20%"]}/>
                    <LegendStep bgColor='#BDC9E1' band='40%' range={self.state.bands["40%"]}/>
                    <LegendStep bgColor='#74A9CF' band='60%' range={self.state.bands["60%"]}/>
                    <LegendStep bgColor='#2B8CBE' band='80%' range={self.state.bands["80%"]}/>
                    <LegendStep bgColor='#045A8D' band='100%' range={self.state.bands["100%"]}/>
             </ul>
          </div>
        </div>
    </div>
    )
};


module.exports = Template;