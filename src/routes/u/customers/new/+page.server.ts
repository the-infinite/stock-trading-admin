import { usersCollection } from '$lib/server';
import type { UserModel } from '$lib/types/user';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
    const userId = event.url.searchParams.get("id");

    //? If this is actually set.
    if (userId) {
        return {
            user: (await usersCollection.where("uid", "==", userId).get()).docs[0].data() as UserModel,
        };
    }

    return {

    };
}) satisfies PageServerLoad;