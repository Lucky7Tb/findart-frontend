<template>
	<v-app>
		<v-container>
			<h1 class="text-center" v-if="interestedArt.length > 0">List art yang tertarik</h1>
			<h1 class="text-center" v-else>Belum ada art yang melamar</h1>

			<v-row class="mt-5">
				<v-col
					xs="12"
					sm="12"
					md="3"
					lg="4"
					v-for="{ art } in interestedArt"
					:key="art.id"
				>
					<v-hover v-slot="{ hover }">
						<v-card
							shaped
							:elevation="hover ? 12 : 2"
							:class="{'on-hover': hover}"
						>
							<v-img
								contain
								height="250"
								:alt="art.art_name"
								:src="art.photo.photo_url"
								:lazy-src="art.photo.photo_url"
							></v-img>

							<v-card-text>
								<h2 class="text-center mt-2">{{ art.art_name }}</h2>
								<div class="text-center">
									<v-rating
										readonly
										half-increments
										color="warning"
										background-color="warning"
										:length="5"
										:size="24"
										:value="parseFloat(art.art_rating[0].art_rating)"
									></v-rating>
								</div>
								<v-btn
									block
									color="primary"
									:ripple="{center: true}"
									@click="confirmSelectArt(art.id)"
								>
									Pilih art
								</v-btn>
							</v-card-text>

							<v-card-actions>
							</v-card-actions>
						</v-card>
					</v-hover>
				</v-col>
			</v-row>
		</v-container>
	</v-app>
</template>

<script>
import jobApi from '@/api/finder/job';
import artApi from '@/api/finder/art';

export default {
	name: 'InterestedArt',
	created() {
		this.getInterestedArt();
	},
	data() {
		return {
			interestedArt: [],
		};
	},
	methods: {
		async getInterestedArt() {
			try {
				const { data } = await jobApi.getInterestedArt(this.$route.params.id);

				this.interestedArt = data.serve;
			} catch (error) {
				const { data } = error.response;
				this.$notify.failure(data.message);
			}
		},
		confirmSelectArt(artId) {
			this.$confirm.show(
				'Konfirmasi',
				'Apakah yakin ingin memilih art ini?',
				'Ya, yakin',
				'Tidak',
				() => {
					this.selectArt(artId);
				},
			);
		},
		async selectArt(artId) {
			try {
				this.$loading.hourglass('Loading...');

				const { data } = await artApi.selectArt({
					art_id: artId,
					job_vacancy_id: this.$route.params.id,
				});
				this.$notify.success(data.message);
				setTimeout(() => {
					this.$router.push({ name: 'Finder-MyArt' });
				}, 1500);
			} catch (error) {
				const { data } = error.response;
				this.$notify.failure(data.message);
			} finally {
				this.$loading.remove(1000);
			}
		},
	},
};
</script>
