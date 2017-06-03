import React from 'react';
import { Link, IndexLink } from 'react-router';
import SelectionPanel from './subcomponents/SelectionPanel';

class LeftSidebar extends React.Component{
	render(){
		return(
		<div>
			<div className="row-fluid">
				<IndexLink to="/" className="story-generator-logo"> <h2 className="app-title"> Story Generator<sub className="alpha">ALPHA</sub> <hr className="title-hr" /></h2></IndexLink>
			</div>
			<div className="select-panel row-fluid">
				<SelectionPanel />
			</div>
			{/*<div className="social-icons-wrapper row-fluid">
				<ShareIcons />
			</div>*/}
			<div className="row-fluid">
				<a href="https://openbudgetsindia.org/" className="openbudgets-logo"> <h2 className="openbudgets-logo-header"> <img className="openbudgets-logo" src="https://raw.githubusercontent.com/cbgaindia/portal-design/master/logo_OBI/logo_types/light_bg_logo/draft_final/logo_with_text/draft_final.png" /></h2></a>
			</div>
		</div>
		);
	}
}

export default LeftSidebar;