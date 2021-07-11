<template>
	<v-app>
		<v-container class="mt-5">
			<h1 class="text-center">List Lowongan Kerja Anda</h1>
			<v-btn
				raised
				depressed
				elevation="2"
				color="primary"
				:block="$vuetify.breakpoint.smAndDown"
				@click="$router.push({ name: 'Finder-CreateJob' })"
			>
				<v-icon
					color="white"
				>
					mdi-plus
				</v-icon>
				Tambah lowongan
			</v-btn>
			<v-row class="mt-2">
				<v-col cols="12" v-if="jobs.length === 0">
					<h2 class="text-center">Anda belum memiliki lowongan</h2>
				</v-col>
				<v-col
					xs="12"
					sm="6"
					md="4"
					lg="4"
					xl="4"
					v-else
					v-for="job in jobs"
					:key="job.id"
				>
					<v-hover v-slot="{ hover }">
						<v-card
							:elevation="hover ? 12 : 4"
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
												color="black"
												@click="$router.push({
													name: 'Finder-InterestedArt', params: {id: job.id}
												})"
											>
												<v-icon>
													mdi-eye
												</v-icon>
												Lihat pelamar
											</v-btn>
										</v-list-item>
										<v-list-item>
											<v-btn
												text
												raised
												depressed
												color="primary"
												@click.stop="showDialog(job.id)"
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
												@click="editJob(job.id)"
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
												@click="confirmDeleteJob(job.id)"
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
			<div class="mt-5" v-if="this.fetch.jobs.length > 0">
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
		<v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card class="pa-5">
        <v-card-title class="text-h5">
          Ubah thumbnail
        </v-card-title>

				<file-pond
					name="photo"
					ref="pond"
					class-name="my-pond"
					label-idle="Seret gambar kesini"
					@addfile="onAddPhoto"
				/>

        <v-card-actions class="mt-5">
          <v-spacer></v-spacer>
          <v-btn
            text
            color="black"
            @click="dialog = false"
          >
            Tutup
          </v-btn>
          <v-btn
						raised
						depressed
            color="info"
						@click="changeThumbnailJob"
          >
            Ubah
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
	</v-app>
</template>

<script>
import helper from '@/helper';
import jobApi from '@/api/finder/job';
import vueFilePond from 'vue-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

const FilePond = vueFilePond(FilePondPluginImagePreview);

export default {
	name: 'JobPage',
	data() {
		return {
			dialog: false,
			photo: null,
			idJob: 0,
			fetch: {
				jobs: [],
			},
			page: {
				nextPageUrl: null,
				prevPageUrl: null,
			},
		};
	},
	computed: {
		jobs() {
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
		async getJob(url = 'api/finder/job') {
			try {
				const { data } = await jobApi.getJob(url);
				this.fetch.jobs = data.serve.data;

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
		showDialog(idJob) {
			this.dialog = true;
			this.idJob = idJob;
		},
		onAddPhoto(_, file) {
			this.photo = file;
		},
		async changeThumbnailJob() {
			try {
				this.$loading.hourglass('Loading...');

				const formData = new FormData();
				formData.append('job_thumbnail', this.photo.file);

				const { data } = await jobApi.changeJobThumbnail(this.idJob, formData);

				this.$notify.success(data.message);
				this.dialog = false;
				this.getJob();
			} catch (error) {
				const { data, status } = error.response;

				if (status === 422) {
					const firstErrorField = Object.keys(data.errors)[0];
					const firstError = data.errors[firstErrorField];
					this.$notify.failure(firstError[0]);
				} else if (status === 404 || status === 500) {
					this.$notify.failure(data.message);
				} else {
					this.$notify.failure('Terjadi kesalahan pada server');
				}
			} finally {
				this.$loading.remove(1000);
				this.$refs.pond.removeFiles();
			}
		},
		editJob(idJob) {
			this.$router.push({ name: 'Finder-UpdateJob', params: { id: idJob } });
		},
		confirmDeleteJob(idJob) {
			this.$confirm.show(
				'Konfirmasi',
				'Apakah anda yakin ingin mengahapus lowongan ini?',
				'Ya, benar',
				'Tidak',
				() => {
					this.idJob = idJob;
					this.deleteJob();
				},
			);
		},
		async deleteJob() {
			try {
				this.$loading.hourglass('Loading...');

				const { data } = await jobApi.deleteJob(this.idJob);
				this.$notify.success(data.message);
				this.getJob();
			} catch (error) {
				const { data, status } = error.response;

				if (status === 404 || status === 500) {
					this.$notify.failure(data.message);
				} else {
					this.$notify.failure('Terjadi kesalahan pada server');
				}
			} finally {
				this.$loading.remove(1000);
				this.idJob = 0;
			}
		},
		nextPage() {
			this.getJob(this.page.nextPageUrl);
		},
		prevPage() {
			this.getJob(this.page.prevPageUrl);
		},
	},
	components: {
		FilePond,
	},
};
</script>
