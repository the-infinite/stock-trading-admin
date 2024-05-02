import { text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { UserModel } from '$lib/types/user';
import { usersCollection } from '$lib/server';

export const POST: RequestHandler = async (event) => {
    const user: UserModel = await event.request.json();
    const document = usersCollection.doc();

    // Update the user's ID.
    user.uid = document.id;

    // Just create and set the user, no?
    await document.set(user);

    // We did this, right?
    return text("Created the user successfully");
};