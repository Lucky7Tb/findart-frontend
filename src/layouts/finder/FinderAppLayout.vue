<template>
	<div>
		<v-app>
			<finder-nav-bar v-on:navbarLogout="logout"></finder-nav-bar>
			<v-main>
				<router-view></router-view>
			</v-main>
			<finder-bottom-nav
				v-on:bottomNavLogout="logout"
				class="hidden-md-and-up"
			></finder-bottom-nav>
		</v-app>
	</div>
</template>

<script>
import authAPI from '@/api/auth';
import FinderNavBar from './FinderNavBar.vue';
import FinderBottomNav from './FinderBottomNav.vue';

export default {
	name: 'AppLayout',
	components: {
		FinderNavBar,
		FinderBottomNav,
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
