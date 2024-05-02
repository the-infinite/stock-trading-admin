<script lang="ts">
	import AmountCard from '$lib/components/AmountCard.svelte';
	import MakeOrder from '$lib/components/MakeOrder.svelte';
	import { selectedUser, usersStore } from '$lib/session';
	import type { PageData } from './$types';

	export let data: PageData;

	function onViewTotalSales() {
		const users = $usersStore;
		const activeUser = $selectedUser;
		const user = users![activeUser];
		window.location.assign('/u/pay/sales_report?id=' + user.uid);
	}

	function onViewTotalPurchases() {
		const users = $usersStore;
		const activeUser = $selectedUser;
		const user = users![activeUser];
		window.location.assign('/u/pay/buy_report?id=' + user.uid);
	}

	function buyAsset(asset: string) {}

	function sellAsset(asset: string) {}
</script>

<div class="flex flex-col">
	<!-- First, we have the widget for makring orders... -->
	<MakeOrder 
		wallets={data.assets}/>

	<!-- Second, we have the list of balances -->
	<div class="flex lg:flex-row flex-col gap-5 mt-7 mb-7 w-full justify-between">
		<!-- Balance -->
		<AmountCard amount={data.balance} title="Balance" />

		<!-- Total sales -->
		<AmountCard
			amount={data.sales}
			color="text-success-800"
			title="Total sales"
			viewAction={onViewTotalSales}
		/>

		<!-- Total purchases -->
		<AmountCard
			amount={data.purchases}
			color="text-error-800"
			title="Total purchases"
			viewAction={onViewTotalPurchases}
		/>
	</div>

	<!-- All assets... -->
	<h2 class="text-black text-lg xl:text-2xl">All Assets</h2>
	<div class="md:w-full w-screen">
		<table class="text-gray-500 w-full mt-6 text-sm overflow-x-scroll">
			<tr class="bg-gray-200 text-start">
				{#if data.assets.length < 1}
					<th class="pl-4 pr-1 pt-3 pb-3 text-center">No results</th>
				{:else}
					<th class="pl-4 pr-1 pt-3 pb-3 text-center">Name</th>
					<th class="pl-1 pr-1 pt-3 pb-3 text-center">Quantity</th>
					<th class="pl-1 pr-1 pt-3 pb-3 text-center">Price</th>
					<th class="pl-1 pr-1 pt-3 pb-3 text-center">Total Value</th>
					<th class="pl-1 pr-1 pt-3 pb-3 text-center">Actions</th>
				{/if}
			</tr>
			{#if data.assets.length < 1}
				<p class="w-full text-center text-black p-4">Nothing to show yet</p>
			{:else}
				<tbody>
					{#each data.assets as asset}
						<tr>
							<!-- For the asset name. -->
							<td class="pl-4 pr-1 pt-3 pb-3 text-black text-xs text-center">
								{asset.name}
							</td>

							<!-- For the asset quantitiy. -->
							<td class="pl-1 pr-1 pt-3 pb-3 text-black text-xs text-center">{asset.quantity}</td>

							<!-- For the price of this asset... -->
							<td
								class="pl-4 pr-1 pt-3 pb-3 {asset.price === asset.boughtAt
									? 'text-black'
									: asset.price > asset.boughtAt
										? 'text-success-700'
										: 'text-error-700'} text-xs text-center"
							>
								<div class="w-full flex flex-col items-center">
									<p class="bg-gray-100 rounded-full w-fit py-1 px-2">
										{asset.price === asset.boughtAt
											? '±'
											: asset.price > asset.boughtAt
												? '+'
												: '-'}₦{asset.price.toFixed(2)}
									</p>
								</div>
							</td>

							<!-- For the value of this asset... -->
							<td
								class="pl-4 pr-1 pt-3 pb-3 {asset.price === asset.boughtAt
									? 'text-black'
									: asset.price > asset.boughtAt
										? 'text-success-700'
										: 'text-error-700'} text-xs text-center items-center"
							>
								<div class="w-full flex flex-col items-center">
									<p class="bg-gray-100 rounded-full w-fit py-1 px-2">
										{asset.price === asset.boughtAt
											? '±'
											: asset.price > asset.boughtAt
												? '+'
												: '-'}₦{(asset.price * asset.quantity).toFixed(2)}
									</p>
								</div>
							</td>

							<!-- For the button -->
							<td class="pl-1 pr-1 pt-3 pb-3 text-black text-xs text-center w-fit">
								<div class="flex flex-row gap-3 w-full justify-center">
									<button
										class="text-black border rounded-md pl-4 pr-4 pt-2 pb-2"
										on:click={() => buyAsset(asset.asset)}
									>
										Buy
									</button>

									<button
										class="text-black border rounded-md pl-4 pr-4 pt-2 pb-2"
										on:click={() => sellAsset(asset.asset)}
									>
										Sell
									</button>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			{/if}
		</table>
	</div>
</div>
