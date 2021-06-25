import http from '../plugins/axios';

export default {
	getProvinces() {
		return http.get('api/location/provinces');
	},
	getCities(provincesId) {
		return http.get(`api/location/cities?provinceId=${provincesId}`);
	},
	getDistricts(cityId) {
		return http.get(`api/location/districts?cityId=${cityId}`);
	},
	getSubDistricts(districtId) {
		return http.get(`api/location/sub_districts?districtId=${districtId}`);
	},
};
