import { Request, Response } from "express";
import { ServerError } from "../models/error";
import { addSubscription } from "@ci-server/shared/src/notifications/subscriptions";
import type { PushSubscription } from 'web-push';

export async function subscribe(req: Request<{}, PushSubscription>, res: Response<ServerError | {}>) {
    console.log('[push] new subscriber');

    try {
        const subscription = req.body;

        await addSubscription(subscription);

        res.status(200).send({});
    } catch (err) {
        res.status(500).send({ error: 'Something is going bad. Maybe build settings is missing.' });
    }
}
