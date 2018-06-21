// import Project from "./Project.js" dedicir se vai ser usado
/* eslint-disable */
import Vue from 'vue'
const SET_DASHBOARDS = 'SET_DASHBOARDS'

const state = {
    dashboards: []
}

const getters = {
    getDashboards: state =>{
        return state.dashboards
    },
    getDashboardsLength: state =>{
        return state.dashboards.length
    }
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
                console.log(response.data)
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
            Vue.http.put("dashboard/" + dashboard.id + "/", dashboard, {
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

}

export default {
    name: 'Dashboards',
    state,
    mutations,
    getters,
    actions
}

