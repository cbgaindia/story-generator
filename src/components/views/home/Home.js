import React from 'react';
import {homeComponent} from "../../ConfigMap" ; 

const IndexComponent = () => {
	console.log(homeComponent)
  return (
    <div className="col-lg-12">
		<div className="jumbotron text-center">
			<div className="home-header-wrapper">
				<h1 className="home-top-heading">{homeComponent.primary_header}</h1>
				<h1 className="secondary-top-heading">{homeComponent.secondary_header}</h1>
			</div>
			<p className="home-description">{homeComponent.description}</p>
			
		</div>
	</div>
  );
};

export default IndexComponent;
