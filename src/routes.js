import React from "react";
import {Route, IndexRoute} from "react-router";
import App from "./components/App" ;
import AppController from "./components/controller/AppController";
//import {expenditure_data} from "./data/expenditure_data";
import Home from "./components/views/home/Home";

export default(
<Route path="/" components={App}>
	<IndexRoute components={Home} />
	<Route path="/expenditure/:heirarchy_level/:category/:record" component={AppController}  panelName = {"expenditure"} />
	<Route path="/receipts/:heirarchy_level/:record" component={AppController}  panelName = {"receipts"}/>
</Route>
);