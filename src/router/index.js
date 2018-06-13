import Vue from "vue"
import Router from "vue-router"

// basic
import HomePage from "@/components/Users/HomePage"
import LandingPage from "@/components/Landing/LandingPage"
import CreateProject from "@/components/Projects/CreateProject"
import EditUser from "@/components/Users/EditUser"
import DeleteUser from "@/components/Users/DeleteUser"
import Auth from "@/components/Auth/Auth"

// project
import ListProject from "@/components/Projects/ListProject"
import ProjectDetail from "@/components/Projects/ProjectDetail"
import EditProject from "@/components/Projects/EditProject"

// dashboards
import DashboardDetail from "@/components/Dashboards/DashboardDetail"
import createDashboard from "@/components/Dashboards/createDashboard"
import editDashboard from "@/components/Dashboards/editDashboard"

// tags
import CreateTag from "@/components/Projects/CreateTag"
import Guard from "@/components/Auth/middleware"

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
            beforeEnter: Guard.auth
        },
        {
            path: "/user/edit",
            name: "EditUser",
            component: EditUser
        },
        {
            path: "/user/purge",
            name: "DeleteUser",
            component: DeleteUser
        },
        // Projects
        {
            path: "/projects",
            name: "CreateProject",
            component: CreateProject
        },
        {
            path: "/my-projects",
            name: "ListProjects",
            component: ListProject
        },
        {
            path: "/projects/detail/:id",
            name: "ProjectDetail",
            component: ProjectDetail
        },
        {
            path: "/projects/edit/:id",
            name: "EditProject",
            component: EditProject
        },
        // tags
        {
            path: "/tags/new",
            name: "CreateTag",
            component: CreateTag
        },
        // dashboards
        {
            path: "/dashboards",
            name: "Dashboards",
            // TODO: fix this
            component: DashboardDetail
        },
        {
            path: "/dashboards/detail/:id",
            name: "DashboardDetail",
            component: DashboardDetail
        },
        {
            path: "/dashboards/new/:id",
            name: "createDashboard",
            component: createDashboard
        },
        {
            path: "/dashboards/edit/:id",
            name: "editDashboard",
            component: editDashboard
        }
    ]
})
