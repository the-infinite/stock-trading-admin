<script lang="ts">
	/**
	 * The asset that the user wants to purchase.
	 */
	let asset: string = 'AAPL';

	// Make this one.
	function makeOrder() {
		window.location.assign(`/u/pay?asset=${asset}`);
	}
</script>

<div class="flex flex-row justify-between lg:gap-0 gap-1">
	<h2 class="text-black lg:text-3xl">What would you like to order today?</h2>

	<div class="flex flex-col md:flex-row lg:gap-0 gap-4 lg:items-start items-end">
		<select class="w-fit text-black rounded-md text-sm lg:mr-5" bind:value={asset}>
			<option value="AAPL">Apple Inc</option>
			<option value="AMD">AMD Technologies</option>
			<option value="INTL">Intel Corp</option>
		</select>

		<button class="rounded-lg bg-primary-700 text-sm" on:click={makeOrder}>
			<div class="flex flex-row gap-2 pl-4 pr-4 pt-2 pb-2 items-center">
				<i class="fas fa-plus"></i>
				<p class="text-white">Make Order</p>
			</div>
		</button>
	</div>
</div>
