import React, {PropTypes} from 'react';
import LeftSidebar from "./views/leftsidebar/LeftSidebar";

class App extends React.Component {
	render(){		
		return (
			<div className="app-wrapper ">			
				<div className="row full-height">
					<div className="col-lg-3 leftsidebar ">
						<LeftSidebar />
					</div>
					<div className="col-lg-9 full-height view-container ">
						<div className="container-fluid ">
							{this.props.children}
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

