<script lang="ts">
	import { getDate } from '$lib';
	import { type UserModel } from '$lib/types/user';
	import type { PageData } from './$types';

	export let data: PageData;

	function editUser(user: UserModel) {}

	function deleteUser(user: string) {}

	function createUser() {}
</script>

<h2 class="text-black text-lg xl:text-3xl mb-4">All Customer</h2>
<button class="rounded-lg bg-primary-700 text-sm mb-14" on:click={createUser}>
	<div class="flex flex-row gap-2 pl-4 pr-4 pt-2 pb-2 items-center">
		<i class="fas fa-plus"></i>
		<p class="text-white">Create Customers</p>
	</div>
</button>
<h2 class="text-black text-lg xl:text-xl mb-4">Current Customer</h2>
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
