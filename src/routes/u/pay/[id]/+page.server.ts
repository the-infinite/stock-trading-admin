import { transactionsCollection, usersCollection } from '$lib/server';
import type { TransactionModel } from '$lib/types/transaction';
import type { UserModel } from '$lib/types/user';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
    const transaction: TransactionModel | undefined = (await transactionsCollection.doc(event.params.id).get()).data() as TransactionModel;
    var customer: UserModel | undefined;
    var employee: UserModel | undefined;

    // If this transactionis defined...
    if (transaction) {
        customer = (await usersCollection.doc(transaction.customer).get()).data() as UserModel
        employee = (await usersCollection.doc(transaction.owner).get()).data() as UserModel
    }

    // Return the 
    return {
        transaction,
        customer,
        employee,
    };
}) satisfies PageServerLoad;