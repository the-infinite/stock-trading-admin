<script lang="ts">
	import { usersStore, selectedUser } from '$lib/session';
	import { sendPost, setToken } from '$lib/util/client';
	import { isEmail, isPhoneNumber } from '$lib/util/validator';
	import { ProgressRadial, getToastStore } from '@skeletonlabs/skeleton';
	import { getUserType, UserType, type UserModel } from '$lib/types/user';
	import { clientAuth } from '$lib/client';
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import type { FirebaseError } from 'firebase/app';

	let userTypes: string[] = [
		UserType.employee,
		UserType.trader,
		UserType.consultant,
		UserType.expert
	];
	let email: string = '';
	let password: string = '';
	let fullname: string = '';
	let phone: string = '';
	let position: string = '???';

	let emailInvalid: boolean = false;
	let nameInvalid: boolean = false;
	let positionInvalid: boolean = false;
	let phoneInvalid: boolean = false;
	let passwordInvalid: boolean = false;
	let signingUp: boolean = false;
	let passwordVisible: boolean = false;

	// This is fair.
	const toastStore = getToastStore();

	/// Helper function used to register a user.
	async function registerUser() {
		email = email.trimEnd();
		password = password.trim();
		fullname = fullname.trim();
		phone = phone.trim();

		if (fullname === '' || !fullname.includes(' ')) {
			nameInvalid = true;
			setTimeout(function () {
				nameInvalid = false;
			}, 6000);
			return;
		}

		if (email === '' || !isEmail(email)) {
			emailInvalid = true;
			setTimeout(function () {
				emailInvalid = false;
			}, 6000);
			return;
		}

		if (phone === '' || !isPhoneNumber(phone)) {
			phoneInvalid = true;
			setTimeout(function () {
				phoneInvalid = false;
			}, 6000);
			return;
		}

		if (position === '???') {
			positionInvalid = true;
			setTimeout(function () {
				positionInvalid = false;
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

		// This is fair enough.
		signingUp = true;

		try {
			// Request this information.
			const firebaseUser = await createUserWithEmailAndPassword(clientAuth, email, password);

			// A response after querying our database.
			const response = await sendPost('/api/auth/register', {
				firstname: fullname.split(' ')[0],
				lastname: fullname.split(' ').reverse()[0],
				email,
				password,
				phone,
				uid: firebaseUser.user.uid,
				profileImage: undefined,
				wallets: [],
				userType: position,
				dateJoined: Date.now()
			} as UserModel);

			// We are no longer logging in.
			signingUp = false;

			// If this response is fine...
			if (response.ok) {
				// Retrieve this user.
				const user: UserModel = await response.json();
				const users = $usersStore ?? [];

				// This is our current user.
				setToken(user.uid);

				/// This is now our selected user. Make no mistake.
				selectedUser.set(users.length);

				/// Now, update our user store.
				usersStore.update(function (_): UserModel[] | undefined {
					return [...users, user];
				});

				// Now route to the user.
				window.location.assign(`/u/?id=${user.uid}`);
			}

			//? If this failed.
			else {
				toastStore.trigger({
					message: await response.text(),
					background: 'variant-filled-error'
				});
			}
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
	}
</script>

<div class="text-black">
	<h2 class="text-xl font-semibold">Create Account</h2>
	<h3 class=" text-sm">Welcome to our app</h3>
</div>

<!--- For the user's fullname -->
<div class="flex flex-col items-start">
	<input
		class="border-2 rounded-lg w-full placeholder-black/45 border-primary-500/80"
		type="text"
		bind:value={fullname}
		placeholder="Full name"
	/>

	<!-- If this invalid -->
	{#if nameInvalid}
		<p class="text-error-500 text-sm">
			Your full name must contain your firstname and lastname separated by a single space.
		</p>
	{/if}
</div>

<!--- For the user's email address -->
<div class="flex flex-col items-start">
	<input
		class="border-2 rounded-lg w-full placeholder-black/45 border-primary-500/80"
		type="text"
		bind:value={email}
		placeholder="Email address"
	/>

	<!-- If this invalid -->
	{#if emailInvalid}
		<p class="text-error-500 text-sm">Your email address must be valid</p>
	{/if}
</div>

<!--- For the user's email address -->
<div class="flex flex-col items-start">
	<input
		class="border-2 rounded-lg w-full placeholder-black/45 border-primary-500/80"
		type="text"
		bind:value={phone}
		placeholder="Phone number"
	/>

	<!-- If this invalid -->
	{#if phoneInvalid}
		<p class="text-error-500 text-sm">Your phone number must be valid</p>
	{/if}
</div>

<!-- For the user's school -->
<div class="flex flex-col items-start">
	<select class="w-full text-black rounded-md" bind:value={position}>
		<option value="???">Choose your account type</option>
		{#each userTypes as userType}
			<option value={userType}>{getUserType(userType)}</option>
		{/each}
	</select>

	<!-- If this invalid -->
	{#if positionInvalid}
		<p class="text-error-500 text-sm">Please choose account type.</p>
	{/if}
</div>

<!-- For the user's password -->
<div class="flex flex-col items-start">
	<div
		class="border-2 flex flex-row gap-2 items-center pr-2 rounded-lg w-full border-primary-500/80"
	>
		{#if passwordVisible}
			<input
				class="border-none outline-none placeholder-black/45 focus:outline-none focus:border-none w-full bg-transparent"
				type="text"
				bind:value={password}
				placeholder="Password"
			/>
		{:else}
			<input
				class="border-none outline-none placeholder-black/45 focus:outline-none focus:border-none w-full bg-transparent"
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

	<!-- If this invalid -->
	{#if passwordInvalid}
		<p class="text-error-500 text-sm">Your password cannot be blank</p>
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
		<p class="text-center w-full">Create Account</p>
	{/if}
</button>

<br />

<!-- Forgotten password and stuff section -->
<div class="flex flex-row gap-2">
	<p class="text-black text-sm">Already have an account?</p>
	<a class="text-sm text-primary-500" href="/auth/login">Log in</a>
</div>
