import { text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { TransactionModel } from '$lib/types/transaction';
import { transactionsCollection, walletsCollection } from '$lib/server';
import type { WalletModel } from '$lib/types/wallet';

export const POST: RequestHandler = async (event) => {
    // First, get the transaction value from the client-side.
    const transaction: TransactionModel = await event.request.json();
    const document = transactionsCollection.doc();

    // Update the ID relevantly.
    transaction.id = document.id;

    // Make the document.
    await document.set(transaction);

    // Get the document reference for the user's wallet.
    const walletDoc = (await walletsCollection.where("asset", "==", transaction.asset).get()).docs[0];
    const ref = walletDoc.ref;
    const currentData = walletDoc.data() as WalletModel;

    //? If this transaction was a sell.
    if (transaction.type === "sell") {
        await ref.update({
            quantity: currentData.quantity - transaction.quantity,
        });
    }

    //? If this is a purchase transaction.
    else {
        await ref.update({
            boughtAt: transaction.price,
            quantity: currentData.quantity + transaction.quantity,
        });
    }

    // Return this nice message.
    return text("Created the transaction successfully");
};