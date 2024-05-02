<script lang="ts">
	import { browser } from '$app/environment';
	import { usersStore, selectedUser } from '$lib/session';

	if (browser) {
		const user  = $usersStore;
		const activeUser = $selectedUser;
		window.location.assign(user ? `/u/?id=${user[activeUser].uid}` : '/auth/login');
	}
</script>
