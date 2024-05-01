import { usersCollection } from '$lib/server';
import { json, text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { UserModel } from '$lib/types/user';

export const POST: RequestHandler = async (event) => {
    try {
        // Get the user model from the request.
        const dto: UserModel = await event.request.json();
        
        // Wait for this write to complete.
        await usersCollection.doc().set(dto);

        // Return a new JSON response.
        return json(dto);
    } catch (e) {
        console.log(e);
        return text("Failed to create your new user account.", {
            status: 500
        });
    }
};