import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { BuildDetailsPage } from './pages/BuildDetailsPage';
import { StartPage } from './pages/StartPage';
import { SettingsPage } from './pages/SettingsPage';
import { BuildHistoryPage } from './pages/BuildHistoryPage';
import { LoadingPage } from './pages/LoadingPage';

export function App() {
	const isLoaded = useSelector(state => state.isLoaded);
	const isConfigured = useSelector(state => !!state.settings.repoName);

	if (!isLoaded) {
		return <LoadingPage />
	}

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
					{isConfigured ? <BuildHistoryPage /> : <StartPage />}
				</Route>
			</Switch>
		</Router>
	);
}
