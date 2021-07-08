<template>
	<v-app>
		<v-container>
			<v-form class="mt-5" lazy-validation @submit.prevent="createJob">
				<v-container>
					<v-row>
						<v-col cols="12">
							<label class="mb-5 text--disabled">Masukan thumbnail lowongan</label>
							<file-pond
								name="job_thumbnail"
								ref="pond"
								class-name="my-pond"
								label-idle="Seret gambar kesini"
								@addfile="onAddPhoto"
							/>
						</v-col>
						<v-col cols="6">
							<v-text-field
									outlined
									clearable
									autofocus
									tabindex="1"
									label="Gaji"
									color="primary"
									class="rounded-lg"
									hint="e.g 2000000"
									prepend-inner-icon="mdi-cash"
									placeholder="Masukan gaji lowongan"
									v-model="form.job_payment"
									:error-messages="validation.firstError('form.job_payment')"
								>
							</v-text-field>
						</v-col>
						<v-col cols="6">
							<v-dialog
								persistent
								ref="dialog"
								width="300px"
								v-model="modal"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										readonly
										outlined
										autofocus
										class="rounded-lg"
										label="Deadline pendaftaran"
										prepend-inner-icon="mdi-calendar"
										v-on="on"
										v-bind="attrs"
										v-model="form.job_due_date"
										:error-messages="validation.firstError('form.job_due_date')"
									></v-text-field>
								</template>
								<v-date-picker
									scrollable
									v-model="form.job_due_date"
									:min="new Date().toISOString()"
								>
									<v-spacer></v-spacer>
									<v-btn
										text
										color="primary"
										@click="modal = false"
									>
										Tutup
									</v-btn>
									<v-btn
										text
										color="primary"
										@click="$refs.dialog.save(form.job_due_date)"
									>
										Ok
									</v-btn>
								</v-date-picker>
							</v-dialog>
						</v-col>
						<v-col cols="12" class="mb-10">
							<quill-editor
								style="height: 300px"
								placeholder="Masukan deskripsi lowongan"
								v-model="form.job_description"
								:options="quillOptions"
								:auto-height="false"
							></quill-editor>
						</v-col>
						<v-col cols="12">
							<v-btn
								large
								block
								raised
								elevation="5"
								type="submit"
								color="primary"
								:ripple="{center: true}"
							>
								Simpan
							</v-btn>
							<v-btn
								large
								block
								raised
								outlined
								class="mt-5"
								elevation="5"
								color="black"
								:ripple="{center: true}"
								@click="$router.go(-1)"
							>
								Kembali
							</v-btn>
						</v-col>
					</v-row>
				</v-container>
			</v-form>
		</v-container>
	</v-app>
</template>

<script>
import jobApi from '@/api/finder/job';
import Vue from 'vue';
import { quillEditor } from 'vue-quill-editor';
import vueFilePond from 'vue-filepond';
import SimpleVueValidator from 'simple-vue-validator';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

const FilePond = vueFilePond(FilePondPluginImagePreview);

Vue.use(SimpleVueValidator, { mode: 'conservative' });
const { Validator } = SimpleVueValidator;

export default {
	name: 'CreateJob',
	data() {
		return {
			modal: false,
			form: {
				job_thumbnail: null,
				job_payment: 2000000,
				job_due_date: '',
				job_description: '',
			},
			quillOptions: {
				placeholder: 'Masukan deskripsi lowongan',
				modules: {
					toolbar: {
						container: [
							['bold', 'italic', 'underline'],
							[
								{
									align: [],
								},
							],
							[{
								header: [2, 3, 4, 5, 6, false],
							}],
							[
								{
									list: 'ordered',
								},
								{
									list: 'bullet',
								},
							],
							['blockquote'],
							[
								{
									color: [],
								},
								{
									background: [],
								},
							],
						],
					},
					history: {
						delay: 1000,
						maxStack: 50,
						userOnly: false,
					},
				},
			},
		};
	},
	validators: {
		'form.job_payment': {
			cache: true,
			debounce: 500,
			validator: (value) => (
				Validator.value(value).required().integer().greaterThanOrEqualTo(2000000)
			),
		},
		'form.job_due_date': {
			cache: true,
			debounce: 500,
			validator: (value) => Validator.value(value).required(),
		},
	},
	methods: {
		onAddPhoto(_, file) {
			this.form.job_thumbnail = file;
		},
		createJob() {
			this.$validate().then(async (success) => {
				if (success) {
					try {
						this.$loading.hourglass('Loading...');

						const formData = new FormData();
						formData.append('job_thumbnail', this.form.job_thumbnail.file);
						formData.append('job_payment', this.form.job_payment);
						formData.append('job_due_date', this.form.job_due_date);
						formData.append('job_description', this.form.job_description);

						const { data } = await jobApi.createJob(formData);

						this.$notify.success(data.message);

						setTimeout(() => {
							this.$router.go(-1);
						}, 1500);
					} catch (error) {
						const { data, status } = error.response;

						if (status === 422) {
							const firstErrorField = Object.keys(data.errors)[0];
							const firstError = data.errors[firstErrorField];
							this.$notify.failure(firstError[0]);
						} else if (status === 500) {
							this.$notify.failure(data.message);
						} else {
							this.$notify.failure('Terjadi kesalahan pada server');
						}
					} finally {
						this.$loading.remove(1000);
					}
				}
			});
		},
	},
	components: {
		quillEditor,
		FilePond,
	},
};
</script>
