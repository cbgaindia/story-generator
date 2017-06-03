import React from "react";
import {Route, IndexRoute} from "react-router";
import App from "./components/App" ;
import AppController from "./components/controller/AppController";
//import {expenditure_data} from "./data/expenditure_data";
import IndexComponent from "./components/views/home/Home";

export default(
<Route path="/" components={App}>
	<IndexRoute components={IndexComponent} />
	<Route path="/expenditure/:sector/:indicator" component={AppController}  />
</Route>
);