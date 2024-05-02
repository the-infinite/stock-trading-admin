import { TWELVE_DATA_API_KEY } from '$env/static/private';
import { toNaira, transactionsCollection, walletsCollection } from '$lib/server';
import type { TransactionModel } from '$lib/types/transaction';
import type { WalletModel } from '$lib/types/wallet';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
    // For the user making the request.
    const owner = event.url.searchParams.get("id");

    // Now for the results...
    var balance: number = 0;
    var sales: number = 0;
    var purchases: number = 0;
    var assets: WalletModel[] = [];

    // This is the transaction database.
    (await walletsCollection.orderBy("asset").get()).forEach(function (wallet) {
        assets.push(wallet.data() as WalletModel);
    });

    // Fetch the transactions so we can aggregate the amount of purchases and sales.
    (await transactionsCollection.get()).forEach(function (value) {
        const transaction = value.data() as TransactionModel;

        // If this is a purchase
        if (transaction.type === "buy") {
            purchases += toNaira(transaction.quantity * transaction.price);
        }

        // If this is a sell...
        else {
            sales += toNaira(transaction.quantity * transaction.price);
        }
    });

    // Now, let us iterate on each asset.
    // for (const asset of assets) {
    //     const response = await event.fetch(`https://api.twelvedata.com/price?symbol=${asset.asset}&apikey=${TWELVE_DATA_API_KEY}`);

    //     // If this is fine...
    //     if (response.ok) {
    //         const data: { price: string } = await response.json();
    //         asset.price = toNaira(parseFloat(data.price));

    //         // Ideally, here, we should also update the value of the price for this wallet.
    //         await walletsCollection.doc(asset.id).update("price", asset.price);
    //     }
    // }

    // Return the aggregated balances
    return {
        balance,
        sales,
        purchases,
        assets,
    };
}) satisfies PageServerLoad;