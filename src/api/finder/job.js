import http from '../../plugins/axios';

export default {
	getJob(url) {
		return http.get(url);
	},
	getDetailJob(idJob) {
		return http.get(`api/finder/job/${idJob}`);
	},
	createJob(data) {
		return http.post('api/finder/job', data, {
			headers: {
				'Content-Type': 'application/form-data',
			},
		});
	},
	updateJob(idJob, data) {
		return http.put(`api/finder/job/${idJob}`, data, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
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
