import { transactionsCollection } from '$lib/server';
import type { TransactionModel } from '$lib/types/transaction';
import { Filter } from 'firebase-admin/firestore';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
    // For the person making the request.
    const owner = event.url.searchParams.get("id");

    // For the results
    var balance: number = 0;
    var units: number = 0;
    var amount: number = 0;
    var transactions: TransactionModel[] = [];

    // Do something to each transaction in the database.
    (await transactionsCollection.where("type", "==", "sell").get()).forEach(function (value) {
        // This transaction.
        const transaction = value.data() as TransactionModel;

        // Increase the necessary data using these numbers.
        units += transaction.quantity;
        amount += transaction.price;

        // Push this transaction.
        transactions.push(transaction);
    });


    // Return this balance.
    return {
        balance,
        units,
        amount,
        transactions,
    };
}) satisfies PageServerLoad;