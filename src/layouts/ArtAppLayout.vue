<template>
	<v-app>
		<art-nav-bar></art-nav-bar>
		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
import ArtNavBar from './ArtNavBar.vue';

export default {
	name: 'AppLayout',
	components: {
		ArtNavBar,
	},
};
</script>
