<template>
	<v-app>
		<v-container>
			<v-row>
				<v-col cols="12">
					<h1 class="text-center mt-3 ">Aduh kamu tersesat ya?</h1>
				</v-col>
				<v-col cols="12">
					<v-img
						contain
						width="500px"
						class="mx-auto mt-5"
						lazy-src="@/assets/images/illustration/404-illust.svg"
						src="@/assets/images/illustration/404-illust.svg"
					></v-img>
				</v-col>
				<v-col cols="12">
					<h2 class="text-center mt-3">Sepertinya kamu berada ditempat yang salah</h2>
					<div class="text-center mt-3">
						<v-btn
							x-large
							to='/'
							color="primary"
						>Ayo kembali</v-btn>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</v-app>
</template>

<script>
export default {

};
</script>
