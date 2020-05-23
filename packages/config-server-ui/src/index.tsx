import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter as Router } from 'react-router-dom';


import * as push from './push';
import './scss/index.scss';
import { initApp, updateBuild } from './store/actions';

store.dispatch(initApp());

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
            <Router>
                <App />
            </Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then(
                function (registration) {
                    console.log('ServiceWorker registration successful');

                    push.register(registration);
                }, function (err) {
                    console.log('ServiceWorker registration failed: ', err);
                }
            );

        navigator.serviceWorker.addEventListener('message', (e) => {
            if (e.data) {
                store.dispatch(updateBuild(e.data));
            }
        });
    });
}
