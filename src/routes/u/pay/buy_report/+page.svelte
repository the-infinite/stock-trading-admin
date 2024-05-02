<script lang="ts">
	import MakeOrder from '$lib/components/MakeOrder.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<!-- First, we have the widget for makring orders... -->
<MakeOrder wallets={data.assets} />
