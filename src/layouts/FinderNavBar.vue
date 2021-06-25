<template>
	<div>
		<v-app-bar
			app
			color="#f6f6f6"
			elevation="5"
			class="rounded-b-xl"
			height="90"
		>
			<v-container>
				<v-toolbar
					flat
					color="#f6f6f6"
					height="90"
				>
					<v-toolbar-title>
						<v-img
							lazy-src="@/assets/images/findart_logo_2.png"
							max-height="200"
							max-width="250"
							src="@/assets/images/findart_logo_2.png"
						></v-img>
					</v-toolbar-title>

					<v-spacer></v-spacer>

					<v-toolbar-items>
						<v-btn
							v-for="(menu, index) in listMenuFinder"
							:key="index"
							text
							plain
							depressed
							color="black"
							:ripple="{
								class: 'blue--text text--accent-2'
							}"
							:to="menu.link"
						>
							<v-icon>{{menu.icon}}</v-icon>
							{{menu.name}}
						</v-btn>
						<v-btn
							text
							plain
							depressed
							color="black"
							:ripple="{
								class: 'blue--text text--accent-2'
							}"
							@click="logout"
						>
							<v-icon>mdi-logout</v-icon>
							Logout
						</v-btn>
					</v-toolbar-items>
				</v-toolbar>
			</v-container>
		</v-app-bar>
	</div>
</template>

<script>
import authAPI from '../api/auth';
import listMenuFinder from '../router/list-menu-finder';

export default {
	data() {
		return {
			listMenuFinder,
		};
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
