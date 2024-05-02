<script lang="ts">
	export let amount: number;
	export let title: string;
	export let color: string = 'text-primary-800';
	export let isUnits: boolean = false;
	export let buttonTitle: string = 'View All';
	export let viewAction: (() => void) | null = null;

	/// The digits after the decimal place.
	let fractionDigits = amount.toFixed(2).split('.')[1].padStart(2, '0');
</script>

<div class="flex flex-col border border-gray-400 rounded-lg w-full p-5 gap-3">
	<!-- The title section -->
	<p class="text-gray-700 text-sm">{title}</p>

	<!-- The amount of money section -->
	<p class="{color} font-bold text-3xl">
		{#if isUnits}
			{amount} <span class="text-xl">units</span>
		{:else}
			₦{Math.floor(amount)}.<span class="text-xl">{fractionDigits}</span>
		{/if}
	</p>

	<!-- The view action button -->
	<button
		class="{viewAction ? "" : "invisible"} text-black border-gray-400 border pl-3 pr-3 pt-1 pb-1 w-fit text-sm rounded-md"
		on:click={viewAction}>{buttonTitle}</button
	>
</div>
