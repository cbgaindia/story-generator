import React from 'react';
import { render } from 'react-dom';

class ShareIcons extends React.Component{
	render(){
		return(
		<div className="share-icons text-center">
			<span className="share-icon-span">Share   :</span>
			<div className="icons-wrapper">
				<i className="fa fa-github-square fa-2x" aria-hidden="true"></i>
				<i className="fa fa-google-plus-square fa-2x" aria-hidden="true"></i>
				<i className="fa fa-twitter-square fa-2x" aria-hidden="true"></i>
				<i className="fa fa-facebook-square fa-2x" aria-hidden="true"></i>
				<i className="fa fa-linkedin-square fa-2x" aria-hidden="true"></i>
			</div>
		</div>
		);
	}
}

export default ShareIcons;