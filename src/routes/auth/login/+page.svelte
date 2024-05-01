<script lang="ts">
	import { goto } from '$app/navigation';
	import { usersStore } from '$lib/session';
	import type { UserModel } from '$lib/types/user';
	import { sendPost, setToken } from '$lib/util/client';
	import { isEmail } from '$lib/util/validator';
	import { ProgressRadial, getToastStore } from '@skeletonlabs/skeleton';

	let email: string = '';
	let password: string = '';

	let emailInvalid: boolean = false;
	let passwordInvalid: boolean = false;
	let loggingIn: boolean = false;
	let passwordVisible: boolean = false;

	const toastStore = getToastStore();

	async function login() {
		email = email.trim();

		if (email === '' || !isEmail(email)) {
			emailInvalid = true;
			setTimeout(function () {
				emailInvalid = false;
			}, 6000);
			return;
		}

		if (password === '') {
			passwordInvalid = true;
			setTimeout(function () {
				passwordInvalid = false;
			}, 6000);
			return;
		}

		loggingIn = true;

		// Request this information.
		const response = await sendPost('/api/auth/login', {
			email: email,
			password: password
		});

		// We are no longer logging in.
		loggingIn = false;

		// If this response is fine...
		if (response.ok) {
			// Retrieve this user.
			const user: UserModel = await response.json();
			const token = user.uid;

			// This is our new token.
			setToken(token);

			/// Now, update our user store.
			usersStore.update(function (_): UserModel[] | undefined {
				return [...$usersStore!, user];
			});

			// Now route to the user.
			window.location.assign('/u');
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
	<h2 class="text-xl font-semibold">Welcome Back!</h2>
	<h3 class=" text-sm">Enter your details to login</h3>
</div>

<!--- For the user's email -->
<div class="flex flex-col items-start">
	<input
		class="border-2 rounded-lg w-full placeholder-black/45 border-primary-500/80"
		type="email"
		bind:value={email}
		placeholder="Email address"
	/>

	<!-- If the email is invalid -->
	{#if emailInvalid}
		<p class="text-error-500 text-sm">You are expected to enter a valid email address</p>
	{/if}
</div>

<!-- For the user's password -->
<div class="flex flex-col items-start">
	<div
		class="border-2 flex flex-row gap-2 items-center pr-2 rounded-lg w-full placeholder-black/45 border-primary-500/80"
	>
		{#if passwordVisible}
			<input
				class="border-none outline-none focus:outline-none focus:border-none w-full bg-transparent"
				type="text"
				bind:value={password}
				placeholder="Password"
			/>
		{:else}
			<input
				class="border-none outline-none focus:outline-none focus:border-none w-full bg-transparent"
				type="password"
				bind:value={password}
				placeholder="Password"
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

	<!-- If the email is invalid -->
	{#if passwordInvalid}
		<p class="text-error-500 text-sm">Your password cannot be blank</p>
	{/if}
</div>

<!-- Login now. -->
<button
	class="btn bg-primary-500 flex flex-row justify-start text-white w-full text-left"
	on:click={login}
>
	{#if loggingIn}
		<ProgressRadial width="w-5" />
	{:else}
		<p class="text-left flex">Sign in</p>
	{/if}
</button>

<!-- Forgotten password and stuff section -->
<div class="flex flex-row gap-2">
	<p class="text-black text-sm">Forgotten password?</p>
	<a class="text-sm text-primary-500" href="/auth/reset">Click here to reset password</a>
</div>

<!-- Spacing -->
<br />

<!-- The button that tells you to create an account if you lack one. -->
<div class="flex flex-col gap-7">
	<p class="text-black">Or, don't have an account?</p>

	<!-- Login now. -->
	<a
		class="btn bg-primary-800 text-white w-full text-left flex flex-row justify-start"
		href="/auth/register"
	>
		<p class="text-left flex">Sign up</p>
	</a>
</div>
