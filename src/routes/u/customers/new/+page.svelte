<script lang="ts">
	import { UserType, type UserModel } from '$lib/types/user';
	import { ProgressRadial, getToastStore } from '@skeletonlabs/skeleton';

	var fullname: string | null;
	var email: string | null;
	var phone: string | null;

	var loading = false;

	// Do this one.
	const toastStore = getToastStore();

	/**
	 * Helper function used to print an error to the screen.
	 * @param message THe error message to print.
	 */
	function showError(message: string) {
		toastStore.trigger({
			message: message,
			background: 'variant-filled-error'
		});

		// Now it is no longer loading.
		loading = false;
	}

	/**
	 * A helper function used to create a new one
	 */
	async function createNew() {
		// Yeah, it is loading.
		loading = true;

		//? If the topic is not set...
		if (!fullname || fullname?.trim().length === 0) {
			showError("You are required to specify the customer's full name");
		}

		//? If the subject is not set when we expect it to be...
		else if (!email || email?.trim().length === 0) {
			showError("The customer's email address should be specified.");
		}

		//? If the description is not set.
		else if (!phone || phone?.trim().length === 0) {
			showError("The customer's phone number should be specified.");
		}

		//? Since all is good and fine.
		else {
			const customer = {
				uid: '',
				firstname: fullname.split(' ')[0],
				lastname: fullname.split(' ').reverse()[0],
				email,
				phone,
				userType: UserType.customer,
				wallets: [],
				profileImage: undefined,
				dateJoined: Date.now()
			} as UserModel;

			// Now it is time to post this to the database.
			const response = await fetch('/api/customer', {
				method: 'POST',
				body: JSON.stringify(customer)
			});

			//? First, if the schedule was created successfully...
			if (response.ok) {
				toastStore.trigger({
					message: await response.text(),
					background: 'variant-filled-success'
				});
			}

			//? This failed so show failure.
			else {
				showError(await response.text());
			}

			// Now it is loading.
			loading = false;
		}
	}
</script>

<!-- Flex on these ones boy -->
<form
	class="bg-white w-full min-h-80 rounded-xl h-fit pt-10 pb-10 md:pl-16 md:pr-16 pr-10 pl-10 flex flex-col gap-3 text-black"
>
	<div class="text-black flex flex-col mb-5">
		<h2 class="text-black text-xl font-semibold">Create a Customer</h2>
		<h3 class="text-sm">Required fields have a *</h3>
	</div>

	<!-- For the full name -->
	<input
		class="border-2 rounded-lg w-full placeholder-black/45 border-primary-500/80"
		type="text"
		bind:value={fullname}
		placeholder="Customer full name*"
	/>

	<!-- For the email address -->
	<input
		class="border-2 rounded-lg w-full placeholder-black/45 border-primary-500/80"
		type="text"
		bind:value={email}
		placeholder="Customer email address*"
	/>

	<!-- For the phone number -->
	<input
		class="border-2 rounded-lg w-full placeholder-black/45 border-primary-500/80"
		type="text"
		bind:value={phone}
		placeholder="Customer phone number*"
	/>

	<button class="rounded-lg bg-primary-700 mb-14 w-fit" on:click={createNew}>
		<div class="flex flex-row gap-2 px-8 py-3 items-center">
			<i class="fas fa-plus text-white"></i>
			<p class="text-white">Create Customer</p>
		</div>
	</button>
</form>
