import React from "react";
import "bootstrap/dist/css/bootstrap.css";

export default class LegendStep extends React.Component {
    render() {
        return (
            <li>
                <span className="legendspanside"
                      style={{"background": this.props.bgColor}}>{(this.props.range[0]).toFixed(2)}
                    - {(this.props.range[1]).toFixed(2)}</span>
            </li>
        );
    }
}

LegendStep.propTypes = {
    bgColor: React.PropTypes.string,
    range: React.PropTypes.array
};