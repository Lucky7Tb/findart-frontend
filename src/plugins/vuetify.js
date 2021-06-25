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
				secondary: '#dbe2ef',
				accent: '#008DE2',
				error: '#fa1e0e',
				white: '#fdfdfd',
				black: '#1b262c',
				warning: '#f0c929',
				info: '#8cc8ff',
			},
		},
	},
});
