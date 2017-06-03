import React from 'react';
import { Link, IndexLink } from 'react-router';
import TabsPanel from './TabsPanel';

class SelectionPanel extends React.Component{
	render(){
		return(
		<div>
			<div className ="row-fluid">
				<TabsPanel />
			</div>
		</div>
		);
	}
}

export default SelectionPanel;
