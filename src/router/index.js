/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import CreateUser from '@/components/Users/CreateUser'
import HomePage from '@/components/Users/HomePage'
import LandingPage from '@/components/Utils/LandingPage'
import Login from '@/components/Authentication/Login'
import Register from '@/components/Authentication/Register'
import CreateProject from '@/components/Projects/CreateProject'
import ListProject from '@/components/Projects/ListProject'
import ProjectDetail from '@/components/Projects/ProjectDetail'
import EditUser from '@/components/Users/EditUser'
import DeleteUser from '@/components/Users/DeleteUser'
import ObservatorioDetail from '@/components/Observatorio/ObservatorioDetail'
import EditProject from '@/components/Projects/EditProject'
import createObservatorio from '@/components/Observatorio/createObservatorio'


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
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/projetos',
      name: 'CreateProject',
      component: CreateProject
    },
    {
      path: '/listproject',
      name: 'ListProjects',
      component: ListProject
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: '/project/detail/:id',
      name: 'ProjectDetail',
      component: ProjectDetail
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/edituser',
      name: 'EditUser',
      component: EditUser
    },
    {
      path: '/deleteuser',
      name: 'DeleteUser',
      component: DeleteUser
    },
    {
      path: '/observer-detail',
      name: 'ObservatorioDetail',
      component: ObservatorioDetail
    },
    {
      path: '/edit-project/:id',
      name: 'EditProject',
      component: EditProject
    },
    {
      path: '/create-observatory/:id',
      name: 'createObservatorio',
      component: createObservatorio
    }
  ]
})
