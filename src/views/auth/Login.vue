<template>
	<v-app id="login-body">
		<v-container>
			<v-card
				outlined
				elevation="10"
				width="900"
				height="500"
				class="mx-auto my-auto rounded-xl mt-5"
			>
				<v-row
					no-gutters
				>
					<v-col class="px-5 py-5 d-none d-sm-flex">
						<v-img
							contain
							lazy-src="@/assets/images/illustration/login-illust.svg"
							width="400px"
							height="450px"
							src="@/assets/images/illustration/login-illust.svg"
							class="d-none d-sm-flex mx-auto"
						></v-img>
					</v-col>
					<v-col class="px-4 py-4 mt-5">
						<h1 class="text-center black--text">Masuk</h1>
						<v-row>
							<v-col
								cols="12"
							>
								<v-form class="mt-5" lazy-validation @submit.prevent="login">
									<v-container>
										<v-text-field
											outlined
											clearable
											autofocus
											tabindex="1"
											color="primary"
											label="Username"
											placeholder="Username anda"
											hint="e.g Jhondoe123"
											prepend-inner-icon="mdi-account"
											class="rounded-lg"
											v-model="form.username"
											:error-messages="validation.firstError('form.username')"
										>
										</v-text-field>
										<v-text-field
											outlined
											tabindex="2"
											color="primary"
											label="Password"
											class="rounded-lg"
											autocomplete="false"
											placeholder="Password anda"
											prepend-inner-icon="mdi-lock"
											:append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
											:type="showPass ? 'text' : 'password'"
											@click:append="showPass = !showPass"
											v-model="form.password"
											:error-messages="validation.firstError('form.password')"
										></v-text-field>
										<v-btn
											large
											block
											raised
											type="submit"
											elevation="5"
											color="primary"
											:ripple="{ center: true }"
										>
											Masuk
										</v-btn>
									</v-container>
								</v-form>
								<p class="text-center font-weight-regular mt-3">
									Belum punya akun?
									<router-link
										to="/register"
										class="font-weight-bold text-decoration-none primary--text"
									>
										Daftar
									</router-link>
								</p>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-card>
		</v-container>
	</v-app>
</template>

<script>
import Vue from 'vue';
import authAPI from '@/api/auth';
import SimpleVueValidator from 'simple-vue-validator';

Vue.use(SimpleVueValidator, { mode: 'conservative' });
const { Validator } = SimpleVueValidator;

export default {
	data() {
		return {
			showPass: false,
			form: {
				username: '',
				password: '',
			},
		};
	},
	validators: {
		'form.username': {
			cache: true,
			debounce: 500,
			validator: (value) => Validator.value(value).required(),
		},
		'form.password': {
			cache: true,
			debounce: 500,
			validator: (value) => Validator.value(value).required(),
		},
	},
	methods: {
		login() {
			this.$validate().then(async (success) => {
				if (success) {
					try {
						this.$loading.hourglass('Loading...');

						await authAPI.beforeLogin();

						const { data } = await authAPI.login(this.form);
						this.$notify.success(data.message);
						localStorage.setItem(process.env.VUE_APP_KEY_STORAGE, JSON.stringify(data.serve));

						setTimeout(() => this.$router.push({ name: data.serve.role }), 1500);
					} catch (error) {
						const { data, status } = error.response;

						if (status === 401) {
							this.$notify.failure(data.message);
						} else {
							const firstErrorField = Object.keys(data.errors)[0];
							const firstError = data.errors[firstErrorField];
							this.$notify.failure(firstError[0]);
						}
					} finally {
						this.$loading.remove(1000);
					}
				}
			});
		},
	},
};
</script>

<style scoped>
	@import '../../assets/styles/login.css';
</style>
