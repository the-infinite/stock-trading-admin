import type { WalletModel } from '$lib/types/wallet';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    var balance: number = 0;
    var sales: number = 0;
    var purchases: number = 0;
    var assets: WalletModel[] = [];

    // Return the aggregated balances
    return {
        balance,
        sales,
        purchases,
        assets,
    };
}) satisfies PageServerLoad;