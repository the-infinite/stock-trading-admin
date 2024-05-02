import { transactionsCollection, walletsCollection } from '$lib/server';
import type { TransactionModel } from '$lib/types/transaction';
import type { PageServerLoad } from './$types';
import type { WalletModel } from '$lib/types/wallet';

export const load = (async (event) => {
    // For the results
    var balance: number = 0;
    var units: number = 0;
    var amount: number = 0;
    var transactions: TransactionModel[] = [];
    var assets: WalletModel[] = [];

    // This is the transaction database.
    (await walletsCollection.orderBy("asset").get()).forEach(function (result) {
        const wallet = result.data() as WalletModel;
        balance += wallet.price * wallet.quantity;
        assets.push(wallet);
    });

    // Do something to each transaction in the database.
    (await transactionsCollection.where("type", "==", "sell").get()).forEach(function (value) {
        // This transaction.
        const transaction = value.data() as TransactionModel;

        // Increase the necessary data using these numbers.
        units += transaction.quantity;
        amount += transaction.price * transaction.quantity;

        // Push this transaction.
        transactions.push(transaction);
    });


    // Return this balance.
    return {
        balance,
        units,
        amount,
        transactions,
        assets,
    };
}) satisfies PageServerLoad;