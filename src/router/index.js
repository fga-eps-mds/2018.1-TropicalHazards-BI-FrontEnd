import Vue from 'vue'
import Router from 'vue-router'
import CreateUser from '@/components/Users/CreateUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'CreateUser',
      component: CreateUser
    }
  ]
})
