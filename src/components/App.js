import React, { PropTypes } from 'react';
import LeftSidebar from "./views/leftsidebar/LeftSidebar";
import { Header } from './views/Header';
import { Description } from './views/Description';

class App extends React.Component {
	render() {
		return (
			<div className="app-wrapper ">
				<div className="row full-height">
					<div className="container-fluid">
						<div className="row">
							<div className='col-sm-12'>
								<Header params={this.props.params} />
							</div>
						</div>
						<div className="row">
							<div className="col-lg-3 leftsidebar ">
								<LeftSidebar params={this.props.params} />
							</div>
							<div className="col-lg-9 full-height view-container ">
								<div className="container-fluid ">
									<Description topic={this.props.params.topic} />
									{this.props.children}
								</div>
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

