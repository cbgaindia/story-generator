import React, {PropTypes} from 'react';
import LeftSidebar from "./views/leftsidebar/LeftSidebar";
import {appComponents} from "./ConfigMap";
import AppController from "./controller/AppController";

class App extends React.Component {
	render(){		
		return (
			<div className="app-wrapper ">
				<div className="row visible-lg-block">			
					<div className="row full-height">
						<div className="col-lg-3 leftsidebar ">
							<LeftSidebar config={appComponents.leftSideBarComponent} />
						</div>
						<div className="col-lg-9 full-height view-container ">
							<div className="container-fluid ">
								{this.props.children}
							</div>
						</div>
					</div>
				</div>
				<div className="row hidden-lg">
					<div className="col-lg-12">
						<div className="jumbotron text-center">
						 Apologies. <br />The App isnt Mobile or Tablet Friendly as of now!<br />
						 We are in progress to make it work on the same. <br / > 
						 Please use Laptop or a Desktop device to use the Story Generator
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

