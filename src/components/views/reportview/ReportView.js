import React from "react";

import Choropleth from "../visualization/Choropleth";
import GraphComponent from "../visualization/GraphComponent";
import AdditionalDetails from "./AdditionalDetails";

// Incomplete Component. Currently this is just a placeholder.
// TODO : Build the component. Seperate the view of the report generated in the MainViewComponent form the component.

export default class ReportView extends React.Component {
    constructor() {
        super();
        this.state = {
            vizActive: true
        };
        this.showAdditionalDetails = this.showAdditionalDetails.bind(this);
    }

    showAdditionalDetails() {
        this.setState({vizActive: this.state.vizActive ? false : true});
    }

    render() {
        const attributeKey = {"BE": " Budget Estimates", "RE": "Revised Estimates", "A": "Actuals"};
        return (
            <div id="report-container">
                <div id="header-container">
                    <div className="row">
                        <div className="col-lg-10">
                            <h3 className="primary-header">
                                {this.props.recordName}
                            </h3>
                        </div>
                        <div className="col-lg-2 see-details-text">
                            <a className="see-details-text" onClick={this.showAdditionalDetails}> <i
                                className="fa fa-info-circle fa-lg" aria-hidden="true"></i> See Details</a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            <h4 className="secondary-header">
                                {this.props.category}
                            </h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            <h5 className="addtional-details">
							<span className="add-detail-1">
							{this.props.viewBy != "barchart" ? (this.props.selectedYear + " | ") : (null)}
							</span>
                                <span className="add-detail-2">
								{attributeKey[this.props.budgetAttr]}
							</span>
                            </h5>
                        </div>
                        <div className="col-lg-4">
                            <h5 className="unit-text addtional-details">Unit : Figures in {this.props.record.unit}</h5>
                        </div>
                    </div>
                </div>
                <div id="vis-container"
                     className={this.state.vizActive ? "visualization-container" : "additional-details"}
                     style={this.state.vizActive ? {"overflowY": "hidden"} : {"overflow-y": "scroll"}}>
                    {this.state.vizActive ?
                        [( this.props.viewBy == "choropleth" ?
                                ( <Choropleth
                                        data={this.props.record}
                                        budgetAttr={this.props.budgetAttr}
                                        unit={this.props.record.unit}
                                        setYearChange={this.props.setYearChange}/>
                                ) :
                                ( <GraphComponent
                                    data={this.props.record}
                                    budgetAttr={this.props.budgetAttr}
                                    unit={this.props.record.unit}/> )
                        )] :
                        ( <AdditionalDetails
                            heirarchyLevel={this.props.heirarchyLevel}
                            record={this.props.record}
                            additionalDetails={this.props.additionalDetails}
                            showAdditionalDetails={this.showAdditionalDetails}/> )
                    }

                </div>
                <div id="addtional-notes">
                    {this.props.recordNotes.source ? "Source : " + this.props.recordNotes.source : null}
                </div>
            </div>
        );
    }
}

ReportView.propTypes = {
    heirarchyLevel: React.PropTypes.string,
    category: React.PropTypes.string,
    record: React.PropTypes.object,
    recordName: React.PropTypes.string,
    budgetAttr: React.PropTypes.string,
    recordNotes: React.PropTypes.object,
    setYearChange: React.PropTypes.func,
    selectedYear: React.PropTypes.string,
    additionalDetails: React.PropTypes.object,
    viewBy: React.PropTypes.string
};