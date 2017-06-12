import React from 'react';
import { Link, IndexLink } from 'react-router';
import TabsPanel from './subcomponents/TabsPanel';

class LeftSidebar extends React.Component{

	render(){
		let leftSideBarComponent= this.props.config;
		let logoWrapper = null;
		if(leftSideBarComponent.top_logo.format == "text")
		{
			logoWrapper =  (
					<h2 className="app-title">{leftSideBarComponent.top_logo.text_config.text}<sub className="app-version">{leftSideBarComponent.top_logo.text_config.release_version}</sub> 
					<hr className="title-hr" /></h2>
					);
		}
		else if(leftSideBarComponent.top_logo.format == "img")
		{
			logoWrapper = (
				<div >
					<img className="app-logo" width={leftSideBarComponent.top_logo.img_config.width} src={leftSideBarComponent.top_logo.img_config.source} />
					<hr className="title-hr" />
				</div>
				);
		}
		return(
		<div>
			<div className="row-fluid">
				<IndexLink to="/" className="app-logo"> 
					{logoWrapper}
				</IndexLink>
			</div>
			<div className="select-panel row-fluid">
				<TabsPanel panelData = {leftSideBarComponent.selection_panel.panels} />
			</div>

			{/* ToDo :  Add Social Media Integration
				<div className="social-icons-wrapper row-fluid">
				<ShareIcons />
			</div>*/}
			<div className="row-fluid leftsidebar-bottom-logos">
			{leftSideBarComponent.bottom_logo.contributor_organizations.map(function(image){
				return (<a href={image.link} target="_blank" className="organization-logo-link" key={image.image_name}>
							<img src={image.url} alt={image.alt} height={image.height} />
						</a>);
			})}
			</div>
		</div>
		);
	}
}

LeftSidebar.propTypes = {
	config:React.PropTypes.object
};

export default LeftSidebar;