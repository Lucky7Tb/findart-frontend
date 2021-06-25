export default {
	mustAuthenticated(_, __, next) {
		const storage = localStorage.getItem(process.env.VUE_APP_KEY_STORAGE);

		if (storage == null) {
			next({ name: 'Login' });
		}

		next();
	},
	mustNotAuthenticated(_, from, next) {
		const storage = localStorage.getItem(process.env.VUE_APP_KEY_STORAGE);

		if (storage !== null) {
			next(from);
		}

		next();
	},
};
