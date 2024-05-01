<script lang="ts">
	import { AuthController } from '$lib/controllers/auth';
	import SizedBox from '$lib/components/SizedBox.svelte';
	import MediaQuery from '$lib/components/MediaQuery.svelte';
	import { sendPost } from '$lib/util/client';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	/// Can an email
	let canResend: boolean = false;
	let timeLeft: string = '01:30';
	let countdown: number = 90;
	let email: string = AuthController.getEmail() ?? 'user@gmail.com';
	const toastStore = getToastStore();

	function formatTimeSection(section: number): string {
		if (section < 10) {
			return '0' + section.toString();
		}

		return section.toString();
	}

	// Our timer.
	function startTimer() {
		countdown = 90;
		timeLeft = '01:30';

		const timer = setInterval(function () {
			if (countdown <= 0) {
				canResend = true;
				clearInterval(timer);
			}

			// Reduce the time by 1.
			countdown -= 1;
			timeLeft =
				formatTimeSection(Math.floor(countdown / 60)) +
				':' +
				formatTimeSection(Math.floor(countdown % 60));
		}, 1000);
	}

	/// Resend OTP.
	async function resendOTP() {
		try {
			// Request this information.
			const response = await sendPost('/api/auth/reset', {
				email: email
			});

			// If this response is fine...
			if (response.ok) {
				// Retrieve this user.
				toastStore.trigger({
					message: await response.text(),
					background: 'variant-filled-success'
				});
			}

			//? If this failed.
			else {
				toastStore.trigger({
					message: await response.text(),
					background: 'variant-filled-error'
				});
			}
		} catch (e: any) {
			if (e.message) {
				toastStore.trigger({
					message: e.message.toString(),
					background: 'variant-filled-error'
				});
			} else {
				toastStore.trigger({
					message: e.toString(),
					background: 'variant-filled-error'
				});
			}
		}
	}

	/// Start the timer.
	onMount(startTimer);
</script>

<!-- Title -->
<div class="text-black">
	<h2 class="text-2xl font-semibold">Reset Password</h2>
</div>

<SizedBox height="md:h-4 h-3" />

<!--- For the user's email -->
<div class="flex flex-col items-center gap-5">
	<p class="text-center text-black">
		We have sent a confirmation link to <span class=" text-primary-400 font-semibold">{email}</span
		>.

		<MediaQuery query="(min-width: 1024px)" let:matches>
			{#if matches}
				<br />
			{/if}
		</MediaQuery>

		Please use the link provided there to reset your password.
	</p>

	<!-- If the email is invalid -->
	{#if canResend}
		<!-- Forgotten password and stuff section -->
		<div class="flex flex-row gap-2">
			<p class="text-black text-sm">Didn't receive the email?</p>
			<button class="text-sm text-primary-500" on:click={resendOTP}>Resend</button>
		</div>
	{:else}
		<!-- Forgotten password and stuff section -->
		<div class="flex flex-row gap-2">
			<p class="text-black text-sm">Didn't receive the email?</p>
			<p class="text-sm text-gray-500">Resend in {timeLeft}</p>
		</div>
	{/if}

	<!-- So we can go back -->
	<a class="text-md" href="/auth/reset">
		<div class="flex flex-row text-sm gap-1 justify-center items-center">
			<i class="fas fa-chevron-left" />
			Back
		</div>
	</a>
</div>
