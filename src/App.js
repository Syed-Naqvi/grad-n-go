import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import Login from "./components/Login";
import "./App.css";
import Register from "./components/Register";
import HomePage from "./components/HomePage";



function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/login" exact component={Login} />
					<Route path="/register" exact component={Register} />
					<Route path="/" exact component={HomePage} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
