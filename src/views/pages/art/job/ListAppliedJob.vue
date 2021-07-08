<template>
	<v-app>
		<v-container>
			<v-row class="mt-5">
				<v-col cols="12">
					<v-select
						outlined
						label="Status lamaran"
						no-data-text="Tidak ada data"
						v-model="form.status"
						:items="form.listStatus"
						item-value="status"
						item-text="name"
						@change="getAppliedJob"
					></v-select>
				</v-col>
				<v-col cols="12">
					<v-row>
						<v-col
							xs="12"
							sm="6"
							lg="4"
							v-for="data in appliedJob"
							:key="data.job_vacancy.id"
						>
							<v-card
								height="100%"
								class="mx-auto"
							>
								<v-img
									height="200"
									class="white--text align-end"
									:src="data.job_vacancy.photo.photo_url"
									:lazy-src="data.job_vacancy.photo.photo_url"
									@click="$router.push({
										name: 'Art-DetailJob', params: { id: data.job_vacancy.id }
									})"
									id="job-thumbnail"
								>
									<v-card-title>

										{{ data.job_vacancy.art_finder.art_finder_name }}
									</v-card-title>
								</v-img>

								<v-card-subtitle class="pb-0">
									Deadline pendaftaran: {{ data.job_vacancy.job_due_date }}
								</v-card-subtitle>

								<v-list class="transparent">
									<v-list-item>
										<v-list-item-icon>
											<v-icon left>mdi-cash</v-icon>
										</v-list-item-icon>
										<v-list-item-title>Gaji: {{ data.job_vacancy.job_payment }}</v-list-item-title>
									</v-list-item>
									<v-list-item>
										<v-list-item-icon>
											<v-icon left>mdi-map-marker</v-icon>
										</v-list-item-icon>
										<v-list-item-title>
											Lokasi:
											{{ data.job_vacancy.art_finder.city.name }},
											{{ data.job_vacancy.art_finder.province.name }}
										</v-list-item-title>
									</v-list-item>
									<v-list-item>
										<v-list-item-icon>
											<v-icon left>mdi-check</v-icon>
										</v-list-item-icon>
										<v-list-item-title>
											Status:
											<v-chip
												dark
												class="ma-2"
												:color="data.badge"
											>
												{{ data.apply_status }}
											</v-chip>
										</v-list-item-title>
									</v-list-item>
								</v-list>

								<v-card-actions>
									<v-row>
										<v-col>
											<div v-if="data.apply_status === 'Pending'">
												<v-btn
													dark
													block
													raised
													outlined
													depressed
													color="danger"
													:ripple="{center: true}"
													@click="confirmCancelApply(data.id)"
												>
													Tarik lamaran
												</v-btn>
											</div>
											<div v-else-if="data.apply_status === 'Diterima'">
												<v-btn
													block
													outlined
													color="accent"
													target="_blank"
													:ripple="{center: true}"
													:href="(
														`https://api.whatsapp.com/send?phone=${data.job_vacancy.art_finder.art_finder_phone_number}&text=Halo%20saudara/i%20${data.job_vacancy.art_finder.art_finder_name}%20. Sekarang%20saya%20bekerja%20untuk%20anda%20. Mohon%20kerjasamanya 🙏.`
													)"
												>
													Chat
													<v-icon right small>
														mdi-message
													</v-icon>
												</v-btn>
											</div>
										</v-col>
									</v-row>
								</v-card-actions>
							</v-card>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-container>
	</v-app>
</template>

<script>
import jobApi from '@/api/art/job';
import helper from '@/helper';

export default {
	name: 'ListAppliedJob',
	created() {
		this.getAppliedJob();
	},
	data() {
		return {
			appliedJobData: [],
			form: {
				status: -1,
				listStatus: [
					{
						name: 'Semua',
						status: -1,
					},
					{
						name: 'Pending',
						status: 0,
					},
					{
						name: 'Ditolak',
						status: 1,
					},
					{
						name: 'Diterima',
						status: 2,
					},
					{
						name: 'Berhenti',
						status: 3,
					},
				],
			},
		};
	},
	computed: {
		appliedJob() {
			return this.appliedJobData.map((appliedJob) => {
				const job = appliedJob;
				switch (job.apply_status) {
				case 0:
					job.apply_status = 'Pending';
					job.badge = 'warning';
					break;
				case 1:
					job.apply_status = 'Ditolak';
					job.badge = 'danger';
					break;
				case 2:
					job.apply_status = 'Diterima';
					job.badge = 'success';
					break;
				case 3:
					job.apply_status = 'Sudah berhenti';
					job.badge = 'danger';
					break;
				default:
					job.apply_status = 'Error';
					job.badge = 'danger';
					break;
				}
				job.job_vacancy.job_due_date = helper.dateFormat(job.job_vacancy.job_due_date);
				job.job_vacancy.job_payment = helper.rupiahFormat(job.job_vacancy.job_payment.toString());
				job.job_vacancy.art_finder.art_finder_phone_number = helper.indonesiaNumberFormat((
					job.job_vacancy.art_finder.art_finder_phone_number
				));
				return job;
			});
		},
	},
	methods: {
		async getAppliedJob() {
			try {
				const { data } = await jobApi.getAppliedJob(this.form.status);
				this.appliedJobData = data.serve;
			} catch (error) {
				const { data, status } = error.response;

				if (status === 500) {
					this.$notify.failure(data.message);
				} else {
					this.$notify.failure('Terjadi kesalahan pada server');
				}
			}
		},
		confirmCancelApply(id) {
			this.$confirm.show(
				'Konfirmasi',
				'Yakin ingin menarik lamaran pada lowongan ini?',
				'Ya, yakin',
				'Tidak',
				() => this.cancelApplyJob(id),
			);
		},
		async cancelApplyJob(id) {
			try {
				this.$loading.hourglass('Loading...');
				const { data } = await jobApi.cancelApplyJob(id);
				this.$notify.success(data.message);
				this.getAppliedJob();
			} catch (error) {
				const { data, status } = error.response;

				if (status === 500) {
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
	#job-thumbnail:hover {
		cursor: pointer;
	}
</style>
