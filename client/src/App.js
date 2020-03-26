import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { StartPage } from './pages/StartPage';
import { SettingsPage } from './pages/SettingsPage';
import { BuildHistoryPage } from './pages/BuildHistoryPage';
import { BuildDetailsPage } from './pages/BuildDetailsPage';

export function App() {
	return (
		<Router>
			<Switch>
				<Route path="/settings">
					<SettingsPage />
				</Route>
				<Route path="/build-history">
					<BuildHistoryPage />
				</Route>
				<Route path="/build-details">
					<BuildDetailsPage />
				</Route>
				<Route path="/">
					<StartPage />
				</Route>
			</Switch>
		</Router>
	);
}
