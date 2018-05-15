import React, {PropTypes} from 'react';
import LeftSidebar from "./views/leftsidebar/LeftSidebar";
import {appComponents} from "./ConfigMap";
import AppController from "./controller/AppController";

class App extends React.Component {
	render(){		
		return (
			<div className="app-wrapper ">
				<div className="row ">			
					<div className="row full-height">
						<div className="col-sm-3 leftsidebar ">
							<LeftSidebar config={appComponents.leftSideBarComponent} />
						</div>
						<div className="col-sm-9 full-height view-container ">
							<div className="container-fluid ">
								{this.props.children}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;

