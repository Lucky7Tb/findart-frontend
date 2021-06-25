import http from '../plugins/axios';

export default {
	greeting() {
		return http.get('api/finder');
	},
};
