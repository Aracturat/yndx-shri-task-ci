import * as api from './store/api';
import { vapidPublicKey } from './push.config';

let hasSubscription = false;
let serviceWorkerRegistration: ServiceWorkerRegistration | null = null;

function urlB64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function subscribeUser() {
    if (!serviceWorkerRegistration) {
        return;
    }

    serviceWorkerRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(vapidPublicKey)
    })
        .then(subscription => api.pushSubscribe(subscription))
        .catch(err => {
            console.log('Failed to subscribe the user: ', err);
        });
}

function unsubscribeUser() {
    if (!serviceWorkerRegistration) {
        return;
    }

    serviceWorkerRegistration.pushManager.getSubscription()
        .then(function (subscription) {
            if (subscription) {
                api.pushUnsubscribe(subscription)
                    .then(function (response) {
                        return response;
                    })
                    .then(function (text) {
                        hasSubscription = false;
                    })
                    .catch(function (error) {
                        hasSubscription = true;
                        console.error('error fetching subscribe', error);
                    });

                hasSubscription = false;

                return subscription.unsubscribe();
            }
        });
}

export function register(registration: ServiceWorkerRegistration) {
    serviceWorkerRegistration = registration;

    serviceWorkerRegistration.pushManager.getSubscription()
        .then((subscription) => {
            hasSubscription = !(subscription === null);

            if (!hasSubscription) {
                subscribeUser();
            } else {
                api.pushSubscribe(subscription!);
            }
        });
}
