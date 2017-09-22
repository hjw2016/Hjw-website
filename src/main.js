// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
// import router from './router'
import Resource from 'vue-resource'
import iView from 'iview';
import 'iview/dist/styles/iview.css'
// import requirejs from './js/require'
import {MenuRoute} from './js/menu'

Vue.use(Resource)
Vue.use(Router)
Vue.use(iView);
Vue.config.productionTip = false

/* eslint-disable no-new */
MenuRoute( data => {
	var toComponent=function(v){
		v.component = require('./views/'+v.component+'.vue');
	}
	
	data=data.filter( v => {
		return v.component && v.component !="";
	});
	data.forEach(v => {
		toComponent(v);
	});

	var router = new Router({
		mode:'history',
		routes: data
	});

	new Vue({
	  el: '#app',
	  router,
	  template: '<App/>',
	  components: { App }
	})
})

