<script lang="ts">
	import '../app.postcss';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';


	// Do these things.
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- Just do this -->
<slot />