import webPush, { PushSubscription } from 'web-push';
import { getAllSubscriptions, removeSubscription } from "@ci-server/shared/src/notifications/subscriptions";

webPush.setVapidDetails(
    'mailto:push@ci-server.com',
    process.env.VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
);

export function isConfigured() {
    return process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY;
}

export async function sendToAll<T>(title: string, body: string, data: T) {
    if (!isConfigured()) {
        return;
    }

    const subscriptions = getAllSubscriptions();

    subscriptions.forEach(subscription => send(subscription, title, body, data));
}

async function send<T>(subscription: PushSubscription, title: string, body: string, data: T) {
    console.log(`[push] send notification ${title} : ${body}`);

    const payload = JSON.stringify({
        title,
        body,
        data
    });

    const options = {
        TTL: 3600 // 1sec * 60 * 60 = 1h
    };

    try {
        await webPush.sendNotification(
            subscription,
            payload,
            options
        );
    } catch (err) {
        removeSubscription(subscription);
        console.log('Error during send', err);
    }
}
