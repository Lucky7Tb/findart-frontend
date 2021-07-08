<template>
	<v-app>
		<v-container>
			<v-row class="mt-5 d-flex justify-center">
				<v-col cols="5">
					<v-select
						outlined
						label="Provinsi"
						no-data-text="Tidak ada data"
						v-model="form.provinceId"
						:items="fetchData.provinces"
						item-value="id"
						item-text="name"
						@change="getCity"
					>
					</v-select>
				</v-col>
				<v-col cols="5">
					<v-select
						outlined
						label="Kota"
						no-data-text="Tidak ada data"
						v-model="form.cityId"
						:items="fetchData.cities"
						item-value="id"
						item-text="name"
						@change="filterJobVacancyByCity"
					></v-select>
				</v-col>
				<v-col cols="2">
					<v-btn
						raised
						x-large
						color="primary"
						@click="resetSearch"
					>
						<v-icon left> mdi-history </v-icon>
						Reset
					</v-btn>
				</v-col>
			</v-row>
			<v-row>
				<v-col
					xs="12"
					sm="6"
					lg="4"
					v-for="job in jobs"
					:key="job.job_vacancy_id"
				>
					<v-card
						class="mx-auto"
						max-width="400"
					>
						<v-img
							height="200"
							class="white--text align-end"
							:src="job.photo.photo_url"
							:lazy-src="job.photo.photo_url"
						>
							<v-card-title>
								{{ job.art_finder.art_finder_name }}
							</v-card-title>
						</v-img>

						<v-card-subtitle class="pb-0">
							Deadline pendaftaran: {{ job.job_due_date }}
						</v-card-subtitle>

						<v-list class="transparent">
							<v-list-item>
								<v-list-item-icon>
									<v-icon left>mdi-cash</v-icon>
								</v-list-item-icon>
								<v-list-item-title>Gaji: {{ job.job_payment }}</v-list-item-title>
							</v-list-item>
							<v-list-item>
								<v-list-item-icon>
									<v-icon left>mdi-map-marker-outline</v-icon>
								</v-list-item-icon>
								<v-list-item-title>
									Lokasi:
									{{ job.art_finder.city.name }},
									{{ job.art_finder.province.name }}
								</v-list-item-title>
							</v-list-item>
						</v-list>

						<v-card-actions>
							<v-row>
								<v-col>
									<v-btn
										block
										raised
										depressed
										color="primary"
										:ripple="{center: true}"
										@click="confirmApply(job.job_vacancy_id)"
									>
										Lamar
									</v-btn>
								</v-col>
								<v-col>
									<v-btn
										block
										raised
										depressed
										color="warning"
										:ripple="{center: true}"
										@click="goToDetailJob(job.job_vacancy_id)"
									>
										Detail
									</v-btn>
								</v-col>
							</v-row>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
			<div class="mt-5 d-block mx-auto" v-if="this.jobs.length > 0">
				<v-btn
					fab
					class="mr-3"
					color="white"
					:disabled="page.prevPageUrl === null"
					@click="prevPage"
				>
					<v-icon>mdi-arrow-left</v-icon>
				</v-btn>

				<v-btn
					fab
					color="white"
					:disabled="page.nextPageUrl === null"
					@click="nextPage"
				>
					<v-icon>mdi-arrow-right</v-icon>
				</v-btn>
			</div>
		</v-container>
	</v-app>
</template>

<script>
import helper from '@/helper';
import jobApi from '@/api/art/job';
import locationAPI from '@/api/location';

export default {
	name: 'Job',
	data() {
		return {
			form: {
				provinceId: -1,
				cityId: -1,
			},
			fetchData: {
				provinces: [],
				cities: [],
				jobVacancy: [],
			},
			page: {
				nextPageUrl: null,
				prevPageUrl: null,
			},
		};
	},
	computed: {
		jobs() {
			return this.fetchData.jobVacancy.map((job) => {
				const tmpJob = job;
				tmpJob.job_due_date = helper.dateFormat(tmpJob.job_due_date);
				tmpJob.job_payment = helper.rupiahFormat(tmpJob.job_payment.toString());
				return tmpJob;
			});
		},
	},
	created() {
		this.getProvinces();
		this.getListJobVacancy();
	},
	methods: {
		async getProvinces() {
			try {
				const { data } = await locationAPI.getProvinces();
				this.fetchData.provinces = data.serve;
			} catch (error) {
				const { data } = error.response;
				this.$notify.failure(data.message);
			}
		},
		async getCity() {
			try {
				const { data } = await locationAPI.getCities(this.form.provinceId);
				this.fetchData.cities = data.serve;
			} catch (error) {
				const { data } = error.response;
				this.$notify.failure(data.message);
			} finally {
				this.getListJobVacancy('', this.form.provinceId);
			}
		},
		async getListJobVacancy(url = '', provinceId = '', cityId = '') {
			try {
				const { data } = await jobApi.getListJobVacancy(url, provinceId, cityId);

				this.fetchData.jobVacancy = data.serve.data;
				this.page.nextPageUrl = data.serve.next_page_url;
				this.page.prevPageUrl = data.serve.prev_page_url;
			} catch (error) {
				const { data, status } = error.response;

				if (status === 500) {
					this.$notify.failure(data.message);
				} else {
					this.$notify.failure('Terjadi kesalahan pada server');
				}
			}
		},
		confirmApply(jobId) {
			this.$confirm.show(
				'Konfirmasi',
				'Apakah anda yakin ingin melamar ke lowongan ini',
				'Ya, benar',
				'Tidak',
				() => this.applyJob(jobId),
			);
		},
		async applyJob(jobId) {
			try {
				this.$loading.hourglass('Loading...');
				const { data } = await jobApi.applyJob(jobId);

				this.$notify.success(data.message);
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
		nextPage() {
			if (this.form.provinceId !== -1) {
				if (this.form.cityId !== -1) {
					this.getListJobVacancy(this.page.nextPageUrl, this.form.provinceId, this.form.cityId);
				} else {
					this.getListJobVacancy(this.page.nextPageUrl, this.form.provinceId);
				}
			} else {
				this.getListJobVacancy(this.page.nextPageUrl);
			}
		},
		prevPage() {
			if (this.form.provinceId !== -1) {
				if (this.form.cityId !== -1) {
					this.getListJobVacancy(this.page.prevPageUrl, this.form.provinceId, this.form.cityId);
				} else {
					this.getListJobVacancy(this.page.prevPageUrl, this.form.provinceId);
				}
			} else {
				this.getListJobVacancy(this.page.prevPageUrl);
			}
		},
		filterJobVacancyByCity() {
			this.getListJobVacancy('', this.form.provinceId, this.form.cityId);
		},
		resetSearch() {
			this.form.provinceId = -1;
			this.form.cityId = -1;
			this.fetchData.cities = [];
			this.getListJobVacancy();
		},
		goToDetailJob(jobId) {
			this.$router.push({ name: 'Art-DetailJob', params: { id: jobId } });
		},
	},
};
</script>

<style></style>
