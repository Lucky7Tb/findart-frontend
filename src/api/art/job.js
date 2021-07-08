import http from '../../plugins/axios';

export default {
	getListJobVacancy(url, provinceId, cityId) {
		if (url) {
			return http.get(`${url}&province_id=${provinceId}&city_id=${cityId}`);
		}
		return http.get(`api/art/job?province_id=${provinceId}&city_id=${cityId}`);
	},
	getDetailJob(jobId) {
		return http.get(`api/art/job/${jobId}`);
	},
	getAppliedJob(status) {
		return http.get(`api/art/job/applied-job?apply_status=${status}`);
	},
	applyJob(jobId) {
		return http.post(`api/art/job/apply-job/${jobId}`);
	},
	cancelApplyJob(id) {
		return http.post(`api/art/job/cancel-apply-job/${id}`);
	},
};
