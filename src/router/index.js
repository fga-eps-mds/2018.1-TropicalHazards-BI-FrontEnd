import Vue from "vue"
import Router from "vue-router"

// basic
import HomePage from "@/components/Users/HomePage"
import HomePageDefault from "@/components/Users/HomePageDefault"
import LandingPage from "@/components/Landing/LandingPage"
import EditUser from "@/components/Users/EditUser"
import DeleteUser from "@/components/Users/DeleteUser"
import Auth from "@/components/Auth/Auth"
import RegisterForm from "@/components/Auth/RegisterForm"

// project
import ProjectsList from "@/components/Projects/ProjectsList"
import CreateProject from "@/components/Projects/CreateProject"
import ProjectDetail from "@/components/Projects/ProjectDetail"
import EditProject from "@/components/Projects/EditProject"
import MyProjects from "@/components/Projects/MyProjects"

// dashboards
import DashboardDetail from "@/components/Dashboards/DashboardDetail"
import CreateDashboard from "@/components/Dashboards/CreateDashboard"
import EditDashboard from "@/components/Dashboards/EditDashboard"
import MyDashboards from "@/components/Dashboards/MyDashboards"
import DashboardList from "@/components/Dashboards/DashboardList"

// tags
import CreateTag from "@/components/Tags/CreateTag"

import Guard from "@/components/Auth/middleware"

//File
import ContainerImport from "@/components/Files/ContainerImport"

// Query
import QueryComponent from "@/components/Questions/QueryComponent"
import AskQuestion from "@/components/Questions/AskQuestion"

Vue.use(Router)

export default new Router({
    routes: [
        // basic
        {
            path: "/",
            name: "LandingPage",
            component: LandingPage
        },
        {
            path: "/",
            name: "RegisterForm",
            component: RegisterForm,
            beforeEnter: Guard.guest
        },
        {
            path: "/auth",
            name: "Auth",
            component: Auth,
            beforeEnter: Guard.guest
        },
        {
            path: "/home",
            name: "HomePage",
            component: HomePage,
            children: [
                {
                    path: "/",
                    name: "HomePage",
                    component: HomePageDefault,
                },
                {
                    path: "/user/edit",
                    name: "EditUser",
                    component: EditUser,
                    beforeEnter: Guard.auth
                },
                {
                    path: "/user/purge",
                    name: "DeleteUser",
                    component: DeleteUser,
                    beforeEnter: Guard.auth
                },
                // Projects
                {
                    path: "/projects",
                    name: "ProjectsList",
                    component: ProjectsList,
                },
                {
                    path: "/my-projects",
                    name: "MyProjects",
                    component: MyProjects,
                    beforeEnter: Guard.auth
                },
                {
                    path: "/projects/detail/:id",
                    name: "ProjectDetail",
                    component: ProjectDetail,
                },
                {
                    path: "/projects/edit/:id",
                    name: "EditProject",
                    component: EditProject,
                    BeforeEnter: Guard.auth
                },
                {
                    path: "/projects/new",
                    name: "CreateProject",
                    component: CreateProject
                },
                // tags
                {
                    path: "/tags/new",
                    name: "CreateTag",
                    component: CreateTag,
                    beforeEnter: Guard.auth
                },
                // dashboards
                // {
                //     path: "/dashboards",
                //     name: "DashboardsList",
                //     component: DashboardList,
                // },
                {
                    path: "/dashboards/detail/:id",
                    name: "DashboardDetail",
                    component: DashboardDetail,
                },
                {
                    path: "/dashboards/new",
                    name: "CreateDashboard",
                    component: CreateDashboard,
                    beforeEnter: Guard.auth,
                    props: true
                },
                {
                    path: "/dashboards/edit/",
                    name: "EditDashboard",
                    component: EditDashboard,
                    beforeEnter: Guard.auth,
                    props: true
                },
                {
                    path: "/my-dashboards",
                    name: "MyDashboards",
                    component: MyDashboards,
                    beforeEnter: Guard.auth
                },
                {
                    path: "/dashboards",
                    name: "DashboardList",
                    component: DashboardList,
                    props: true
                },
                // Query
                {
                    path: "/query",
                    name: "QueryComponent",
                    component: QueryComponent,
                    beforeEnter: Guard.auth,
                    props: true
                },
                {
                    path: "/question",
                    name: "AskQuestion",
                    component: AskQuestion,
                    beforeEnter: Guard.auth,
                    props: true
                },
                // {
                //     path: "/import",
                //     name: "ContainerImport",
                //     component: ImportCsv,
                //     props: true
                // },
                {
                    path: "/import",
                    name: "ContainerImport",
                    component: ContainerImport,
                    beforeEnter: Guard.auth,
                    props: true
                },
                // {
                //     path: "/import/filter",
                //     name: "FilterCsv",
                //     component: FilterCsv,
                //     props: true
                // }
            ]
        }
    ]
})
