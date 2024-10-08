import middlewares from '../middlewares';

const routes = [
	// ART Routes
	{
		path: '',
		beforeEnter: middlewares.mustAuthenticated,
		component: () => import(/* webpackChunkName: 'Art-Layout' */ '@/layouts/art/ArtAppLayout.vue'),
		children: [
			{
				path: '/',
				name: 'Art',
				beforeEnter: middlewares.mustArt,
				component: () => import(/* webpackChunkName: 'Art-Job' */ '@/views/pages/art/job/Job.vue'),
			},
			{
				path: '/detail-job/:id',
				name: 'Art-DetailJob',
				beforeEnter: middlewares.mustArt,
				component: () => import(/* webpackChunkName: 'Art-DetailJob' */ '@/views/pages/art/job/DetailJob.vue'),
			},
			{
				path: '/applied-job',
				name: 'Art-ListAppliedJob',
				beforeEnter: middlewares.mustArt,
				component: () => import(/* webpackChunkName: 'Art-AppliedJob' */ '@/views/pages/art/job/ListAppliedJob.vue'),
			},
			{
				path: '/setting',
				name: 'Art-Setting',
				beforeEnter: middlewares.mustArt,
				component: () => import(/* webpackChunkName: 'Art-Setting' */ '@/views/pages/art/settings/Setting.vue'),
			},
		],
	},
	// Finder routes
	{
		path: '/finder',
		beforeEnter: middlewares.mustAuthenticated,
		component: () => import(/* webpackChunkName: 'Finder-Layout' */ '@/layouts/finder/FinderAppLayout.vue'),
		children: [
			{
				path: '/',
				name: 'Finder',
				beforeEnter: middlewares.mustArtFinder,
				component: () => import(/* webpackChunkName: 'Finder-ListJob' */ '@/views/pages/finder/job/Job.vue'),
			},
			{
				path: '/finder/create-job',
				name: 'Finder-CreateJob',
				beforeEnter: middlewares.mustArtFinder,
				component: () => import(/* webpackChunkName: 'Finder-CreateJob' */ '@/views/pages/finder/job/CreateJob.vue'),
			},
			{
				path: '/finder/update-job/:id',
				name: 'Finder-UpdateJob',
				beforeEnter: middlewares.mustArtFinder,
				component: () => import(/* webpackChunkName: 'Finder-UpdateJob' */ '@/views/pages/finder/job/UpdateJob.vue'),
			},
			{
				path: '/finder/interest-art/:id',
				name: 'Finder-InterestedArt',
				beforeEnter: middlewares.mustArtFinder,
				component: () => import(/* webpackChunkName: 'Finder-InterestedArt' */ '@/views/pages/finder/job/InterestedArt.vue'),
			},
			{
				path: '/finder/my-art',
				name: 'Finder-MyArt',
				beforeEnter: middlewares.mustArtFinder,
				component: () => import(/* webpackChunkName: 'Finder-ListMyArt' */ '@/views/pages/finder/art/MyArt.vue'),
			},
			{
				path: '/finder/setting',
				name: 'Finder-Setting',
				beforeEnter: middlewares.mustArtFinder,
				component: () => import(/* webpackChunkName: 'Finder-Settings' */ '@/views/pages/finder/settings/Setting.vue'),
			},
		],
	},
	// Auth Routes
	{
		path: '/login',
		name: 'Login',
		beforeEnter: middlewares.mustNotAuthenticated,
		component: () => import(/* webpackChunkName: 'Auth-Login' */ '@/views/auth/Login.vue'),
	},
	{
		path: '/register',
		name: 'Register',
		beforeEnter: middlewares.mustNotAuthenticated,
		component: () => import(/* webpackChunkName: 'Auth-Register' */ '@/views/auth/Register.vue'),
	},
	{
		path: '/:catchAll(.*)',
		name: 'Error-404',
		component: () => import(/* webpackChunkName: '404' */ '@/views/404.vue'),
	},
];

export default routes;
