import React from "react";

export default class AdditionalDetails extends React.Component {

    render() {
        return (
            <div className="additional-details-container">
                {this.props.heirarchyLevel == 2 ?
                    (
                        <div className="panel panel-default">
                            <div className="panel-heading"> Concordance Table
                                <span className="close-icon">
						<a className="close-link" onClick={this.props.showAdditionalDetails}>
							<i className="fa fa-times" aria-hidden="true"></i>
						</a>
					</span>
                            </div>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>States</th>
                                    <th>Details of the Budget Document from which data have been recorded</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.props.additionalDetails.group.map((record) => {
                                        return (
                                            <tr key={record.name}>
                                                <td>{record.name}</td>
                                                <td>{record.description}</td>
                                            </tr>);
                                    })
                                }
                                <tr key="notes">
                                    <td>Notes</td>
                                    <td>{this.props.additionalDetails.note}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="panel panel-default">
                            <div className="panel-heading"> Additional Details
                                <span className="close-icon">
						<a className="close-link" onClick={this.props.showAdditionalDetails}>
							<i className="fa fa-times" aria-hidden="true"></i>
						</a>
					</span>
                            </div>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Particular</th>
                                    <th>Description</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr key={this.props.additionalDetails.record}>
                                    <td>{this.props.additionalDetails.record}</td>
                                    <td>{this.props.additionalDetails.description}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
            </div>
        );
    }
}

AdditionalDetails.propTypes = {
    showAdditionalDetails: React.PropTypes.func,
    heirarchyLevel: React.PropTypes.number,
    additionalDetails: React.PropTypes.object
};