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
				white: '#fdfdfd',
				black: '#1b262c',
				primary: '#006AA8',
				danger: '#fa1e0e',
				warning: '#f0c929',
				info: '#8cc8ff',
			},
		},
	},
});
