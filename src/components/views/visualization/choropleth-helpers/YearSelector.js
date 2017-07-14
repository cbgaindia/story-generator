import React, {Component} from "react";
// import {TopojsonData} from "../../../data/StatesTopojson";
import "bootstrap/dist/css/bootstrap.css";

export default class YearSelector extends Component {
    render() {
        let props = this.props;
        return (
            <div className="btn-group " role="group" aria-label="...">
                {this.props.fiscalYears.map(function (item, index) {
                    return (
                        <button type="button" key={item} value={item}
                                className={props.selectedYear === item ? "btn btn-default focus active" : "btn btn-default"}
                                onClick={props.handleYearChange}>{item}</button>
                    );
                })}
            </div>
        );
    }
}

YearSelector.propTypes = {
    fiscalYears: React.PropTypes.array
};