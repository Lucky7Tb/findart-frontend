import http from '../../plugins/axios';

export default {
	getMyArt() {
		return http.get('api/finder/art');
	},
	selectArt(data) {
		return http.post('api/finder/art', data, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	},
};
