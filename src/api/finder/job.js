import http from '../../plugins/axios';

export default {
	getJob(url) {
		return http.get(url);
	},
	getDetailJob(idJob) {
		return http.get(`api/finder/job/${idJob}`);
	},
	getInterestedArt(idJob) {
		return http.get(`api/finder/job/interested-art/${idJob}`);
	},
	createJob(data) {
		return http.post('api/finder/job/create-job', data, {
			headers: {
				'Content-Type': 'application/form-data',
			},
		});
	},
	updateJob(idJob, data) {
		return http.post(`api/finder/job/update-job/${idJob}`, data, {
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
		return http.post(`api/finder/job/delete-job/${idJob}`);
	},
};
