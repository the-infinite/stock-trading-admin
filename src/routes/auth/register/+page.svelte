<script lang="ts">
	import { goto } from '$app/navigation';
	import { usersStore } from '$lib/session';
	import { sendGet, sendPost, setToken } from '$lib/util/client';
	import { isEmail } from '$lib/util/validator';
	import { ProgressRadial, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import type { UserModel } from '$lib/types/user';

	let school: { id: string; name: string };
	let userId: string = '';

	let idInvalid: boolean = false;
	let schoolInvalid: boolean = false;
	let signingUp: boolean = false;

	// For our schools
	let schools: { id: string; name: string }[];

	// This is fair.
	const toastStore = getToastStore();

	/// Helper function used to register a user.
	async function registerUser() {
		if (userId === '') {
			idInvalid = true;
			setTimeout(function () {
				idInvalid = false;
			}, 6000);
			return;
		}

		if (!school || school.id === '??') {
			schoolInvalid = true;
			setTimeout(function () {
				schoolInvalid = false;
			}, 6000);
			return;
		}

		// This is fair enough.
		signingUp = true;

		// Request this information.
		const response = await sendPost('/api/auth/register', {
			userId: userId,
			school: school.id
		});

		// We are no longer logging in.
		signingUp = false;

		// If this response is fine...
		if (response.ok) {
			// Retrieve this user.
			const user: UserModel = await response.json();
			const users = $usersStore!;

			// This is our current user.
			setToken(user.uid);

			/// Now, update our user store.
			usersStore.update(function (_): UserModel[] | undefined {
				return [...users, user];
			});

			// Now route to the user.
			window.location.assign('/u/');
		}

		//? If this failed.
		else {
			toastStore.trigger({
				message: await response.text(),
				background: 'variant-filled-error'
			});
		}
	}
</script>

<div class="text-black">
	<h2 class="text-xl font-semibold">Create Account</h2>
	<h3 class=" text-sm">Welcome to SCUPay</h3>
</div>

<!-- For the user's school -->
<div class="flex flex-col items-start">
	<Dropdown title="Choose your school" items={schools} bind:selected={school} />

	<!-- If the email is invalid -->
	{#if schoolInvalid}
		<p class="text-error-500 text-sm">Please choose your school</p>
	{/if}
</div>

<!--- For the user's ID -->
<div class="flex flex-col items-start">
	<input
		class="border-2 rounded-lg w-full placeholder-black/45 border-primary-500/80"
		type="text"
		bind:value={userId}
		placeholder="Enter your Student ID"
	/>

	<!-- If the student ID is invalid -->
	{#if idInvalid}
		<p class="text-error-500 text-sm">Your student ID cannot be empty</p>
	{/if}
</div>

<!-- Register now. -->
<button
	class="btn bg-primary-500 flex flex-row justify-start text-white w-full text-left"
	on:click={registerUser}
>
	{#if signingUp}
		<ProgressRadial width="w-5" />
	{:else}
		<p class="text-left flex">Sign up</p>
	{/if}
</button>

<br />

<!-- Forgotten password and stuff section -->
<div class="flex flex-row gap-2">
	<p class="text-black text-sm">Already have an account?</p>
	<a class="text-sm text-primary-500" href="/auth/login">Log in</a>
</div>
