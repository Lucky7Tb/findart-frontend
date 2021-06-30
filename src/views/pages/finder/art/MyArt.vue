<template>
	<v-app>
		<v-container>
			<h1 v-if="myArt.length === 0">Anda tidak punya art</h1>

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
									color="accent"
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
									@click="confirmFireArt(data.id, data.art_id)"
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
				max-width="290"
			>
				<v-card>
					<v-card-title class="text-h5">
						Use Google's location service?
					</v-card-title>
					<v-card-text>Let Google</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							color="green darken-1"
							text
							@click="artRatingDialog = false"
						>
							Disagree
						</v-btn>
						<v-btn
							color="green darken-1"
							text
							@click="artRatingDialog = false"
						>
							Agree
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
				const { data } = error.response;
				this.$notify.failure(data.message);
			}
		},
		confirmFireArt() {
			this.$confirm.show(
				'Konfirmasi',
				'Yakin ingin memberhentikan art ini? Anda harus memberi rating terlebih dahulu.',
				'Ya, yakin',
				'Tidak',
				() => { this.artRatingDialog = true; },
			);
		},
		async fireArt(acceptedJobId, artId) {
			try {
				this.$loading.hourglass('Loading...');

				const { data } = await artApi.fireArt({
					accepted_job_id: acceptedJobId,
					art_id: artId,
				});

				this.$notify.success(data.message);
			} catch (error) {
				const { data } = error.response;
				this.$notify.failure(data.message);
			} finally {
				this.$loading.remove();
			}
		},
	},
};
</script>

<style>

</style>
