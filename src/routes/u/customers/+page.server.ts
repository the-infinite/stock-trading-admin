import { usersCollection } from '$lib/server';
import { UserType, type UserModel } from '$lib/types/user';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const users: UserModel[] = [];

    try {
        (await usersCollection.where("userType", "==", UserType.customer).get()).forEach((user) =>
            users.push(user.data() as UserModel)
        );
    } catch (e) {
        console.log(e);
    }

    // Return the aggregated customers.
    return {
        users,
    };
}) satisfies PageServerLoad;