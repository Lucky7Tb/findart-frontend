<template>
	<div>
		<v-card
			absolute
			bottom
		>
			<v-bottom-navigation
				app
				fixed
			>
				<v-btn
					text
					plain
					exact
					raised
					depressed
					exact-active-class="blue--text text--darken-4"
					v-for="(menu, index) in listMenuArt"
					:key="index"
					:ripple="{
						class: 'blue--text text--accent-4'
					}"
					:to="menu.link"
				>
					<span class="text-subtitle-1">{{ menu.name }}</span>

					<v-icon>{{ menu.icon }}</v-icon>
				</v-btn>
				<v-btn
					text
					plain
					exact
					raised
					depressed
					color="primary"
					:ripple="{
						class: 'blue--text text--accent-4'
					}"
					@click="$emit('bottomNavLogout')"
				>
					<span class="text-subtitle-1">Logout</span>

					<v-icon>mdi-logout</v-icon>
				</v-btn>
			</v-bottom-navigation>
		</v-card>
	</div>
</template>

<script>
import listMenuArt from '@/router/list-menu-art';

export default {
	name: 'ArtBottomNav',
	data() {
		return {
			listMenuArt,
		};
	},
};
</script>

<style>

</style>
