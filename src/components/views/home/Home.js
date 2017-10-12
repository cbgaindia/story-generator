import React from 'react';
import {homeComponent} from "../../ConfigMap" ; 

const IndexComponent = () => {
  return (
    <div className="col-lg-12">
		<div className="jumbotron text-center intro-wrapper">
			<div className="home-header-wrapper">
				<h1 className="home-top-heading">{homeComponent.primary_header}</h1>
				<h1 className="secondary-top-heading">{homeComponent.secondary_header}</h1>
				<hr className="title-hr" />
			</div>
			<div className="row">
				<p className="home-description">{homeComponent.description}</p>
			</div>
			<div className="row">
				<div className="col-lg-12 contributor_org_wrapper">
					{homeComponent.contributor_organizations.map(function(image){
						return (<a href={image.link} target="_blank" key={image.image_name}>
									<img src={image.url} alt={image.alt} height={image.height} />
								</a>);
					})}
				</div>
			</div>
			<div className="row">
				<hr className="title-hr" />
				<div className="disclaimer-text">
					<span className="word-disclaimer">Disclaimer : </span>
					With the merger of Plan and Non-Plan expenditure from the current budget cycle, the structure of many of the state budgets have undergone changes. To ensure comparability of the data points, we are in the process of validating our calculations and will be making the data for 2017-18 budget indicators available in the next few weeks. 
				</div>
			</div>
		</div>
	</div>
  );
};

export default IndexComponent;
