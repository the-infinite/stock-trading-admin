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

export const DELETE: RequestHandler = async (event) => {
    const userId = event.url.searchParams.get("id");

    // Delete the user document successfully.
    if (!userId) {
        return text("Expected the ID of the user to delete in this request.", {
            status: 400,
        })
    }

    // Delete the user.
    await (await usersCollection.where("uid", "==", userId).get()).docs[0].ref.delete()

    // We did this, right?
    return text("Deleted the user successfully");
};

export const PUT: RequestHandler = async (event) => {
    const user: UserModel = await event.request.json();
    const userId = event.url.searchParams.get("id");

    // Delete the user document successfully.
    if (!userId) {
        return text("Expected the ID of the user to update in this request.", {
            status: 400,
        })
    }

    // Just create and set the user, no?
    try {
        await (await usersCollection.where("uid", "==", userId).get()).docs[0].ref.update({
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
        });
    } catch (e) {
        return text(`${e}`, {
            status: 500,
        });
    }

    // We did this, right?
    return text("Updated the user account successfully");
};