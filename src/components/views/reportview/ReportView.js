import React from 'react';
import RightSidebar from '../rightsidebar/RightSidebar';
import Choropleth from "../visualization/Choropleth";
import GraphComponent from "../visualization/GraphComponent";
// Incomplete Component. Currently this is just a placeholder.
// TODO : Build the component. Seperate the view of the report generated in the MainViewComponent form the component.

class AdditionalDetails extends React.Component{

render(){
return (	
		<div className="additional-details-container">
			{this.props.heirarchyLevel == 2?
			(	         
			<div className="panel panel-default">
				<div className="panel-heading"> Concordance Table 
					<span className="close-icon"> 
						<a className= "close-link" onClick={this.props.showAdditionalDetails}>
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
						return(
							<tr key={record.name}>
							<td>{record.name}</td>
							<td>{record.description}</td>
							</tr>);
							})
					}
				</tbody>
				</table>
			</div>
			):(
			<div className="panel panel-default">
				<div className="panel-heading"> Additional Details 
					<span className="close-icon"> 
						<a className= "close-link" onClick={this.props.showAdditionalDetails}>
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
	showAdditionalDetails : React.PropTypes.func,
	heirarchyLevel:React.PropTypes.number,
	additionalDetails:React.PropTypes.object
};

class ReportView extends React.Component {
constructor(){
	super();
    this.state = {
		vizActive:true
	};
	this.showAdditionalDetails =this.showAdditionalDetails.bind(this);
}

showAdditionalDetails(){
    this.setState({vizActive:this.state.vizActive? false : true});
}

render(){
	const attributeKey = {"BE":" Budget Estimates", "RE":"Revised Estimates", "A":"Actuals"};
	return(
		<div id="report-container">
			<div id="header-container">
				<div className="row">
					<div className="col-md-10">
						<h3 className="primary-header">
							{this.props.recordName}
						</h3>
					</div>
					<div className="col-md-2 see-details-text">
						<a className="see-details-text" onClick={this.showAdditionalDetails}> <i className="fa fa-info-circle fa-lg" aria-hidden="true"></i> See Details</a>
					</div>
				</div>
				<div className="row">
					<div className="col-md-8">
						<h4 className="secondary-header">
							{this.props.category}
						</h4>
					</div>
				</div>
				<div className="row">
					<div className="col-md-8">
						<h5 className="addtional-details">
							<span className="add-detail-1">
							{this.props.viewBy!="barchart" ?(
								this.props.selectedYear + " | "
								):
								(
									null	)
							}
							</span>
							<span className="add-detail-2">
								{attributeKey[this.props.budgetAttr]}
							</span>
						</h5>
					</div>
					<div className="col-md-4">
						<h5 className="unit-text addtional-details">Unit : Figures in {this.props.record.unit}</h5>
					</div>
				</div>
			</div>
			<div id="vis-container" className={this.state.vizActive? "visualization-container": "additional-details"} style={this.state.vizActive?{ "overflowY": "hidden"}:{ "overflow-y": "scroll"}}>
				{this.state.vizActive ? 
					[( this.props.viewBy == "choropleth" ? 
						( <Choropleth 
							data={this.props.record} 
							budgetAttr={this.props.budgetAttr} 
							unit={this.props.record.unit} 
							setYearChange={this.props.setYearChange} /> 
						) : 
						( <GraphComponent 
							data={this.props.record} 
							budgetAttr={this.props.budgetAttr} 
							unit={this.props.record.unit} /> ) 
						)] :
						( <AdditionalDetails 
							heirarchyLevel={this.props.heirarchyLevel} 
							record={this.props.record} 
							additionalDetails={this.props.additionalDetails}
							showAdditionalDetails={this.showAdditionalDetails} /> )
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
	heirarchyLevel:React.PropTypes.string, 
	category:React.PropTypes.string, 
	record:React.PropTypes.object, 
	recordName:React.PropTypes.string,
	budgetAttr:React.PropTypes.string, 
	recordNotes:React.PropTypes.object, 
	setYearChange:React.PropTypes.func, 
	selectedYear:React.PropTypes.string, 
	additionalDetails:React.PropTypes.object,
	viewBy:React.PropTypes.string 
};

export default ReportView;