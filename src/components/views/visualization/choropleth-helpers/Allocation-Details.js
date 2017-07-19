import React from "react";
import "bootstrap/dist/css/bootstrap.css";

export default class AllocationDetails extends React.Component {
    render() {
        if (this.props.allocations == null || isNaN(parseFloat(this.props.allocations))) {
            return (
                <span>Data unavailable</span>
            );
        }
        return (
            <span> {this.props.allocations} {this.props.unit == "Percentage" ? "%" : this.props.unit}</span>
        );
    }
}

AllocationDetails.propTypes = {
    allocations: React.PropTypes.number,
    unit: React.PropTypes.string
};
