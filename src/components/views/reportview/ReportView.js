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
	        
	         {/*  
	            <div className="row selected-params">
					<div className="row">
						<div className="col-lg-10 indicator-title-wrapper">
							<h3 className="indicator-title">{this.state.indicatorData.indicator}</h3>
						</div>
						<div className="col-lg-2 know-more-text">
							<a className= "know-more-link" onClick={this.showConcordanceData}>Know More</a>     
						</div>
					</div>

					<div className="row">
						<div className="col-lg-8 sub-text">
							<h4 className="sector-title">
							{this.state.sectorName}
							</h4>
	                	</div>
		            </div>

					<div className="row row-sub-text">
						<div className="col-lg-8 sub-text">
							<h5 className="budgetattr-year">
							{this.state.selectedYear} | {attributeKey[this.state.budgetAttr]}
							</h5>      
						</div>
						<div className="col-lg-4 sub-text">
							<h5 className="figures-unit">Unit : Figures in {this.state.indicatorData.unit}</h5>
						</div>
					</div>
	            </div>
	            {
	                this.state.viewBy == "choropleth" ? ( 
	                    <Choropleth data={this.state.indicatorData} attrType={this.state.budgetAttr} selectedIndicator={this.state.indicatorData.indicator} selectedSector = {this.state.sectorSelected} figureUnit = {this.state.indicatorData.unit} /> ) 
	                :(
	                    <GraphComponent data={this.state.indicatorData} attrType={this.state.budgetAttr} selectedIndicator={this.state.indicatorData.indicator} selectedSector = {this.state.sectorSelected} sectorName= {this.state.sectorName} /> )
	            }

	        <div className="row indicator-description">
	          Source - {this.state.notesText.source}  
	        </div>
	    */}
	        </div>
	    </div>
)
}
}

export default ReportView;