import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import Tabs from './subComponents/Tabs';
import PanelContent from './subComponents/PanelContent';

class TabsPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            panelData: null,
            activeTab: null
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        this.setState({
            panelData: this.props.panelData,
            activeTab: this.props.panelData[0]
        });
    }

    handleClick(tab) {
        this.setState({activeTab: tab});
    }

    render() {
        return (
            <div className="row-fluid">
                <Tabs activeTab={this.state.activeTab}
                      changeTab={this.handleClick}
                      panelTabs={this.props.panelData}/>
                <PanelContent activeTab={this.state.activeTab}/>
            </div>
        );
    }
}

TabsPanel.propTypes = {
    panelData: React.PropTypes.array
};

export default TabsPanel;
