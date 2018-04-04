import Vue from 'vue'
import Router from 'vue-router'
import CreateUser from '@/components/CreateUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CreateUser',
      component: CreateUser
    },
  ]
})
