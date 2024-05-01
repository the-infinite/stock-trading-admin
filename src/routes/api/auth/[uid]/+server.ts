import { usersCollection } from '$lib/server';
import { json, text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { UserModel } from '$lib/types/user';

export const GET: RequestHandler = async (event) => {
    try {
        const uid: string = event.params.uid;
        const user = (await usersCollection.where("uid", "==", uid).get()).docs[0].data() as UserModel;

        // Return this user.
        return json(user);
    } catch (e) {
        console.log(e);
        return text("Failed to create your new user account.", {
            status: 500
        });
    }
};