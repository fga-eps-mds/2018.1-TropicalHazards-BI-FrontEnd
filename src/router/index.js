import Vue from "vue"
import Router from "vue-router"

// basic
import HomePage from "@/components/Users/HomePage"
import LandingPage from "@/components/Landing/LandingPage"
import EditUser from "@/components/Users/EditUser"
import DeleteUser from "@/components/Users/DeleteUser"
import Auth from "@/components/Auth/Auth"

// project
import ProjectsList from "@/components/Projects/ProjectsList"
import CreateProject from "@/components/Projects/CreateProject"
import ProjectDetail from "@/components/Projects/ProjectDetail"
import EditProject from "@/components/Projects/EditProject"
import MyProjects from "@/components/Projects/MyProjects"

// dashboards
import DashboardsList from "@/components/Dashboards/DashboardsList"
import DashboardDetail from "@/components/Dashboards/DashboardDetail"
import CreateDashboard from "@/components/Dashboards/CreateDashboard"
import EditDashboard from "@/components/Dashboards/EditDashboard"
import MyDashboards from "@/components/Dashboards/MyDashboards"
import DashboardList from "@/components/Dashboards/DashboardList"
// tags
import CreateTag from "@/components/Tags/CreateTag"

// Router guard
import Guard from "@/components/Auth/middleware"

//File
// import ImportCsv from "@/components/Files/ImportCsv"
// import FilterCsv from "@/components/Files/Filter"
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
            path: "/auth",
            name: "Auth",
            component: Auth,
            beforeEnter: Guard.guest
        },
        {
            path: "/home",
            name: "HomePage",
            component: HomePage,
            beforeEnter: Guard.auth,
            children: [
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
                    beforeEnter: Guard.auth
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
                    // beforeEnter: Guard.guest
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
                {
                    path: "/dashboards",
                    name: "DashboardsList",
                    // TODO: fix this
                    component: DashboardDetail,
                    // beforeEnter: Guard.guest
                },
                {
                    path: "/dashboards/detail/:id",
                    name: "DashboardDetail",
                    component: DashboardDetail,
                    // beforeEnter: Guard.guest
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
                    component: DashboardList
                },
                // Query
                {
                    path: "/query",
                    name: "QueryComponent",
                    component: QueryComponent,
                },
                {
                    path: "/question",
                    name: "AskQuestion",
                    component: AskQuestion,
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
