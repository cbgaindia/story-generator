import React from 'react';
import RightSidebar from '../rightsidebar/RightSidebar';
import Choropleth from "../visualization/Choropleth";

// Incomplete Component. Currently this is just a placeholder.
// TODO : Build the component. Seperate the view of the report generated in the MainViewComponent form the component.


class ReportView extends React.Component {

render(){

	return(
		<div id="report-container">
			<div id="header-container">
				<div className="row">
					<div className="col-lg-10">
						<h3 className="primary-header">
						Total Expenditure
						</h3>
					</div>
					<div className="col-lg-2 see-details-text">
						See Details
					</div>
					
				</div>
				<div className="row">
					<div className="col-lg-8">
						<h4 className="secondary-header">
							Agriculture & Allied Activities
						</h4>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-8">
						<h5 className="addtional-details">
							<span className="add-detail-1">
							2016-17  
							</span>
							<span className="add-detail-2">
							 | Budget Estimates
							</span>
						</h5>
					</div>
					<div className="col-lg-4">
						<h5 className="unit-text addtional-details">Unit : Figures in INR (in Crores)</h5>
					</div>
				</div>


			</div>

	    	<div id = "vis-container" >
	        </div>
	        <div id="addtional-notes">
	        </div>
	    </div>
)
}
}

export default ReportView;