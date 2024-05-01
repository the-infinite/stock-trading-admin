<script lang="ts">
	import type { PageData } from './$types';
	import { ProgressRadial, getToastStore } from '@skeletonlabs/skeleton';
	import SizedBox from '$lib/components/SizedBox.svelte';
	import { sendPost } from '$lib/util/client';

	export let data: PageData;
	let confirmPassword: string = '';
	let password: string = '';
	let passwordInvalid: boolean = false;
	let passwordVisible: boolean = false;
	let resetSuccessful: boolean = false;
	let changingPassword: boolean = false;

	// Fetch the toast store.
	const toastStore = getToastStore();

	/// Helper function used to initiate a password reset.
	async function resetPassword(): Promise<void> {
		//? If this is not right...
		if (password.length < 4 || confirmPassword.length < 4) {
			passwordInvalid = true;
			setTimeout(function () {
				passwordInvalid = false;
			}, 6000);
			return;
		}

		//? If the two passwords do not match up.
		if (password !== confirmPassword) {
			toastStore.trigger({
				message: 'The two passwords do not match.',
				background: 'variant-filled-error'
			});
			return;
		}

		//* Since the passwords match
		const response = await sendPost('/api/reset/change_password', {
			id: data.userId,
			password: password
		});

		//? If this response is fine...
		if (response.ok) {
			resetSuccessful = true;
			toastStore.trigger({
				message: await response.text(),
				background: 'variant-filled-success'
			});
		}

		//? If it failed...
		else {
			resetSuccessful = true;
			toastStore.trigger({
				message: await response.text(),
				background: 'variant-filled-error'
			});
		}
	}
</script>

{#if !data.successful}
	<h3 class=" text-sm mb-3">ID: {data.token}</h3>
	<i class=" text-8xl text-error-500 fas fa-circle-xmark"></i>
	<h2 class="text-xl font-semibold">Uh Oh!</h2>
	<h3 class=" text-sm">{data.userId}</h3>
{:else if resetSuccessful}
	<h3 class=" text-sm mb-3">ID: {data.token}</h3>
	<i class=" text-8xl text-success-500 fas fa-check-circle"></i>
	<h2 class="text-xl font-semibold">Success</h2>
	<h3 class=" text-sm">You have successfully reset your password.</h3>

	<div class="flex flex-col">
		<SizedBox height="h-11" />

		<!-- Login now. -->
		<a
			class="btn bg-primary-800 text-white w-full text-left flex flex-row justify-start"
			href="/auth/login"
		>
			<p class="text-left flex">Proceed to login</p>
		</a>
	</div>
{:else}
	<div class="text-black">
		<h3 class=" text-sm mb-3">ID: {data.token}</h3>
		<h2 class="text-xl font-semibold">Reset Password</h2>
		<h3 class=" text-sm">Type your new password</h3>
	</div>

	<!--- For the first password -->
	<div class="flex flex-col items-start">
		<div
			class="border-2 flex flex-row gap-2 items-center pr-2 rounded-lg w-full placeholder-black/45 border-primary-500/80"
		>
			{#if passwordVisible}
				<input
					class="border-none outline-none focus:outline-none focus:border-none w-full bg-transparent"
					type="text"
					bind:value={password}
					placeholder="Your New Password"
				/>
			{:else}
				<input
					class="border-none outline-none focus:outline-none focus:border-none w-full bg-transparent"
					type="password"
					bind:value={password}
					placeholder="Your New Password"
				/>
			{/if}
			<button class="font-sm" on:click={() => (passwordVisible = !passwordVisible)}>
				{#if passwordVisible}
					<i class="fas fa-eye"></i>
				{:else}
					<i class="fas fa-eye-slash"></i>
				{/if}
			</button>
		</div>
	</div>

	<!-- For the user's password -->
	<div class="flex flex-col items-start">
		<input
			class="border-2 rounded-lg w-full placeholder-black/45 border-primary-500/80"
			type="password"
			bind:value={confirmPassword}
			placeholder="Confirm Password"
		/>

		<!-- If the email is invalid -->
		{#if passwordInvalid}
			<p class="text-error-500 mt-1 text-sm">Your two passwords do not match!</p>
		{:else if password?.length === confirmPassword?.length && confirmPassword?.length !== 0}
			{#if password === confirmPassword}
				<p class="text-success-500 mt-1 text-sm">Passwords match</p>
			{:else}
				<p class="text-error-500 mt-1 text-sm">Your two passwords do not match!</p>
			{/if}
		{/if}
	</div>

	<!-- Login now. -->
	<button
		class="btn bg-primary-500 flex flex-row justify-start text-white w-full text-left"
		on:click={resetPassword}
	>
		{#if changingPassword}
			<ProgressRadial width="w-5" />
		{:else}
			<p class="text-left flex">Reset password</p>
		{/if}
	</button>
{/if}
