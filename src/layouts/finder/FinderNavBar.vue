<template>
	<div>
		<v-app-bar
			app
			color="white"
			elevation="5"
			class="rounded-b-xl"
			height="90"
		>
			<v-toolbar-title class="hidden-md-and-up mx-auto">
				<v-img
					width="250"
					lazy-src="@/assets/images/new_logo.png"
					src="@/assets/images/new_logo.png"
				></v-img>
			</v-toolbar-title>

			<v-container class="hidden-sm-and-down">
				<v-toolbar
					flat
					height="90"
					color="white"
				>
					<v-toolbar-title>
						<v-img
							lazy-src="@/assets/images/new_logo.png"
							max-height="250"
							max-width="250"
							src="@/assets/images/new_logo.png"
						></v-img>
					</v-toolbar-title>

					<v-spacer></v-spacer>

					<v-toolbar-items>
						<v-btn
							text
							plain
							exact
							raised
							depressed
							exact-active-class="primary--text"
							v-for="(menu, index) in listMenuFinder"
							:key="index"
							:ripple="{
								class: 'primary--text text--accent-4'
							}"
							:to="menu.link"
						>
							<v-icon left>{{ menu.icon }}</v-icon>
							<span>{{ menu.name }}</span>
						</v-btn>
						<v-btn
							text
							plain
							exact
							raised
							depressed
							:ripple="{
								class: 'primary--text'
							}"
							@click="$emit('navbarLogout')"
						>
							<v-icon left>mdi-logout</v-icon>
							<span>Logout</span>
						</v-btn>
					</v-toolbar-items>
				</v-toolbar>
			</v-container>
		</v-app-bar>
	</div>
</template>

<script>
import listMenuFinder from '@/router/list-menu-finder';

export default {
	data() {
		return {
			listMenuFinder,
		};
	},
};
</script>
