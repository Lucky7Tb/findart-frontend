import Vue from 'vue';
import { Notify, Confirm, Loading } from 'notiflix';

Notify.init({
	position: 'center-top',
	opacity: 5,
	borderRadius: '10px',
	success: { background: '#00C853' },
	failure: { background: '#FF1744' },
});

Confirm.init({
	titleColor: '#FFAB40',
	messageColor: '#212121',
	backgroundColor: '#fdfdfd',
	okButtonBackground: '#0091EA',
	okButtonColor: '#fdfdfd',
	cancelButtonBackground: '#616161',
	cancelButtonColor: '#fdfdfd',
});

Loading.init({
	svgColor: '#0091EA',
	messageColor: '#fdfdfd',
});

Vue.prototype.$notify = Notify;
Vue.prototype.$loading = Loading;
Vue.prototype.$confirm = Confirm;
