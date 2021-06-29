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
					lazy-src="@/assets/images/findart_logo_2.png"
					src="@/assets/images/findart_logo_2.png"
				></v-img>
			</v-toolbar-title>

			<v-container class="hidden-sm-and-down">
				<v-toolbar
					flat
					color="white"
					height="90"
				>
					<v-toolbar-title>
						<v-img
							lazy-src="@/assets/images/findart_logo_2.png"
							max-height="250"
							max-width="250"
							src="@/assets/images/findart_logo_2.png"
						></v-img>
					</v-toolbar-title>

					<v-spacer></v-spacer>

					<v-toolbar-items>
						<v-btn
							v-for="(menu, index) in listMenuArt"
							:key="index"
							text
							plain
							depressed
							exact-active-class="blue--text text--darken-4"
							:ripple="{
								class: 'blue--text text--accent-4'
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
							:ripple="{
								class: 'blue--text text--accent-4'
							}"
							@click="$emit('navbarLogout')"
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
import listMenuArt from '@/router/list-menu-art';

export default {
	name: 'ArtNav',
	data() {
		return {
			listMenuArt,
		};
	},
};
</script>
