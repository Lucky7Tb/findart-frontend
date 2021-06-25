<template>
	<v-app>
		<finder-nav-bar></finder-nav-bar>
		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
import FinderNavBar from './FinderNavBar.vue';

export default {
	name: 'AppLayout',
	components: {
		FinderNavBar,
	},
};
</script>
