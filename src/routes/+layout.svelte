<script lang="ts">
	import '../app.postcss';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup, Modal, Toast, initializeStores } from '@skeletonlabs/skeleton';

	import MediaQuery from '$lib/components/MediaQuery.svelte';

	// Initialize the stores.
	initializeStores();

	// Do these things.
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<Modal />

<!-- For mobile and tablet screens -->
<MediaQuery query="(max-width: 1024px)" let:matches>
	{#if matches}
		<Toast position="b" />
	{:else}
		<!-- For desktop screens -->
		<Toast position="tr" />
	{/if}
</MediaQuery>

<!-- Just do this -->
<slot />
