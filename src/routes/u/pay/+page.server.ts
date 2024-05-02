import { usersCollection, walletsCollection } from '$lib/server';
import { UserType, type UserModel } from '$lib/types/user';
import type { WalletModel } from '$lib/types/wallet';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
    const customers: UserModel[] = [];
    const assets: WalletModel[] = [];
    const action = event.url.searchParams.get("action");
    const assetId = event.url.searchParams.get("asset");
    var asset: WalletModel | null = null;

    // First, aggregate the 
    (await usersCollection.where("userType", "==", UserType.customer).get()).forEach((user) =>
        customers.push(user.data() as UserModel)
    );

    // Aggregate the assets.
    (await walletsCollection.get()).forEach((wallet) =>
        assets.push(wallet.data() as WalletModel)
    );

    // Get the current asset, if any be.
    try {
        // Second, fetch the asset.
        asset = (await walletsCollection.where("asset", "==", assetId).get()).docs[0].data() as WalletModel;
    } catch (e) {
        console.log(e);
    }

    // Return the retrieved results.
    return {
        customers,
        asset,
        action,
        assets,
    };
}) satisfies PageServerLoad;