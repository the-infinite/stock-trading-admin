<script lang="ts">
	import { getDate } from '$lib';
	import { getUserType, type UserModel } from '$lib/types/user';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { usersStore } from '$lib/session';

	export let data: PageData;

	// Do this one.
	const toastStore = getToastStore();

	// Helper function used to edit a user's information.
	function editUser(user: UserModel) {
		window.location.assign('/u/customers/new?id=' + user.uid);
	}

	// Helper function used to delete a user from the database.
	async function deleteUser(user: string) {
		const response = await fetch('/api/customer?id=' + user, {
			method: 'DELETE'
		});

		//? First, if the schedule was created successfully...
		if (response.ok) {
			toastStore.trigger({
				message: await response.text(),
				background: 'variant-filled-success'
			});

			// Next, we update the user store
			const users = $usersStore!;

			// Next, take it out.
			usersStore.update(() => {
				return [
					...users?.filter(function(loggedInUser, index, _) {
						return loggedInUser.uid !== user;
					})
				]
			});

			// After this goes well, reload the page after 2 seconds.
			setTimeout(function () {
				window.location.reload();
			}, 2000);
		}

		//? This failed so show failure.
		else {
			toastStore.trigger({
				message: await response.text(),
				background: 'variant-filled-error'
			});
		}
	}

	function createUser() {
		window.location.assign('/auth/register/');
	}
</script>

<h2 class="text-black text-lg xl:text-3xl mb-4">All Employees</h2>
<button class="rounded-lg bg-primary-700 text-sm mb-14" on:click={createUser}>
	<div class="flex flex-row gap-2 pl-4 pr-4 pt-2 pb-2 items-center">
		<i class="fas fa-plus"></i>
		<p class="text-white">Create Employee</p>
	</div>
</button>
<h2 class="text-black text-lg xl:text-xl mb-4">Current Employees</h2>
<div class="md:w-full w-screen">
	<table class="text-gray-500 w-full mt-6 text-sm overflow-x-scroll">
		<tr class="bg-gray-200 text-start">
			{#if data.users.length < 1}
				<th class="pl-4 pr-1 pt-3 pb-3 text-center">No results</th>
			{:else}
				<th class="pl-4 pr-1 pt-3 pb-3 text-center">Date joined</th>
				<th class="pl-1 pr-1 pt-3 pb-3 text-center">Name</th>
				<th class="pl-1 pr-1 pt-3 pb-3 text-center">Email Address</th>
				<th class="pl-1 pr-1 pt-3 pb-3 text-center">Phone Number</th>
				<th class="pl-1 pr-1 pt-3 pb-3 text-center">Role</th>
				<th class="pl-1 pr-1 pt-3 pb-3 text-center">Actions</th>
			{/if}
		</tr>
		{#if data.users.length < 1}
			<p class="w-full text-center text-black p-4">Nothing to show yet</p>
		{:else}
			<tbody>
				{#each data.users as user}
					<tr>
						<!-- For the asset ID. -->
						<td class="pl-4 pr-1 pt-3 pb-3 text-black text-xs text-center">
							{getDate(new Date(user.dateJoined))}
						</td>
						<!-- For the name of this user... -->
						<td class="pl-4 pr-1 pt-3 pb-3 text-black text-xs text-center">
							{user.firstname}
							{user.lastname}
						</td>

						<!-- For the email -->
						<td class="pl-4 pr-1 pt-3 pb-3 text-black text-xs text-center">
							{user.email}
						</td>

						<!-- For the phone number -->
						<td class="pl-4 pr-1 pt-3 pb-3 text-black text-xs text-center">
							{user.phone}
						</td>

						<!-- For the role -->
						<td class="pl-4 pr-1 pt-3 pb-3 text-black text-xs text-center">
							{getUserType(user.userType)}
						</td>

						<!-- For the button -->
						<td class="pl-1 pr-1 pt-3 pb-3 text-black text-xs text-center w-fit">
							<div class="flex flex-row gap-3 w-full justify-center">
								<button
									class="text-black border rounded-md pl-4 pr-4 pt-2 pb-2"
									on:click={() => editUser(user)}
								>
									Edit
								</button>

								<button
									class="text-black border rounded-md pl-4 pr-4 pt-2 pb-2"
									on:click={() => deleteUser(user.uid)}
								>
									Delete
								</button>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		{/if}
	</table>
</div>
