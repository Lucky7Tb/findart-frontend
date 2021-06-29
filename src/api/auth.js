import http from '../plugins/axios';

export default {
	beforeLogin() {
		return http.get('sanctum/csrf-cookie');
	},
	register(data) {
		return http.post('api/auth/register', data, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	},
	login(credentials) {
		return http.post('api/auth/login', credentials, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	},
	logout() {
		return http.post('api/auth/logout');
	},
};
