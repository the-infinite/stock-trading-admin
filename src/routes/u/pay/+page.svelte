<script lang="ts">
	import type { PageData } from './$types';
	import { ProgressRadial, getToastStore } from '@skeletonlabs/skeleton';
	import { usersStore, selectedUser } from '$lib/session';
	import type { UserModel } from '$lib/types/user';
	import { onMount } from 'svelte';
	import { type TransactionModel } from '$lib/types/transaction';

	export let data: PageData;
	const toastStore = getToastStore();

	var loading: boolean = false;
	var quantity: number = 1;
	var transactionType: string = data.action ?? 'buy';
	var asset = data.asset;
	var assetId = data.asset?.id;
	var customerId: string;
	var selectedCustomer: UserModel | null;
	var employee: UserModel;

	onMount(function () {
		employee = $usersStore![$selectedUser];
	});

	/**
	 * Helper function used to print an error to the screen.
	 * @param message The error message to print.
	 */
	function showError(message: string) {
		toastStore.trigger({
			message: message,
			background: 'variant-filled-error'
		});

		// Now it is no longer loading.
		loading = false;
	}

	async function createNew() {
		// We got here.
		loading = true;

		//? If the asset is not yet selected.
		if (!asset) {
			showError('You are required to choose an asset.');
			return;
		}

		//? If no customer is selected.
		if (!selectedCustomer) {
			showError('You are required to select a customer.');
			return;
		}

		//? If we cannot afford to pay for this yeah?
		if (quantity > asset.quantity && transactionType === 'sell') {
			showError('Cannot sell more than you already have');
		}

		// This is fair enough.
		const margin = asset.price - asset.boughtAt;

		// This is nice.
		const transaction: TransactionModel = {
			id: '',
			owner: employee.uid,
			type: transactionType as 'buy' | 'sell',
			price: asset.price,
			quantity,
			customer: selectedCustomer.uid,
			asset: asset.asset,
			assetName: asset.name,
			timestamp: Date.now(),
			margin,
			status: margin === 0 ? 'none' : margin < 1 ? 'loss' : 'profit'
		};

		// Get the response.
		const response = await fetch('/api/pay', {
			method: 'POST',
			body: JSON.stringify(transaction)
		});

		// If this is fine.
		if (response.ok) {
			toastStore.trigger({
				message: await response.text(),
				background: 'variant-filled-success'
			});

			// No more loading.
			loading = false;
			window.history.back();
		}

		// Moving away.
		else {
			showError(await response.text());
		}
	}
</script>

<!-- Now we can continue along -->
<h4 class="text-black text-xl mb-7 mt-4">Make an order</h4>

<!-- What comes next. -->
<div class="flex lg:flex-row flex-col lg:gap-8 gap-2 lg:pr-28">
	<!-- First, the image -->
	<img class="rounded-xl" src="/image-order.png" alt="SCUPay payment module" />

	<!-- Second, the text. -->
	<div class="flex flex-col w-full gap-4 lg:mt-0 mt-5">
		<!-- Each item in tow -->
		<select class="w-full text-black rounded-md" bind:value={customerId}>
			<option
				value="none"
				on:click={function () {
					selectedCustomer = null;
				}}>Choose a Customer</option
			>
			{#each data.customers as customer}
				<option
					value={customer.uid}
					on:click={function () {
						selectedCustomer = customer;
					}}>{customer.firstname} {customer.lastname}</option
				>
			{/each}
		</select>

		<!-- Some space -->
		<div class="bg-gray-500 h-px" />

		{#if !data.action}
			<!-- For the operation we are performing. -->
			<select class="w-full text-black rounded-md" bind:value={transactionType}>
				<option value="buy">Buy</option>
				<option value="sell">Sell</option>
			</select>

			<!-- Some space -->
			<div class="bg-gray-500 h-px" />
		{/if}

		<!-- Each item in tow -->
		<div class="flex flex-row justify-between">
			<p class="text-gray-500 lg:text-base text-sm">Employee name</p>
			<p class="text-black lg:text-base text-sm">{employee?.firstname} {employee?.lastname}</p>
		</div>

		<!-- To the specifics of this payment -->
		<div class="bg-gray-500 h-px" />

		<!-- If this had a preconfigured asset-->
		{#if data.asset}
			<!-- Each item in tow -->
			<div class="flex flex-row justify-between">
				<p class="text-gray-500 lg:text-base text-sm">Asset name</p>
				<p class="text-black lg:text-base text-sm">{data.asset?.name}</p>
			</div>
		{:else}
			<select class="w-full text-black rounded-md" bind:value={assetId}>
				<option
					value="none"
					on:click={function () {
						asset = null;
					}}>Choose an asset</option
				>
				{#each data.assets as wallet}
					<option
						value={wallet.asset}
						on:click={function () {
							asset = wallet;
						}}>{wallet.name}</option
					>
				{/each}
			</select>
		{/if}

		<!-- Some space -->
		<div class="bg-gray-500 h-px mb-10" />

		<!-- Description -->
		<div class="flex flex-row gap-4 justify-between">
			<p class="text-gray-500 lg:text-base text-sm">Price</p>
			<p class="text-black lg:text-base text-sm">₦{asset?.price.toFixed(2) ?? '0.00'}</p>
		</div>

		<!-- Some space -->
		<div class="bg-gray-500 h-px" />

		<!-- Each item in tow -->
		<input
			class="border-2 rounded-lg w-full text-black placeholder-black/45 border-primary-500/80"
			type="number"
			bind:value={quantity}
			min="1"
			max={transactionType === 'sell' ? asset?.quantity ?? 10 : 100}
			placeholder="Quantity"
		/>

		<!-- Some space -->
		<div class="bg-gray-500 h-px" />

		<!-- Session -->
		<div class="flex flex-row gap-4 justify-between">
			<p class="text-gray-500 lg:text-base text-sm">Total</p>
			<p class="text-black lg:text-base text-sm">
				₦{((asset?.price ?? 1) * quantity).toFixed(2)}
			</p>
		</div>

		<!-- Some space -->
		<div class="bg-gray-500 h-px" />

		<!-- Finish this -->
		<button
			class="btn bg-primary-500 flex flex-row justify-start text-xl text-white w-full text-center mt-6"
			on:click={createNew}
		>
			{#if loading}
				<ProgressRadial width="w-5" />
			{:else}
				<p class="text-center w-full">Make order</p>
			{/if}
		</button>
	</div>
</div>
