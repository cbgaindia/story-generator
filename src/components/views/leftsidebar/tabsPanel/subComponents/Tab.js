import React from "react";
import {Link} from "react-router";
import "bootstrap/dist/css/bootstrap.css";

export default class Tab extends React.Component {
    render() {
        return (
            <li onClick={this.props.handleClick} className={this.props.isActive ? "active" : null}>
                <Link to={"#"}> {this.props.data.title}</Link>
            </li>
        );
    }
}

Tab.propTypes = {
    data: React.PropTypes.object,
    isActive: React.PropTypes.bool,
    handleClick: React.PropTypes.func
};