<template>
	<v-app id="register-body">
		<v-container>
			<v-card
				outlined
				elevation="10"
				width="950"
				class="mx-auto my-auto py-2 rounded-xl mt-5"
			>
				<v-img
					contain
					lazy-src="@/assets/images/new_logo.png"
					width="400px"
					src="@/assets/images/new_logo.png"
					class="d-none d-sm-flex mx-auto"
				></v-img>

				<v-container>
					<v-stepper alt-labels flat outlined v-model="registerStep">
						<v-stepper-header>
							<v-stepper-step step="1">
								Pilih tipe akun
							</v-stepper-step>

							<v-divider></v-divider>

							<v-stepper-step step="2">
								Isi biodata
							</v-stepper-step>
						</v-stepper-header>

						<v-stepper-items>
							<v-stepper-content step="1">
								<h2 class="text-center mb-5">Silahkan pilih tipe akunmu</h2>
								<vue-select-image
									useLabel
									h="250px"
									w="300px"
									class="ml-15 text-center font-weight-bold black--text"
									:dataImages="dataImages"
									@onselectimage="changeRole"
								></vue-select-image>

								<v-btn
									raised
									elevation="5"
									color="primary"
									class="mt-5 d-block mx-auto"
									:ripple="{center: true}"
									:disabled="form.role ? null : true"
									@click="registerStep = 2"
								>
									Selanjutnya
								</v-btn>

								<p class="text-center font-weight-regular mt-5">
									Sudah punya akun?
									<router-link
										to="/login"
										class="font-weight-bold text-decoration-none primary--text"
									>
										Masuk
									</router-link>
								</p>
							</v-stepper-content>

							<v-stepper-content step="2">
								<v-btn
									fab
									dark
									small
									outlined
									elevation="2"
									color="black"
									class="ml-6 mb-2"
									@click="registerStep = 1"
								>
									<v-icon>mdi-arrow-left</v-icon>
								</v-btn>
								<v-form ref="registerForm" lazy-validation @submit.prevent="confirmRegister">
									<v-container>
										<v-row class="px-5">
											<v-col cols="6">
												<v-text-field
													outlined
													clearable
													autofocus
													label="Nama"
													color="primary"
													class="rounded-lg"
													hint="e.g Jhon doe"
													placeholder="Nama anda"
													prepend-inner-icon="mdi-account"
													v-model="form.full_name"
													:error-messages="validation.firstError('form.full_name')"
												>
												</v-text-field>
											</v-col>
											<v-col cols="6">
												<v-text-field
													outlined
													clearable
													color="primary"
													label="No telpon"
													placeholder="No telpon anda"
													hint="e.g 08xxxxxx"
													prepend-inner-icon="mdi-phone"
													class="rounded-lg"
													v-model="form.phone_number"
													:error-messages="validation.firstError('form.phone_number')"
												>
												</v-text-field>
											</v-col>
											<v-col cols="12">
												<v-textarea
													outlined
													name="input-7-4"
													label="Alamat anda"
													v-model="form.address"
													:error-messages="validation.firstError('form.address')"
												></v-textarea>
											</v-col>
											<v-col cols="6">
												<v-select
													outlined
													label="Provinsi"
													no-data-text="Tidak ada data"
													v-model="form.province_id"
													:items="fetchData.provinces"
													item-value="id"
													item-text="name"
													:error-messages="validation.firstError('form.province_id')"
													@change="getCity"
												>
												</v-select>
											</v-col>
											<v-col cols="6">
												<v-select
													outlined
													label="Kota"
													no-data-text="Tidak ada data"
													v-model="form.city_id"
													:items="fetchData.cities"
													item-value="id"
													item-text="name"
													:error-messages="validation.firstError('form.city_id')"
													@change="getDistricts"
												></v-select>
											</v-col>
											<v-col cols="6">
												<v-select
													outlined
													label="Kecamatan"
													no-data-text="Tidak ada data"
													v-model="form.district_id"
													:items="fetchData.districts"
													item-value="id"
													item-text="name"
													:error-messages="validation.firstError('form.district_id')"
													@change="getSubDistricts"
												></v-select>
											</v-col>
											<v-col cols="6">
												<v-select
													outlined
													label="Kelurahan"
													no-data-text="Tidak ada data"
													v-model="form.sub_district_id"
													:items="fetchData.subDistricts"
													item-value="id"
													item-text="name"
													:error-messages="validation.firstError('form.sub_district_id')"
												></v-select>
											</v-col>
											<v-col cols="12">
												<v-text-field
													outlined
													clearable
													color="primary"
													label="Username"
													placeholder="Username anda"
													hint="e.g jhondoe123"
													prepend-inner-icon="mdi-account"
													class="rounded-lg"
													v-model="form.username"
													:error-messages="validation.firstError('form.username')"
												>
												</v-text-field>
											</v-col>
											<v-col cols="6">
												<v-text-field
													outlined
													color="primary"
													label="Password"
													class="rounded-lg"
													autocomplete="false"
													placeholder="Password anda"
													prepend-inner-icon="mdi-lock"
													v-model="form.password"
													:append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
													:type="showPass ? 'text' : 'password'"
													:error-messages="validation.firstError('form.password')"
													@click:append="showPass = !showPass"
												>
												</v-text-field>
											</v-col>
											<v-col cols="6">
												<v-text-field
													outlined
													color="primary"
													class="rounded-lg"
													autocomplete="false"
													label="Konfirmasi password"
													prepend-inner-icon="mdi-lock"
													placeholder="Konfirmasi password anda"
													v-model="form.confirm_password"
													:append-icon="showPassConfirm ? 'mdi-eye' : 'mdi-eye-off'"
													:type="showPassConfirm ? 'text' : 'password'"
													:error-messages="validation.firstError('form.confirm_password')"
													@click:append="showPassConfirm = !showPassConfirm"
												>
												</v-text-field>
											</v-col>
											<v-btn
												large
												block
												raised
												type="submit"
												elevation="5"
												color="primary"
												:ripple="{center: true}"
											>
												Daftar
											</v-btn>
										</v-row>
									</v-container>
								</v-form>
								<p class="text-center font-weight-regular mt-5">
									Sudah punya akun?
									<router-link
										to="/login"
										class="font-weight-bold text-decoration-none primary--text"
									>
										Masuk
									</router-link>
								</p>
							</v-stepper-content>
						</v-stepper-items>
					</v-stepper>
				</v-container>
			</v-card>
		</v-container>
	</v-app>
