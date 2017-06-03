import React from 'react';
import RightSidebar from '../rightsidebar/RightSidebar';
import Choropleth from "../visualization/Choropleth";

// Incomplete Component. Currently this is just a placeholder.
// TODO : Build the component. Seperate the view of the report generated in the MainViewComponent form the component.


class ReportView extends React.Component {

render(){

	return(
	<div className = "col-lg-10" >
	    <div id = "vis-container" >
	        <div id="card-container">
	          Hello World{/*  
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
	</div>)
}
}

export default ReportView;