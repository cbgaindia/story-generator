import React from "react";
import {Link} from "react-router";
import "bootstrap/dist/css/bootstrap.css";

export default class Records extends React.Component {
    render() {
        let props = this.props;
        let heirarchyLevel = this.props.heirarchyLevel;
        let indicatorList = this.props.subRecords.map(function (record) {
            return (
                <g key={record.record_slug}>
                    {props.categoryName == "null" ?
                        (<Link className="list-item-single-links"
                               to={"/" + props.panelTitle + "/" + heirarchyLevel + "/" + record.record_slug}
                               key={record.record_slug}>
                            <li className="list-group-item" key={record.record_name}> {record.record_name}</li>
                        </Link>)
                        :
                        (<Link className="list-item-links"
                               to={"/" + props.panelTitle + "/" + heirarchyLevel + "/" + props.slugCategory + "/" + record.record_slug}
                               key={record.record_slug}>
                            <li className="list-group-item" key={record.record_name}> {record.record_name}</li>
                        </Link>)
                    }
                </g>
            );
        });

        return (
            <ul className="list-group">
                {indicatorList}
            </ul>
        );
    }
}

Records.propTypes = {
    categoryName: React.PropTypes.string,
    heirarchyLevel: React.PropTypes.string,
    panelTitle: React.PropTypes.string,
    slugCategory: React.PropTypes.string,
    subRecords: React.PropTypes.array
};
