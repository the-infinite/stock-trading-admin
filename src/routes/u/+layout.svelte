<script lang="ts">
	// Floating UI for Popups
	import {
		AppShell,
		AppBar,
		Avatar,
		Drawer,
		initializeStores,
		Modal,
		Toast,
		getDrawerStore
	} from '@skeletonlabs/skeleton';

	// For other things.
	import MediaQuery from '$lib/components/MediaQuery.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import SizedBox from '$lib/components/SizedBox.svelte';

	// Initialize the stores.
	initializeStores();

	// Fetch the drawer store
	const drawerStore = getDrawerStore();

	/**
	 * The drawer store.
	 */
	function drawerOpen(): void {
		drawerStore.open();
	}
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

<Drawer
	bgBackdrop="bg-transparent"
	shadow=""
	bgDrawer="bg-transparent"
	width="w-70"
	on:backdrop={drawerStore.close}
>
	<Navigation />
</Drawer>

<!-- Create the app shell -->
<AppShell slotSidebarLeft="w-0 lg:w-fit bg-primary-700">
	<!-- For the header on top -->
	<svelte:fragment slot="header">
		<AppBar class="lg:hidden" background="bg-primary-700">
			<svelte:fragment slot="lead">
				<button class="btn btn-sm mr-4" on:click={drawerOpen}>
					<span>
						<svg viewBox="0 0 100 100" class="fill-token w-4 h-4">
							<rect width="100" height="20" />
							<rect y="40" width="80" height="20" x="10" />
							<rect y="80" width="100" height="20" />
						</svg>
					</span>
				</button>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<div class="flex flex-row items-center">
					<!-- For the email thing -->
					<button
						class="pb-1 pt-1 pl-2 pr-2 w-fit h-fit border rounded-md text-center items-center justify-center mr-2"
					>
						<i class="fas fa-envelope text-white"></i>
					</button>

					<!-- For the avatar widget -->
					<Avatar initials="SH" fill="fill-gray-900" background="bg-gray-300" width="w-14" />

					<!-- Some extra spacing before this one -->
					<SizedBox width="w-4" />

					<!-- More user related info. -->
					<div class="flex flex-col">
						<p class="text-white font-bold text-sm">Student Helper</p>
						<p class="text-white text-sm">Administator</p>
						<p class="text-white text-sm">admin@calebuniversity.edu.ng</p>
					</div>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- For the sidebar in the left. -->
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>

	<!-- Router Slot -->
	<div class="p-10 bg-surface-300 overflow-y-scroll pb-32 h-fit min-h-screen">
		<!-- If this is not the settings page -->
		<h2 class="text-black text-3xl font-bold">Welcome, Admin 👋</h2>
		<h3 class="text-gray-700 text-lg">Here's what happened since you left</h3>

		<!-- Some space -->
		<SizedBox height="h-8" />

		<!-- Finally show the actual contents here. -->
		<slot />
	</div>
</AppShell>
