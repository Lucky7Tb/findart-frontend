import middlewares from '../middlewares';

const routes = [
	// ART Routes
	{
		path: '',
		component: () => import(/* webpackChunkName: "Art-Layout" */ '@/layouts/ArtAppLayout.vue'),
		children: [
			{
				path: '/',
				name: 'ART',
				beforeEnter: middlewares.mustAuthenticated,
				component: () => import(/* webpackChunkName: "Art-Job" */ '@/views/pages/art/job/Job.vue'),
			},
			{
				path: '/detail-job',
				name: 'ART-DetailJob',
				beforeEnter: middlewares.mustAuthenticated,
				component: () => import(/* webpackChunkName: "Art-JobDetail" */ '@/views/pages/art/job/DetailJob.vue'),
			},
			{
				path: '/applied-job',
				name: 'ART-ListAppliedJob',
				beforeEnter: middlewares.mustAuthenticated,
				component: () => import(/* webpackChunkName: "Art-AppliedJob" */ '@/views/pages/art/job/ListApplyJob.vue'),
			},
			{
				path: '/setting',
				name: 'ART-Setting',
				beforeEnter: middlewares.mustAuthenticated,
				component: () => import(/* webpackChunkName: "Art-Setting" */ '@/views/pages/art/settings/Setting.vue'),
			},
		],
	},
	// Finder routes
	{
		path: '/finder',
		component: () => import(/* webpackChunkName: "Finder-Layout" */ '@/layouts/FinderAppLayout.vue'),
		children: [
			{
				path: '/',
				name: 'Finder',
				beforeEnter: middlewares.mustAuthenticated,
				component: () => import(/* webpackChunkName: "Finder-ListJob" */ '@/views/pages/finder/job/Job.vue'),
			},
			{
				path: '/finder/my-art',
				name: 'Finder-MyART',
				beforeEnter: middlewares.mustAuthenticated,
				component: () => import(/* webpackChunkName: "Finder-ListMyArt" */ '@/views/pages/finder/art/MyArt.vue'),
			},
			{
				path: '/finder/setting',
				name: 'Finder-Setting',
				beforeEnter: middlewares.mustAuthenticated,
				component: () => import(/* webpackChunkName: "Finder-Settings" */ '@/views/pages/finder/settings/Setting.vue'),
			},
		],
	},
	// Auth Routes
	{
		path: '/login',
		name: 'Login',
		beforeEnter: middlewares.mustNotAuthenticated,
		component: () => import(/* webpackChunkName: "Auth-Login" */ '@/views/auth/Login.vue'),
	},
	{
		path: '/register',
		name: 'Register',
		beforeEnter: middlewares.mustNotAuthenticated,
		component: () => import(/* webpackChunkName: "Auth-Register" */ '@/views/auth/Register.vue'),
	},
];

export default routes;
