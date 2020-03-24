import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Start } from './pages/Start';
import { Settings } from './pages/Settings';
import { BuildHistory } from './pages/BuildHistory';
import { BuildDetails } from './pages/BuildDetails';

export function App() {
	return (
		<Router>
			<Switch>
				<Route path="/settings">
					<Settings />
				</Route>
				<Route path="/build-history">
					<BuildHistory />
				</Route>
				<Route path="/build-details">
					<BuildDetails />
				</Route>
				<Route path="/">
					<Start />
				</Route>
			</Switch>
		</Router>
	);
}
