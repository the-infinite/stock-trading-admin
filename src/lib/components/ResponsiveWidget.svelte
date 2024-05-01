<script lang="ts" context="module">
	export enum FormFactor {
		/**
		 * This is a mobile device.
		 */
		mobile = 0,

		/**
		 * This is a tablet
		 */
		tablet = 1,

		/**
		 * This is a desktop form-factor
		 */
		desktop = 2
	}
</script>

<script lang="ts">
	import MediaQuery from './MediaQuery.svelte';

	let formFactor: FormFactor;
</script>

<!-- We go mobile first. -->
<MediaQuery query="(max-width: 600px)" let:matches>
	<!-- If this is infact a mobile device -->
	{#if matches}
		<span style="display: none;">{(formFactor = FormFactor.mobile)}</span>
		<slot {formFactor} />
	{:else}
		<MediaQuery query="(max-width: 1024px)" let:matches>
			{#if matches}
				<!-- Now, if this is a tablet... -->
				<span style="display: none;">{(formFactor = FormFactor.tablet)}</span>
				<slot {formFactor} />
			{:else}
				<!-- For a desktop view... -->
				<span style="display: none;">{(formFactor = FormFactor.desktop)}</span>
				<slot {formFactor} />
			{/if}
		</MediaQuery>
	{/if}
</MediaQuery>
