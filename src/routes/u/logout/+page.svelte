<script lang="ts">

	async function logoutUser(): Promise<void> {
		localStorage.clear();
		window.location.replace("/");
	}

	async function cancelLogout(): Promise<void> {}
</script>

<div
	class="min-h-screen pt-20 pb-20 h-fit w-full gap-8 flex flex-col items-center justify-center text-center"
>
	<form
		class="md:bg-white bg-slate-200 w-modal min-h-80 border-2 rounded-xl h-fit pt-10 pb-10 md:pl-16 md:pr-16 pr-10 pl-10 flex flex-col gap-3 text-black"
	>
		<!-- Title -->
		<div class="text-black">
			<h2 class="text-2xl font-semibold">Log Out</h2>
		</div>

		<!--- For the user's email -->
		<div class="flex flex-col items-center gap-2">
			<p class="text-center text-black mb-3">You are about to leave our website.</p>

			<!-- The cancel a logout button -->
			<button
				class="btn bg-transparent border-2 hover:border-primary-500 flex flex-row justify-start text-black w-full text-left"
				on:click={cancelLogout}
			>
				<p class="text-left flex">No, I wanna stay signed in</p>
			</button>

			<!-- The Logout button -->
			<button
				class="btn bg-primary-500 flex flex-row justify-start text-white w-full text-left"
				on:click={logoutUser}
			>
				<p class="text-left flex">Yes, log me out</p>
			</button>
		</div>
	</form>
</div>
