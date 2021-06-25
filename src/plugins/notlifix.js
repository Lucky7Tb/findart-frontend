import Vue from 'vue';
import { Notify, Confirm, Loading } from 'notiflix';

Vue.prototype.$notify = Notify;
Vue.prototype.$loading = Loading;
Vue.prototype.$confirm = Confirm;
