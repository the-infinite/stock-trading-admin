<script lang="ts">
	import { goto } from '$app/navigation';
	import { AuthController } from '$lib/controllers/auth';
	import { sendPost } from '$lib/util/client';
	import { isEmail } from '$lib/util/validator';
	import { ProgressRadial, getToastStore } from '@skeletonlabs/skeleton';
	import { clientAuth } from '$lib/client';
	import { sendPasswordResetEmail } from 'firebase/auth';
	import { FirebaseError } from 'firebase/app';

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

		// If this response is fine...
		try {
			// Request this information.
			await sendPasswordResetEmail(clientAuth, email);

			// Retrieve this user.
			toastStore.trigger({
				message: 'A password reset link has been sent to your email address.',
				background: 'variant-filled-success'
			});
		} catch (e) {
			var message: string;
			console.log((e as any).constructor.name);
			if ((e as any).constructor.name === '_FirebaseError') {
				message = (e as FirebaseError).message;
			} else {
				message = e?.toString() ?? 'An unknown error occurred.';
			}
			toastStore.trigger({
				message: message,
				background: 'variant-filled-error'
			});
		}

		sendingOTP = false;
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
