import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import PanelList from './PanelList';

export default class PanelContent extends React.Component {
    render() {
        return (
            <section className="panel panel-success card-box-shadow">
                <PanelList panelContent={this.props.activeTab}/>
            </section>
        );
    }
}

PanelContent.propTypes = {
    activeTab: React.PropTypes.object
};
