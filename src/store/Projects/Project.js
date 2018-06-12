// import Project from "./Project.js" dedicir se vai ser usado
/* eslint-disable */
import Vue from 'vue'
const SET_PROJECTS = 'SET_PROJECTS'
const UPDATE_CURRENT_PROJECT = 'UPDATE_CURRENT_PROJECT'

const state = {
    projects: [],
    currentProject: null
}

const getters = {
    getProjects: state =>{
        return state.projects
    },
    getProjectsLength: state =>{
        return state.projects.length
    },
    getCurrentProject: state=>{
        return state.currentProject
    }
}

const mutations = {
    [SET_PROJECTS](state, payload){
        // Vue.set(state, projects, payload) - EVENTO PARA GERAR REATIVIDADE MAYBE
        state.projects = payload
    },
    [UPDATE_CURRENT_PROJECT](state, payload){
        state.currentProject = payload
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
    },
    updateCurrentProject({commit}, projectId){
        return new Promise((resolve, reject)=>{
            Vue.http.get("projects/" + projectId, {headers : {"content-type": "application/json"}}).then(response=>{
                commit(UPDATE_CURRENT_PROJECT, response.data)
                resolve()
            },
            error =>{
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

