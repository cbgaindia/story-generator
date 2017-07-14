import React from 'react';
import {homeComponent} from "../../ConfigMap" ; 

const Home = () => {
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
		</div>
	</div>
  );
};

export default Home;
