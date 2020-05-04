import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './store';

import './scss/index.scss';
import { initApp } from './store/actions';

store.dispatch(initApp());

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
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
                }, function (err) {
                    console.log('ServiceWorker registration failed: ', err);
                }
            );
    });
}
