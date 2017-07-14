import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import AllocationDetails from './Allocation-Details';

export default class StateToolTip extends React.Component {
    render() {
        if (this.props.statetooltip == null) {
            return (
                <div className="statetoolPanelHeading">Please select a state from the map</div>
            );
        }
        return (
            <div>
                <div className="statetoolPanelHeading">
                    <span className="glyphicon glyphicon-map-marker"></span>&nbsp;{this.props.statetooltip}</div>
                <div>
                    <AllocationDetails allocations={this.props.allocations} unit={this.props.unit}/>
                </div>
            </div>
        );
    }
}

StateToolTip.propTypes = {
    statetooltip: React.PropTypes.string,
    allocations: React.PropTypes.number,
    unit: React.PropTypes.string
};