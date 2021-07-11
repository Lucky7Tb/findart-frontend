<template>
	<v-app>
		<v-container>
			<h1 class="text-center" v-if="myArt.length === 0">Anda tidak punya art</h1>

			<v-row class="mt-5">
				<v-col
					xs="12"
					sm="12"
					md="3"
					lg="4"
					v-for="data in myArt"
					:key="data.art.id"
				>
					<v-hover v-slot="{ hover }">
						<v-card
							shaped
							:elevation="hover ? 12 : 5"
							:class="{'on-hover': hover}"
						>
							<v-img
								contain
								height="250"
								:alt="data.art.art_name"
								:src="data.art.photo.photo_url"
								:lazy-src="data.art.photo.photo_url"
							></v-img>

							<v-card-text>
								<h2 class="text-center mt-2">{{ data.art.art_name }}</h2>
								<v-btn
									block
									class="mt-3"
									color="primary"
									target="_blank"
									:href="(
										`https://api.whatsapp.com/send?phone=${data.art.art_phone_number}&text=Halo%20saudara/i%20${data.art.art_name}%20. Sekarang%20anda%20bekerja%20untuk%20saya%20ya%20. Mohon%20kerjasamanya 🙏.`
									)"
									:ripple="{center: true}"
								>
									Chat
									<v-icon right small>
										mdi-message
									</v-icon>
								</v-btn>
								<v-btn
									block
									outlined
									class="mt-3"
									color="danger white--text"
									:ripple="{center: true}"
									@click="confirmFireArt(data.id, data.art.art_name)"
								>
									Berhentikan
									<v-icon right small>
										mdi-close-octagon
									</v-icon>
								</v-btn>
							</v-card-text>

							<v-card-actions>
							</v-card-actions>
						</v-card>
					</v-hover>
				</v-col>
			</v-row>
			<v-dialog
				v-model="artRatingDialog"
				persistent
				width="500"
			>
				<v-card>
					<v-toolbar
						color="primary"
						dark
					>
						Beri rating untuk {{ fireArtData.artName }}
					</v-toolbar>
					<v-card-text>
						<h2 class="text-center mt-3">Rating</h2>
						<v-rating
							hover
							size="34"
							length="5"
							color="warning"
							background-color="warning"
							class="text-center mt-2"
							v-model="fireArtData.rating"
						></v-rating>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							dark
							color="danger"
							@click="confirmGivenRating"
						>
							Oke, berhentikan
						</v-btn>
						<v-btn
							outlined
							color="black"
							@click="artRatingDialog = false"
						>
							Tutup
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-container>
	</v-app>
</template>

<script>
import artApi from '@/api/finder/art';
import helper from '@/helper';

export default {
	name: 'MyArt',
	data() {
		return {
			artRatingDialog: false,
			dataArt: [],
			fireArtData: {
				rating: 1,
				artName: '',
				acceptedJobId: -1,
			},
		};
	},
	computed: {
		myArt() {
			return this.dataArt.map((art) => {
				const tmpArt = art;
				tmpArt.art.art_phone_number = helper.indonesiaNumberFormat(tmpArt.art.art_phone_number);
				return tmpArt;
			});
		},
	},
	created() {
		this.getMyArt();
	},
	methods: {
		async getMyArt() {
			try {
				const { data } = await artApi.getMyArt();
				this.dataArt = data.serve;
			} catch (error) {
				const { data, status } = error.response;

				if (status === 500) {
					this.$notify.failure(data.message);
				} else {
					this.$notify.failure('Terjadi kesalahan pada server');
				}
			}
		},
		confirmFireArt(acceptedJobId, artName) {
			this.$confirm.show(
				'Konfirmasi',
				'Yakin ingin memberhentikan art ini? Anda harus memberi rating terlebih dahulu.',
				'Ya, yakin',
				'Tidak',
				() => this.showArtRatingDialog(acceptedJobId, artName),
			);
		},
		confirmGivenRating() {
			this.$confirm.show(
				'Konfirmasi',
				`Yakin ingin memberi rating art bintang ${this.fireArtData.rating}`,
				'Ya, yakin',
				'Tidak',
				() => this.fireArt(),
			);
		},
		showArtRatingDialog(acceptedJobId, artName) {
			this.artRatingDialog = true;
			this.fireArtData.rating = 1;
			this.fireArtData.artName = artName;
			this.fireArtData.acceptedJobId = acceptedJobId;
		},
		async fireArt() {
			try {
				this.$loading.hourglass('Loading...');

				const { data } = await artApi.fireArt({
					accepted_job_id: this.fireArtData.acceptedJobId,
					art_rating: this.fireArtData.rating,
				});

				this.$notify.success(data.message);
				this.clearData();
				this.getMyArt();
			} catch (error) {
				const { data, status } = error.response;

				if (status === 500) {
					this.$notify.failure(data.message);
				} else {
					this.$notify.failure('Terjadi kesalahan pada server');
				}
			} finally {
				this.$loading.remove();
			}
		},
		clearData() {
			this.artRatingDialog = false;
			this.fireArtData.rating = 1;
			this.fireArtData.artName = '';
			this.fireArtData.acceptedJobId = -1;
		},
	},
};
</script>

<style>

</style>
