<script lang="ts">
	import { getDate } from '$lib';
	import AmountCard from '$lib/components/AmountCard.svelte';
	import MakeOrder from '$lib/components/MakeOrder.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	function viewTransaction(id: string) {
        window.location.assign("/u/pay/"+id);
    }
</script>

<!-- First, we have the widget for makring orders... -->
<MakeOrder wallets={data.assets} />

<!-- Second, we have the list of balances -->
<div class="flex lg:flex-row flex-col gap-5 mt-7 mb-7 w-full justify-between">
	<!-- Balance -->
	<AmountCard amount={data.balance} title="Wallet balance" />

	<!-- Total sales -->
	<AmountCard amount={data.units} isUnits={true} title="Total units bought" />

	<!-- Total purchases -->
	<AmountCard
		amount={data.amount}
		isUnits={false}
		color="text-error-800"
		title="Total amount bought"
	/>
</div>

<!-- Third, the actual purchase report -->
<h2 class="text-black text-lg xl:text-2xl">Purchase Report</h2>
<div class="md:w-full w-screen">
	<table class="text-gray-500 w-full mt-6 text-sm overflow-x-scroll">
		<tr class="bg-gray-200 text-start">
			{#if data.transactions.length < 1}
				<th class="pl-4 pr-1 pt-3 pb-3 text-center">No results</th>
			{:else}
				<th class="pl-4 pr-1 pt-3 pb-3 text-center">Date</th>
				<th class="pl-1 pr-1 pt-3 pb-3 text-center">Item</th>
				<th class="pl-1 pr-1 pt-3 pb-3 text-center">Quantity</th>
				<th class="pl-1 pr-1 pt-3 pb-3 text-center">Bought at</th>
				<th class="pl-1 pr-1 pt-3 pb-3 text-center">Status</th>
				<th class="pl-1 pr-1 pt-3 pb-3 text-center">Actions</th>
			{/if}
		</tr>
		{#if data.transactions.length < 1}
			<p class="w-full text-center text-black p-4">Nothing to show yet</p>
		{:else}
			<tbody>
				{#each data.transactions as transaction}
					<tr>
						<!-- For the asset name. -->
						<td class="pl-4 pr-1 pt-3 pb-3 text-black text-xs text-center">
							{getDate(new Date(transaction.timestamp))}
						</td>

						<!-- For the asset quantitiy. -->
						<td class="pl-1 pr-1 pt-3 pb-3 text-black text-xs text-center"
							>{transaction.assetName}</td
						>

						<!-- For the asset quantitiy. -->
						<td class="pl-1 pr-1 pt-3 pb-3 text-black text-xs text-center"
							>{transaction.quantity}</td
						>

						<!-- For the price of this asset... -->
						<td
							class="pl-4 pr-1 pt-3 pb-3 {transaction.status === 'none'
								? 'text-black'
								: transaction.status === 'profit'
									? 'text-success-700'
									: transaction.status === 'running'
										? 'text-warning-700'
										: 'text-error-700'} text-xs text-center"
						>
							<div class="w-full flex flex-col items-center">
								<p class="bg-gray-100 rounded-full w-fit py-1 px-2">
									{#if transaction.status === 'running'}
										N/A
									{:else}
										{transaction.status === 'none'
											? '±'
											: transaction.status === 'profit'
												? '+'
												: '-'}₦{transaction.price.toFixed(2)}
									{/if}
								</p>
							</div>
						</td>

						<!-- For the value of this asset... -->
						<td
							class="pl-4 pr-1 pt-3 pb-3 {transaction.status === 'none'
								? 'text-black'
								: transaction.status === 'profit'
									? 'text-success-700'
									: transaction.status === 'running'
										? 'text-warning-700'
										: 'text-error-700'} text-xs text-center items-center"
						>
							<div class="w-full flex flex-col items-center">
								<p class="bg-gray-100 rounded-full w-fit py-1 px-2">
									{transaction.status === 'none'
										? 'CLOSED'
										: transaction.status === 'profit'
											? 'CLOSED IN PROFIT'
											: transaction.status === 'running'
												? 'RUNNING'
												: 'CLOSED IN LOSS'}
								</p>
							</div>
						</td>

						<!-- For the button -->
						<td class="pl-1 pr-1 pt-3 pb-3 text-black text-xs text-center w-fit">
							<button
								class="text-black border rounded-md pl-4 pr-4 pt-2 pb-2"
								on:click={() => viewTransaction(transaction.id)}
							>
								Buy
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		{/if}
	</table>
</div>
