import React from 'react';
import { Link, IndexLink } from 'react-router';
import SelectionPanel from './subcomponents/SelectionPanel';

class LeftSidebar extends React.Component{
	render(){
		return(
		<div>
			<div className="select-panel row-fluid">
				<SelectionPanel params={this.props.params} />
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