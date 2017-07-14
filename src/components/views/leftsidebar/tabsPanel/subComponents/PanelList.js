import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import Records from './Records';

export default class PanelList extends React.Component {
    render() {
        let listItems = null;
        let heirarchy_level = this.props.panelContent.heirarchy_level;
        if (heirarchy_level == 2) {
            let panelTitle = this.props.panelContent.title_slug;
            listItems = this.props.panelContent.data.map(function (category, index) {
                return (
                    <div className="panel panel-default" key={index}>
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a data-toggle="collapse" className="collapsed" data-parent="#accordion"
                                   href={"#" + category.category_slug}>{category.category_name}</a>
                            </h4>
                        </div>
                        <div id={category.category_slug} className="panel-collapse collapse ">
                            <Records categoryName={category.category_name}
                                     subRecords={category.sub_records}
                                     slugCategory={category.category_slug}
                                     panelTitle={panelTitle}
                                     heirarchyLevel={heirarchy_level}/>
                        </div>
                    </div>
                );
            });
        }

        else if (heirarchy_level == 1) {
            listItems = (
                <Records categoryName={"null"}
                         subRecords={this.props.panelContent.data}
                         panelTitle={this.props.panelContent.title_slug}
                         heirarchyLevel={heirarchy_level}/>
            );
        }

        return (
            <div className="panel-group select-panel" id="accordion">
                {listItems}
            </div>
        );
    }
}

PanelList.propTypes = {
    panelContent: React.PropTypes.object
};
