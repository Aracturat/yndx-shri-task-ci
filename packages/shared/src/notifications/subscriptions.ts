import type { PushSubscription } from 'web-push';
import low from 'lowdb';
import path from 'path';
import FileSync from 'lowdb/adapters/FileSync';

interface DbScheme {
    subscriptions: PushSubscription[]
}


const adapter = new FileSync<DbScheme>(path.join(__dirname, 'notification-db.json'));
const db = low(adapter);

db.defaults<DbScheme>({ subscriptions: [] })
    .write()

const subscriptions = db.get('subscriptions');

export function addSubscription(subscription: PushSubscription) {
    removeSubscription(subscription);

    subscriptions
        .push(subscription)
        .write();
}

export function removeSubscription(subscription: PushSubscription) {
    subscriptions
        .remove(subscription)
        .write();
}

export function getAllSubscriptions() {
    return subscriptions
        .value();
}

