module.exports = {
	transpileDependencies: ['vuetify'],
	devServer: {
		proxy: 'http://findart.epizy.com/backend/public',
	},
};