</template>

<script>
import Vue from 'vue';
import VueSelectImage from 'vue-select-image';
import SimpleVueValidator from 'simple-vue-validator';
import authAPI from '@/api/auth';
import locationAPI from '@/api/location';
import artIllust from '@/assets/images/illustration/art-illust.svg';
import finderIllust from '@/assets/images/illustration/finder-illust.svg';

Vue.use(SimpleVueValidator, { mode: 'conservative' });
const { Validator } = SimpleVueValidator;

require('vue-select-image/dist/vue-select-image.css');

export default {
	name: 'Register',
	components: {
		VueSelectImage,
	},
	data() {
		return {
			registerStep: 1,
			showPass: false,
			showPassConfirm: false,
			dataImages: [
				{
					id: '0',
					src: finderIllust,
					alt: 'Pencari ART',
				},
				{
					id: '1',
					src: artIllust,
					alt: 'ART',
				},
			],
			fetchData: {
				provinces: [],
				cities: [],
				districts: [],
				subDistricts: [],
			},
			form: {
				role: '',
				full_name: '',
				phone_number: '',
				address: '',
				province_id: '',
				city_id: '',
				district_id: '',
				sub_district_id: '',
				username: '',
				password: '',
				confirm_password: '',
			},
		};
	},
	validators: {
		'form.full_name': {
			cache: true,
			debounce: 500,
			validator: (value) => Validator.value(value).required(),
		},
		'form.phone_number': {
			cache: true,
			debounce: 500,
			validator: (value) => Validator.value(value).required().digit().minLength(10),
		},
		'form.address': {
			cache: true,
			debounce: 500,
			validator: (value) => Validator.value(value).required(),
		},
		'form.province_id': {
			cache: true,
			debounce: 500,
			validator: (value) => Validator.value(value).required().digit(),
		},
		'form.city_id': {
			cache: true,
			debounce: 500,
			validator: (value) => Validator.value(value).required().digit(),
		},
		' form.district_id': {
			cache: true,
			debounce: 500,
			validator: (value) => Validator.value(value).required().digit(),
		},
		'form.sub_district_id': {
			cache: true,
			debounce: 500,
			validator: (value) => Validator.value(value).required().digit(),
		},
		'form.username': {
			cache: true,
			debounce: 500,
			validator: (value) => Validator.value(value).required(),
		},
		'form.password': {
			cache: true,
			debounce: 500,
			validator: (value) => Validator.value(value).required().minLength(8),
		},
		'form.confirm_password, form.password': {
			cache: true,
			debounce: 500,
			validator: (confirm, password) => Validator.value(confirm).required().match(password),
		},
	},
	async created() {
		this.getProvinces();
	},
	methods: {
		changeRole(image) {
			this.form.role = image.id;
		},
		confirmRegister() {
			this.$validate()
				.then((success) => {
					if (success) {
						this.$confirm.show(
							'Konfirmasi',
							'Apakah data-data yang anda masukan sudah benar?',
							'Ya, benar',
							'Tidak',
							() => {
								this.register(this.form);
							},
						);
					}
				});
		},
		async register(userData) {
			try {
				this.$loading.hourglass('Loading...');
				const { data } = await authAPI.register(userData);
				this.$notify.success(data.message);
				setTimeout(() => {
					this.$router.push({ name: 'Login' });
				}, 1500);
			} catch (error) {
				const { data } = error.response;
				const firstErrorField = Object.keys(data.errors)[0];
				const firstError = data.errors[firstErrorField];
				this.$notify.failure(firstError[0]);
			} finally {
				this.$loading.remove(1000);
			}
		},
		async getProvinces() {
			try {
				const { data } = await locationAPI.getProvinces();
				const [firstProvinces] = data.serve;
				this.fetchData.provinces = data.serve;
				this.form.province_id = firstProvinces.id;
			} catch (error) {
				const { data } = error.response;
				this.$notify.failure(data.message);
			}
		},
		async getCity() {
			try {
				const { data } = await locationAPI.getCities(this.form.province_id);
				const [firstCity] = data.serve;
				this.fetchData.cities = data.serve;
				this.form.city_id = firstCity.id;
			} catch (error) {
				const { data } = error.response;
				this.$notify.failure(data.message);
			}
		},
		async getDistricts() {
			try {
				const { data } = await locationAPI.getDistricts(this.form.city_id);
				const [firstDistricts] = data.serve;
				this.fetchData.districts = data.serve;
				this.form.district_id = firstDistricts.id;
			} catch (error) {
				const { data } = error.response;
				this.$notify.failure(data.message);
			}
		},
		async getSubDistricts() {
			try {
				const { data } = await locationAPI.getSubDistricts(this.form.district_id);
				const [firstDistricts] = data.serve;
				this.fetchData.subDistricts = data.serve;
				this.form.sub_district_id = firstDistricts.id;
			} catch (error) {
				const { data } = error.response;
				this.$notify.failure(data.message);
			}
		},
	},
};
</script>

<style scoped>
	@import '../../assets/styles/register.css';
</style>
