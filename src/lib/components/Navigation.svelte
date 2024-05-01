<script lang="ts">
	import { Avatar, getDrawerStore } from '@skeletonlabs/skeleton';
	import DrawerButton from './DrawerButton.svelte';
	import { browser } from '$app/environment';
	import { usersStore, selectedUser } from '$lib/session';
	import UserSelection from './UserSelection.svelte';
	import type { UserModel } from '$lib/types/user';

	// Get the drawer
	const drawerStore = getDrawerStore();
	let selectedItemIndex: number;
	const user = $usersStore ? $usersStore![$selectedUser] : undefined;

	//? If we are running in the browser...
	if (browser) {
		if (window.location.pathname.startsWith('/u/pay')) {
			selectedItemIndex = 1;
		} else if (window.location.pathname.startsWith('/u/customers')) {
			selectedItemIndex = 2;
		} else if (window.location.pathname.startsWith('/u/employees')) {
			selectedItemIndex = 3;
		} else if (window.location.pathname.startsWith('/u/settings')) {
			selectedItemIndex = 4;
		} else if (window.location.pathname.startsWith('/u/logout')) {
			selectedItemIndex = 5;
		} else {
			selectedItemIndex = 0;
		}
	}

	// Close this drawer.
	function drawerClose(index: number): void {
		// Now, we need a more permanent solution.
		selectedItemIndex = index;
		drawerStore.close();
	}

	function addAccount() {

	}

	function switchAccount(newUser: UserModel, index: number) {

	}
</script>

<nav class="list-nav p-4 bg-primary-700 h-full">
	<div class="flex flex-col w-full items-center mb-5 mt-10">
		<Avatar
			initials="{user?.firstname[0]}{user?.lastname[0]}"
			src={user?.profileImage}
			fill="fill-gray-900"
			background="bg-gray-300"
			width="w-32"
		/>

		<UserSelection 
			users={$usersStore ?? []}
			activeUser={user}
			onAddAccount={addAccount}
			onSelectUser={switchAccount}/>
	</div>
	<ul>
		<li>
			<DrawerButton
				name="Dashboard"
				link="/u"
				image="/icon{selectedItemIndex === 0 ? '/dark' : ''}/menu.svg"
				onClick={() => drawerClose(0)}
				isActive={selectedItemIndex === 0}
			/>
		</li>
		<li>
			<DrawerButton
				name="Transaction Books"
				link="/u/pay"
				image="/icon{selectedItemIndex === 1 ? '/dark' : ''}/report.svg"
				onClick={() => drawerClose(1)}
				isActive={selectedItemIndex === 1}
			/>
		</li>
		<li>
			<DrawerButton
				name="Customers"
				link="/u/customers"
				image="/icon{selectedItemIndex === 2 ? '/dark' : ''}/customer.svg"
				onClick={() => drawerClose(2)}
				isActive={selectedItemIndex === 2}
			/>
		</li>
		<li>
			<DrawerButton
				name="Employees"
				link="/u/employees"
				image="/icon{selectedItemIndex === 3 ? '/dark' : ''}/employee.svg"
				onClick={() => drawerClose(3)}
				isActive={selectedItemIndex === 3}
			/>
		</li>
		<br />
		<br />
		<li>
			<DrawerButton
				name="Settings"
				link="/u/settings"
				image="/icon{selectedItemIndex === 4 ? '/dark' : ''}/settings.svg"
				onClick={() => drawerClose(4)}
				isActive={selectedItemIndex === 4}
			/>
		</li>
		<li>
			<DrawerButton
				name="Log out"
				link="/u/logout"
				image="/icon{selectedItemIndex === 5 ? '/dark' : ''}/logout.svg"
				onClick={() => drawerClose(5)}
				isActive={selectedItemIndex === 5}
			/>
		</li>
	</ul>
</nav>
