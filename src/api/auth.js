import http from '../plugins/axios';

export default {
	beforeLogin() {
		return http.get('sanctum/csrf-cookie');
	},
	register(data) {
		return http.post('api/auth/register', data);
	},
	login(credentials) {
		return http.post('api/auth/login', credentials);
	},
	logout() {
		return http.post('api/auth/logout');
	},
};
