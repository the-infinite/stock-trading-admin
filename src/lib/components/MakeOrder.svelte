<script lang="ts">
	import type { WalletModel } from '$lib/types/wallet';

	/**
	 * The asset that the user wants to purchase.
	 */
	let asset: string = 'AAPL';
	export let wallets: WalletModel[] = [];

	// Make this one.
	function makeOrder() {
		window.location.assign(`/u/pay?asset=${asset}`);
	}
</script>

<div class="flex flex-col md:w-full lg:flex-row justify-between lg:gap-0 gap-1">
	<h2 class="text-black lg:text-3xl lg:text-start text-center">What would you like to order today?</h2>

	<div class="flex mt-5 lg:mt-0 flex-row lg:gap-0 gap-4 lg:items-start items-end">
		<select class="w-fit text-black rounded-md text-sm lg:mr-5" bind:value={asset}>
			{#each wallets as wallet}
				<option value={wallet.asset}>{wallet.name}</option>
			{/each}
		</select>

		<button class="rounded-lg bg-primary-700 text-sm" on:click={makeOrder}>
			<div class="flex flex-row gap-2 pl-4 pr-4 pt-2 pb-2 items-center">
				<i class="fas fa-plus"></i>
				<p class="text-white">Make Order</p>
			</div>
		</button>
	</div>
</div>
