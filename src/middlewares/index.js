export default {
	mustAuthenticated(_, __, next) {
		const storage = localStorage.getItem(process.env.VUE_APP_KEY_STORAGE);

		if (storage == null) {
			next({ name: 'Login' });
		} else {
			next();
		}
	},
	mustNotAuthenticated(_, from, next) {
		const storage = localStorage.getItem(process.env.VUE_APP_KEY_STORAGE);

		if (storage !== null) {
			next(from);
		} else {
			next();
		}
	},
	mustArt(_, __, next) {
		let storage = localStorage.getItem(process.env.VUE_APP_KEY_STORAGE);
		storage = JSON.parse(storage);

		if (storage.role !== 'Art') {
			next({ name: 'Finder' });
		} else {
			next();
		}
	},
	mustArtFinder(_, __, next) {
		let storage = localStorage.getItem(process.env.VUE_APP_KEY_STORAGE);
		storage = JSON.parse(storage);

		if (storage.role !== 'Finder') {
			next({ name: 'Art' });
		} else {
			next();
		}
	},
};
