<template>
	<v-app>
		<v-container class="mt-5">
			<h1 class="text-center">List Lowongan Kerja Anda</h1>
			<v-btn
				raised
				depressed
				:block="$vuetify.breakpoint.smAndDown"
				elevation="2"
				color="primary"
			>
				<v-icon
					color="white"
				>
					mdi-plus
				</v-icon>
				Tambah lowongan
			</v-btn>
			<v-row class="mt-2">
				<v-col
					xs="12"
					sm="6"
					md="4"
					lg="4"
					xl="4"
					v-for="job in jobsFormated"
					:key="job.id"
				>
					<v-hover v-slot="{ hover }">
						<v-card
							:elevation="hover ? 12 : 2"
							:class="{ 'on-hover': hover }"
						>
							<v-img
								height="250"
								:src="job.photo.photo_url"
								:lazy-src="job.photo.photo_url"
							></v-img>

							<v-card-text>
								<v-row>
									<v-col cols="6">
										<h2 class="mb-3">Gaji</h2>
										<h3 class="font-weight-bold">{{ job.job_payment }}</h3>
									</v-col>
									<v-col cols="6">
										<h2 class="mb-3">Deadline daftar</h2>
										<h3 class="font-weight-bold">{{ job.job_due_date }}</h3>
									</v-col>
								</v-row>
							</v-card-text>

							<v-card-actions>
								<v-spacer></v-spacer>
								<div class="text-center">
								<v-menu offset-x rounded="b-lg">
									<template v-slot:activator="{ on, attrs }">
										<v-btn
											text
											depressed
											color="primary"
											v-on="on"
											v-bind="attrs"
										>
											Aksi
										</v-btn>
									</template>
									<v-list>
										<v-list-item>
											<v-btn
												text
												raised
												depressed
												color="info"
											>
												<v-icon>
													mdi-image-edit
												</v-icon>
												Ubah thumbnail
											</v-btn>
										</v-list-item>
										<v-list-item>
											<v-btn
												text
												raised
												depressed
												color="warning"
											>
												<v-icon>
													mdi-pencil
												</v-icon>
												Ubah lowongan
											</v-btn>
										</v-list-item>
										<v-list-item>
											<v-btn
												text
												raised
												depressed
												color="danger"
											>
												<v-icon>
													mdi-delete
												</v-icon>
												Hapus lowongan
											</v-btn>
										</v-list-item>
									</v-list>
								</v-menu>
							</div>
							</v-card-actions>
						</v-card>
					</v-hover>
				</v-col>
			</v-row>
		</v-container>
		<v-pagination circle class="mt-5"></v-pagination>
	</v-app>
</template>

<script>
import jobApi from '@/api/finder/job';
import helper from '@/helper';

export default {
	name: 'JobPage',
	data() {
		return {
			fetch: {
				jobs: [],
			},
		};
	},
	computed: {
		jobsFormated() {
			return this.fetch.jobs.map((job) => {
				const tmpJob = job;
				tmpJob.job_due_date = helper.dateFormat(tmpJob.job_due_date);
				tmpJob.job_payment = helper.rupiahFormat(tmpJob.job_payment.toString());
				return tmpJob;
			});
		},
	},
	created() {
		this.getJob();
	},
	methods: {
		async getJob() {
			try {
				const { data } = await jobApi.getJob();
				this.fetch.jobs = data.serve.data;
			} catch (error) {
				const { data } = error.response;
				this.$notify.failure(data.message);
			}
		},
	},
};
</script>
