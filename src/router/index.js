import Vue from 'vue'
import Router from 'vue-router'
import CreateUser from '@/components/Users/CreateUser'
import Homepage from '@/components/Utils/Homepage'
import Login from '@/components/Login/Login'
import CreateProject from '@/components/Projects/CreateProject'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/signup',
      name: 'CreateUser',
      component: CreateUser
    },
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/projetos',
      name: 'CreateProject',
      component: CreateProject
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }

  ]
})
