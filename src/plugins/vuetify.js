import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
	icons: {
		iconfont: 'mdi',
	},
	theme: {
		themes: {
			light: {
				primary: '#006AA8',
				success: '#1DE9B6',
				info: '#8cc8ff',
				warning: '#f0c929',
				danger: '#fa1e0e',
				white: '#fdfdfd',
				black: '#1b262c',
			},
		},
	},
});
