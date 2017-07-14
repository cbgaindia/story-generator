import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import Tab from './Tab';

export default class Tabs extends React.Component {
    render() {
        return (
            <ul className="nav nav-tabs nav-justified">
                {this.props.panelTabs.map(function (tab) {
                    return (
                        <Tab data={tab}
                             isActive={this.props.activeTab === tab}
                             handleClick={this.props.changeTab.bind(this, tab)}
                             key={tab.title}/>
                    );
                }.bind(this))}
            </ul>
        );
    }
}
Tabs.propTypes = {
    activeTab: React.PropTypes.object,
    panelTabs: React.PropTypes.array,
    changeTab: React.PropTypes.func
};