import axios from 'axios';

const http = axios.create({
	baseURL: process.env.VUE_APP_API_ENDPOINTS,
	post: {
		Accept: 'application/json',
	},
	withCredentials: true,
});

http.interceptors.request.use(
	(config) => {
		const configHeader = config;

		let storage = localStorage.getItem(process.env.VUE_APP_KEY_STORAGE);
		if (storage) {
			storage = JSON.parse(storage);
			configHeader.headers.Authorization = `Bearer ${storage.AccessToken}`;
		}

		return config;
	},
	(error) => Promise.reject(error),
);

export default http;
