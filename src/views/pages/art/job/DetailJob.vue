<template>
	<v-app>
		<v-container>
			<v-card class="mt-5 pa-5" elevation="4" shaped>
				<v-row>
					<v-col cols="12">
						<v-img
							height="350"
							class="white--text align-end"
							alt="banner-job"
							:src="job.photo.photo_url"
							:lazy-src="job.photo.photo_url"
						/>
					</v-col>
					<v-col cols="12">
						<v-row>
							<v-col cols="2">
								<v-avatar class="d-block mx-auto" size="100">
									<img
										:alt="job.art_finder.art_finder_name"
										:src="job.art_finder.photo.photo_url"
										:lazy-src="job.art_finder.photo.photo_url"
									>
								</v-avatar>
							</v-col>
							<v-col cols="10">
								<p class="text-h4 font-weight-regular">{{ job.art_finder.art_finder_name }}</p>
								<p class="text-subtitle-1 font-weight-light">
									{{ job.art_finder.sub_district.name }},
									{{ job.art_finder.district.name }},
									{{ job.art_finder.city.name }}
									{{ job.art_finder.province.name }}
								</p>
								<p class="text-subtitle-2">Deadline lamaran: {{ job.job_due_date }}</p>
							</v-col>
							<v-col cols="12">
								<p class="mb-2 text-h4">Gaji pekerjaan</p>
								<p class="text-h6 font-weight-bold">{{ job.job_payment }}</p>
							</v-col>
							<v-col cols="12">
								<p class="mb-2 text-h4">Alamat pekerjaan</p>
								<p class="text-h6 font-weight-light">{{ job.art_finder.art_finder_address }}</p>
							</v-col>
							<v-col cols="12">
								<p class="mb-2 text-h4">Deskripsi pekerjaan</p>
								<p v-html="job.job_description"></p>
							</v-col>
							<v-col cols="12">
								<v-btn
									block
									large
									raised
									depressed
									color="primary"
									:ripple="{center: true}"
									@click="confirmApply"
								>
									Lamar
								</v-btn>
								<v-btn
									block
									large
									raised
									outlined
									depressed
									class="mt-2"
									color="secondary"
									:ripple="{center: true}"
									@click="$router.go(-1)"
								>
									Kembali
								</v-btn>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-card>
		</v-container>
	</v-app>
</template>

<script>
import jobApi from '@/api/art/job';
import helper from '@/helper';

export default {
	name: 'DetailJob',
	data() {
		return {
			job: {},
		};
	},
	created() {
		this.getDetailJob();
	},
	methods: {
		async getDetailJob() {
			try {
				const { data } = await jobApi.getDetailJob(this.$route.params.id);
				this.job = data.serve;
				this.job.job_payment = helper.rupiahFormat(this.job.job_payment.toString());
				this.job.job_due_date = helper.dateFormat(this.job.job_due_date);
			} catch (error) {
				const { data, status } = error.response;

				if (status === 400 || status === 500) {
					this.$notify.failure(data.message);
				} else {
					this.$notify.failure('Terjadi kesalahan pada server');
				}
			}
		},
		confirmApply() {
			this.$confirm.show(
				'Konfirmasi',
				'Apakah anda yakin ingin melamar ke lowongan ini',
				'Ya, benar',
				'Tidak',
				() => this.applyJob(),
			);
		},
		async applyJob() {
			try {
				this.$loading.hourglass('Loading...');
				const { data } = await jobApi.applyJob(this.$route.params.id);

				this.$notify.success(data.message);
				setTimeout(() => {
					this.$router.push({ name: 'Art-ListAppliedJob' });
				}, 1500);
			} catch (error) {
				const { data, status } = error.response;

				if (status === 400 || status === 500) {
					this.$notify.failure(data.message);
				} else {
					this.$notify.failure('Terjadi kesalahan pada server');
				}
			} finally {
				this.$loading.remove(1000);
			}
		},
	},
};
</script>

<style>

</style>
