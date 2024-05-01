<script lang="ts">
	// Floating UI for Popups
	import { AppShell, AppBar, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';

	// For other things.
	import { browser } from '$app/environment';
	import Navigation from '$lib/components/Navigation.svelte';
	import SizedBox from '$lib/components/SizedBox.svelte';
	import { usersStore, selectedUser } from '$lib/session';

	// Fetch the drawer store
	const drawerStore = getDrawerStore();
	const user = $usersStore ? $usersStore[$selectedUser] : undefined;

	// Redirect to the login screen when there is no logged in user dweeb.
	if (browser && !user) {
		window.location.assign('/auth/login');
	}

	/**
	 * The drawer store.
	 */
	function drawerOpen(): void {
		drawerStore.open();
	}
</script>

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
		<AppBar class="lg:hidden min-h-20 flex justify-center" background="bg-primary-700">
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
		</AppBar>
	</svelte:fragment>

	<!-- For the sidebar in the left. -->
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>

	<!-- Router Slot -->
	<div class="p-10 bg-surface-300 overflow-y-scroll pb-32 h-fit min-h-screen">
		<!-- If this is not the settings page -->
		<h2 class="text-black text-3xl font-bold">Welcome, {user?.firstname} 👋</h2>
		<h3 class="text-gray-700 text-lg">Here's what happened since you left</h3>

		<!-- Some space -->
		<SizedBox height="h-8" />

		<!-- Finally show the actual contents here. -->
		<slot />
	</div>
</AppShell>
