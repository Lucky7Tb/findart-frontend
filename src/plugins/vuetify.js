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
				primary: '#0091EA',
				success: '#64FFDA',
				info: '#42A5F5',
				warning: '#FFAB40',
				danger: '#FF1744',
				white: '#fdfdfd',
				black: '#212121',
			},
		},
	},
});
