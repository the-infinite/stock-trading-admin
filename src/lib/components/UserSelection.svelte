<script lang="ts">
	import { getUserType, type UserModel } from '$lib/types/user';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	/**
	 * The text to display on the title of this section.
	 */
	export let users: UserModel[];

	/**
	 * The actively selected user.
	 */
	export let activeUser: UserModel | undefined;

	/**
	 * The callback to invoke when login is clicked.
	 */
	export let onAddAccount: () => void;

	/**
	 * A callback to be made after a user has been selected.
	 */
	export let onSelectUser: (user: UserModel, index: number) => void;
</script>

<div class="flex flex-col mt-5 items-center">
	<!-- For the messages -->
	<div class="text-white w-full py-2 bg-transparent rounded drop-shadow-lg">
		<Accordion rounded="rounded" width="w-72">
			<!-- Then at te fundamental level, we use an accordion...-->

			<AccordionItem hover="">
				<!-- For the summary -->
				<svelte:fragment slot="summary">
					<p class="text-white w-full bg-transparent font-semibold">
						{activeUser?.firstname + ' ' + activeUser?.lastname}
					</p>

					<p class="text-white w-full text-sm bg-transparent">
						{getUserType(activeUser?.userType)}
					</p>
				</svelte:fragment>

				<!-- For the message itself. -->
				<svelte:fragment slot="content">
					<!-- The message text. -->
					<div class="flex flex-col gap-3">
						{#each users as user}
							<!-- First the selectino button-->
							<button
								class="w-full text-white text-start"
								on:click={function () {
									onSelectUser(user, users.indexOf(user));
								}}
							>
								<div class="flex flex-row items-center justify-between w-full">
									<!-- This is the button title -->
									<p>
										{user.firstname + ' ' + user.lastname}
									</p>

									<!-- If this is the user that is currently selected... -->
									{#if activeUser?.uid === user.uid}
										<i class="fas fa-check"></i>
									{/if}
								</div>
							</button>
						{/each}

						<!-- Now, the button to add a new user. -->
						<button
							class="w-full text-primary-500 text-start px-6 py-3 bg-white rounded-lg hover:text-white"
							on:click={onAddAccount}
						>
							<div class="flex flex-row justify-between items-center w-full">
								<!-- This is the button title -->
								<p>Add account</p>

								<!-- If this is the user that is currently selected... -->
								<i class="fas fa-user-plus"></i>
							</div>
						</button>
					</div>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	</div>
</div>
