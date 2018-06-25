// import Project from "./Project.js" dedicir se vai ser usado
/* eslint-disable */
import Vue from 'vue'
const SET_DASHBOARDS = 'SET_DASHBOARDS'

const state = {
    dashboards: []
}

const getters = {
    getDashboards: (state) => (searchArgument) =>{
        return state.dashboards.filter(dashboard => {
            return dashboard.name.toLowerCase().includes(searchArgument.toLowerCase())
        })
    },
    getDashboardsLength: state =>{
        return state.dashboards.length
    },
    getMyDashboards: (state) => (id) =>{
        return state.dashboards.filter(dashboard =>{
            return dashboard.user === id
        })
    },
    getDashboardById: (state) => (id) => {
        return state.dashboards.find(dashboard => dashboard.id === id)
    },
}

const mutations = {
    [SET_DASHBOARDS](state, payload){
        // Vue.set(state, projects, payload) - EVENTO PARA GERAR REATIVIDADE MAYBE
        state.dashboards = payload
    }
}

const actions = {
    loadDashboards ({commit}){
        return new Promise((resolve, reject)=>{
            Vue.http.get("dashboards/", { headers: { "Content-type": "application/json" } }).then(response => {
                commit(SET_DASHBOARDS, response.data)
                resolve()
            },
            error => {
                reject()
            })
        })
    },
    createDashboard({commit}, dashboard){
        return new Promise((resolve, reject) => {
            Vue.http.post("dashboards/", dashboard, {
                headers: {
                    "Authorization": "JWT " + localStorage.token,
                    "content-type": "application/json",
                }
            }
            ).then(result => {
                resolve("Dashboard criado com sucesso")
            },
            error => {
                reject(error.data)
            })
        })
    },
    editDashboard({ commit }, dashboard) {
        return new Promise((resolve, reject) => {
            Vue.http.put("dashboards/" + dashboard.id + "/", dashboard, {
                headers: {
                    "Authorization": "JWT " + localStorage.token,
                    "content-type": "application/json",
                }
            }
            ).then(result => {
                resolve("Dashboard editado com sucesso")
            },
            error => {
                reject(error.data)
            })

        })
    },
    loadDashboard({ commit }, dashboardId) {
        return new Promise((resolve, reject) => {
            Vue.http.get("dashboards/" + dashboardId + "/", { headers: { "Content-type": "application/json" } }).then(response => {
                resolve(response.data)
            },
            error => {
                reject()
            })
        })
    },
    getIframes({ commit }, dashboardId){
        return new Promise((resolve, reject) => {
            Vue.http.get("metabase/" + dashboardId, { headers:
                {
                    "Content-type": "application/json",
                    "Authorization": localStorage.token
                } }).then(response => {
                resolve(response.data)
            },
            error => {
                reject()
            })
        })
    }
}

export default {
    name: 'Dashboards',
    state,
    mutations,
    getters,
    actions
}

