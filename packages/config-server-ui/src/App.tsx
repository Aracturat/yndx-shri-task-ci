import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';

import { BuildDetailsPage } from './pages/BuildDetailsPage';
import { StartPage } from './pages/StartPage';
import { SettingsPage } from './pages/SettingsPage';
import { BuildHistoryPage } from './pages/BuildHistoryPage';
import { LoadingPage } from './pages/LoadingPage';
import { AppState } from "./store/reducers";
import { userLocale, IntlProvider, locales } from "./intl";


export function App() {
    const location = useLocation();
    const correctPath = locales.join("|");

    return (
        <Switch>
            <Route path={ `/(${ correctPath })` }>
                <Routes />
            </Route>
            <Redirect to={ `/${ userLocale }${ location.pathname }` } />
        </Switch>
    );
}

function Routes() {
    const isLoaded = useSelector<AppState, boolean>(state => state.isLoaded);
    const isConfigured = useSelector<AppState, boolean>(state => !!state.settings?.repoName);

    let { path, params } = useRouteMatch<Record<number, string>>();
    let locale = params[0];

    return (
        <IntlProvider locale={ locale }>
            { !isLoaded
                ?
                <LoadingPage />
                :
                <Switch>
                    <Route path={ `${ path }/settings` }>
                        <SettingsPage />
                    </Route>
                    <Route path={ `${ path }/build/:buildId` }>
                        <BuildDetailsPage />
                    </Route>
                    <Route path={ path }>
                        { isConfigured ? <BuildHistoryPage /> : <StartPage /> }
                    </Route>
                </Switch>
            }
        </IntlProvider>
    );
}

