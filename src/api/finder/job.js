import http from '../../plugins/axios';

export default {
	getJob() {
		return http.get('api/finder/job');
	},
};
