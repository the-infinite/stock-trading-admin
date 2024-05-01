<script lang="ts">
	import { goto } from '$app/navigation';
	import { AuthController } from '$lib/controllers/auth';
	import { sendPost } from '$lib/util/client';
	import { isEmail } from '$lib/util/validator';
	import { ProgressRadial, getToastStore } from '@skeletonlabs/skeleton';

	let email: string = '';
	let emailInvalid: boolean = false;
	let sendingOTP: boolean = false;

	const toastStore = getToastStore();

	async function resetPassword() {
		email = email.trim();

		//? If this email is unset.
		if (email === '' || !isEmail(email)) {
			emailInvalid = true;
			setTimeout(function () {
				emailInvalid = false;
			}, 6000);
			return;
		}

		sendingOTP = true;

		// Request this information.
		const response = await sendPost('/api/auth/reset', {
			email: email
		});

		// We are no longer logging in.
		sendingOTP = false;

		// If this response is fine...
		if (response.ok) {
			// This is the email to use right now.
			AuthController.setEmail(email);
			
			// Retrieve this user.
			toastStore.trigger({
				message: await response.text(),
				background: 'variant-filled-success'
			});

			// Now, move to the waiting screen.
			setTimeout(function () {
				goto('/auth/reset/waiting');
			}, 2000);
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
	<h2 class="text-xl font-semibold">Reset Password</h2>
</div>

<!--- For the user's email -->
<div class="flex flex-col items-start">
	<input
		class="border-2 rounded-lg w-full placeholder-black/45 border-primary-500/80"
		type="text"
		bind:value={email}
		placeholder="Email address"
	/>

	<!-- If the email is invalid -->
	{#if emailInvalid}
		<p class="text-error-500 text-sm">You are expected to enter a valid email address</p>
	{/if}
</div>

<!-- Login now. -->
<button
	class="btn bg-primary-500 flex flex-row justify-start text-white w-full text-left"
	on:click={resetPassword}
>
	{#if sendingOTP}
		<ProgressRadial width="w-5" />
	{:else}
		<p class="text-left flex">Reset password</p>
	{/if}
</button>
