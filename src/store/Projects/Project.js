// import Project from "./Project.js" dedicir se vai ser usado
/* eslint-disable */
import Vue from 'vue'
const SET_PROJECTS = 'SET_PROJECTS'

const state = {
    projects: []
}

const getters = {
    getProjects: state =>{
        return state.projects
    },
    getProjectsLength: state =>{
        return state.projects.length
    }
}

const mutations = {
    [SET_PROJECTS](state, payload){
        // Vue.set(state, projects, payload) - EVENTO PARA GERAR REATIVIDADE MAYBE
        state.projects = payload
    }
}

const actions = {
    loadProjects ({commit}){
        return new Promise((resolve, reject)=>{
            Vue.http.get("projects/", { headers: { "content-type": "application/json" } }).then(response => {
                commit(SET_PROJECTS, response.data)
                resolve()
            },
            error => {
                reject()
            })
        })
    }
}

export default {
    name: 'projects',
    state,
    mutations,
    getters,
    actions
}

