import React from 'react';
import { Link, IndexLink } from 'react-router';
import TabsPanel from './subcomponents/TabsPanel';
import {leftSideBarComponent} from "../../ConfigMap" ;


class LeftSidebar extends React.Component{
	render(){
		let logoWrapper = null
		if(leftSideBarComponent.top_logo.format == "text")
		{
			logoWrapper =  (
					<h2 className="app-title">{leftSideBarComponent.top_logo.text_config.text}<sub className="app-version">{leftSideBarComponent.top_logo.text_config.release_version}</sub> 
					<hr className="title-hr" /></h2>
					)
		}
		else if(leftSideBarComponent.top_logo.format == "img")
		{
			logoWrapper = (
				<div >
					<img className="app-logo" width={leftSideBarComponent.top_logo.img_config.width} src={leftSideBarComponent.top_logo.img_config.source} />
					<hr className="title-hr" />
				</div>
				)
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
			{/*<div className="social-icons-wrapper row-fluid">
				<ShareIcons />
			</div>*/}
			<div className="row-fluid">
				<a href={leftSideBarComponent.bottom_logo.img_config.link} className="organization-logo-link"> 
				 <img className="organization-logo" src={leftSideBarComponent.bottom_logo.img_config.source} width={leftSideBarComponent.bottom_logo.img_config.width} />
				</a>
			</div>
		</div>
		);
	}
}

export default LeftSidebar;