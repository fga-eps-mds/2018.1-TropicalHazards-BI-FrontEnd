/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/Users/HomePage'
import LandingPage from '@/components/Utils/LandingPage'
import CreateProject from '@/components/Projects/CreateProject'
import CreateTag from '@/components/Projects/CreateTag'
import ListProject from '@/components/Projects/ListProject'
import ProjectDetail from '@/components/Projects/ProjectDetail'
import EditUser from '@/components/Users/EditUser'
import DeleteUser from '@/components/Users/DeleteUser'
import ObservatorioDetail from '@/components/Observatorio/ObservatorioDetail'
import EditProject from '@/components/Projects/EditProject'
import createObservatorio from '@/components/Observatorio/createObservatorio'
import editObservatorio from '@/components/Observatorio/editObservatorio'


Vue.use(Router)

export default new Router({
  routes: [
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
      path: '/tags',
      name: 'CreateTag',
      component: CreateTag
    },
    {
      path: '/listproject',
      name: 'ListProjects',
      component: ListProject
    },
    {
      path: '/project/detail/:id',
      name: 'ProjectDetail',
      component: ProjectDetail
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
      path: '/observer-detail/:id',
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
    },
    {
      path: '/edit-observatory/:id',
      name: 'editObservatorio',
      component: editObservatorio
    }
  ]
})
