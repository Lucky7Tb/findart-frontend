import http from '../../plugins/axios';

export default {
	getJob() {
		return http.get('api/finder/job');
	},
	getDetailJob(idJob) {
		return http.get(`api/finder/job/${idJob}`);
	},
	changeJobThumbnail(idJob, data) {
		return http.post(
			`api/finder/job/change-thumbnail/${idJob}`, data,
			{
				headers: {
					'Content-Type': 'application/form-data',
				},
			},
		);
	},
	deleteJob(idJob) {
		return http.delete(`api/finder/job/${idJob}`);
	},
};
