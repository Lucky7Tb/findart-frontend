import Vue from 'vue';
import VueRouter from 'vue-router';
import { Loading } from 'notiflix';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	hash: false,
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((_, __, next) => {
	Loading.hourglass('Loading...');
	next();
});

router.afterEach(() => {
	Loading.remove(1000);
});

export default router;
