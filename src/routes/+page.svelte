<script lang="ts">
	import { browser } from '$app/environment';
	import { usersStore } from '$lib/session';

	if (browser) {
		window.location.assign($usersStore ? '/u/' : '/auth/login');
	}
</script>
