import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect, useLocation, useRouteMatch } from 'react-router-dom';

import { BuildDetailsPage } from './pages/BuildDetailsPage';
import { StartPage } from './pages/StartPage';
import { SettingsPage } from './pages/SettingsPage';
import { BuildHistoryPage } from './pages/BuildHistoryPage';
import { LoadingPage } from './pages/LoadingPage';
import { AppState } from "./store/reducers";

const currentLocale = 'ru';

export function App() {
    const isLoaded = useSelector<AppState, boolean>(state => state.isLoaded);
    const isConfigured = useSelector<AppState, boolean>(state => !!state.settings?.repoName);
    const location = useLocation();

    if (!isLoaded) {
        return <LoadingPage />;
    }

    return (
        <Switch>
            <Route path="/(en|ru)">
                <Routes isConfigured={isConfigured}/>
            </Route>
            <Redirect to={`/${currentLocale}${location.pathname}`} />
        </Switch>
    );
}

function Routes({ isConfigured }: { isConfigured: boolean}) {
    let { path } = useRouteMatch();

    return (<Switch>
        <Route path={`${path}/settings`}>
            <SettingsPage />
        </Route>
        <Route path={`${path}/build/:buildId`}>
            <BuildDetailsPage />
        </Route>
        <Route path={path}>
            { isConfigured ? <BuildHistoryPage /> : <StartPage /> }
        </Route>
    </Switch>)
}
