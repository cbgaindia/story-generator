import React from 'react';
import { Link, IndexLink } from 'react-router';
import domtoimage from 'dom-to-image';

function filter (node) {
	try {
		return (node.getAttribute("class") !== 'statetooltip' && node.getAttribute("class")!== "tcontainer" && node.getAttribute("class")!== "select-container" && node.nodeType !=8 && node.getAttribute("class") !="know-more-link");
	}
	catch(err) {
		return true;
	}		
}


class RightSidebar extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			viewBy:"choropleth",
			budgetAttribute:"BE"
		};
		this.handleViewByChange = this.handleViewByChange.bind(this);
		this.handleBudgetAttrChange = this.handleBudgetAttrChange.bind(this);
		this.downloadImage = this.downloadImage.bind(this);
	}
  
	handleViewByChange(e) {
		this.setState({viewBy:e.target.value});
		this.props.viewByChange(e.target.value);
	}
	
	handleBudgetAttrChange(e) {
		this.setState({
			budgetAttribute:e.target.value
		});
		this.props.budgetAttrChange(e.target.value);
	}  
	
	downloadImage(){
		domtoimage.toBlob(document.getElementById('card-container'), {filter: filter})
		.then(blob => {
		window.saveAs(blob, 'visualization-report.png');
		}).catch(function (error) {
			console.error("Promise Rejected", error);
		});
    }

	render(){
		return(
			<div>
				<div className="row-fluid  vis-selector-wrapper">
					<div className="row-fluid">
						<span className="view-by-span rightsidebar-titles"><b>View By :</b></span>
					</div>
					<div className="row-fluid button-grps">
						<div className="btn-group viewby-grp" role="group" aria-label="...">
							<button type="button" value="choropleth" className={this.state.viewBy==="choropleth" ? "btn btn-default focus active" : "btn btn-default"}  onClick ={this.handleViewByChange} ><i className="fa fa-globe fa-2x" value="choropleth" aria-hidden="true"></i></button>
							<button type="button" value="barchart" className={this.state.viewBy==="barchart" ? "btn btn-default focus active" : "btn btn-default"} onClick ={this.handleViewByChange}><i className="fa fa-bar-chart fa-2x" value="barchart" aria-hidden="true"></i></button>
						</div>
					</div>
				</div>
				<div className="row-fluid estimates-fig-wrapper">
					<div className="row-fluid">
						<span className="budget-attr-span rightsidebar-titles"><b>Budget Attributes :</b></span>
					</div>			
					<div className="btn-group button-grps btn-group-vertical" data-toggle="buttons">
						<button type="button" value="BE" className={this.state.budgetAttribute==="BE" ? "btn btn-default focus active" : "btn btn-default"}  onClick ={this.handleBudgetAttrChange}> Budget Estimates</button>
						<button type="button" value="RE" className={this.state.budgetAttribute==="RE" ? "btn btn-default focus active" : "btn btn-default"} onClick ={this.handleBudgetAttrChange}>Revised Estimates</button>
						<button type="button" value="A" className={this.state.budgetAttribute==="A" ? "btn btn-default focus active" : "btn btn-default"}  onClick ={this.handleBudgetAttrChange}>Actuals</button>
					</div>
				</div>
				<div className="row misc-buttons-wrapper">
					<div className="row  ">
						<span className="share-text rightsidebar-titles"><i className="fa fa-share-alt fa-lg" aria-hidden="true"></i> Share : </span>
					</div>
					<div className="row">
						<button type="button" value="download" className="btn btn-default" id="download_report" onClick ={this.downloadImage}> <i className="fa fa-download  fa-lg" aria-hidden="false"></i>  Download Report</button>
					</div>
				</div>
			</div>
			);
		}
	}

RightSidebar.propTypes = {
   viewByChange: React.PropTypes.func,
   budgetAttrChange: React.PropTypes.func
};

export default RightSidebar;