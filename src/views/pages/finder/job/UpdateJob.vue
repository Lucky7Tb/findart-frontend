<template>
	<v-app>
		<v-container>
			<v-form class="mt-5" lazy-validation @submit.prevent="updateJob">
				<v-container>
					<v-row>
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
								v-model="form.job_description"
								:options="quillOptions"
								:auto-height="false"
								:error-messages="validation.firstError('form.job_description')"
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
import Vue from 'vue';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import jobApi from '@/api/finder/job';
import { quillEditor } from 'vue-quill-editor';

import SimpleVueValidator from 'simple-vue-validator';

Vue.use(SimpleVueValidator, { mode: 'conservative' });
const { Validator } = SimpleVueValidator;

export default {
	name: 'UpdateJob',
	created() {
		this.getDetailJob();
	},
	data() {
		return {
			modal: false,
			form: {
				job_payment: 0,
				job_due_date: '',
				job_description: '',
			},
			quillOptions: {
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
		'form.job_description': {
			cache: true,
			debounce: 500,
			validator: (value) => Validator.value(value).required(),
		},
	},
	methods: {
		async getDetailJob() {
			try {
				const { data } = await jobApi.getDetailJob(this.$route.params.id);
				this.fillForm(data.serve);
			} catch (error) {
				const { data } = error.response;
				this.$notify.failure(data.message);
			}
		},
		updateJob() {
			this.$validate().then(async (success) => {
				if (success) {
					try {
						const { data } = await jobApi.updateJob(this.$route.params.id, this.form);

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
						} else if (status === 404 || status === 500) {
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
		fillForm(data) {
			this.form.job_payment = data.job_payment;
			this.form.job_due_date = data.job_due_date;
			this.form.job_description = data.job_description;
		},
	},
	components: {
		quillEditor,
	},
};
</script>

<style>

</style>
