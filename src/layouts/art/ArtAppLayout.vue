<template>
	<v-app>
		<art-nav-bar v-on:navbarLogout="logout"></art-nav-bar>
		<v-main>
			<router-view></router-view>
		</v-main>
		<art-bottom-nav
			v-on:bottomNavLogout="logout"
			class="hidden-md-and-up"
		></art-bottom-nav>
	</v-app>
</template>

<script>
import authAPI from '@/api/auth';
import ArtNavBar from './ArtNavBar.vue';
import ArtBottomNav from './ArtBottomNav.vue';

export default {
	name: 'ArtAppLayout',
	components: {
		ArtNavBar,
		ArtBottomNav,
	},
	methods: {
		async logout() {
			try {
				this.$loading.hourglass('Loading...');
				const response = await authAPI.logout();
				localStorage.removeItem(process.env.VUE_APP_KEY_STORAGE);
				this.$notify.success(response.data.message);

				setTimeout(() => {
					this.$router.push({ name: 'Login' });
				}, 1500);
			} catch (error) {
				this.$notify.failure(error.response.data.message);
			} finally {
				this.$loading.remove(1000);
			}
		},
	},
};
</script>
