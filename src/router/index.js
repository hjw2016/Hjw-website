import Vue from 'vue'
import Resource from 'vue-resource'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Resource)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})
