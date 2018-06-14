// import Project from "./Project.js" dedicir se vai ser usado
/* eslint-disable */
import Vue from 'vue'
const SET_PROJECTS = 'SET_PROJECTS'
const UPDATE_CURRENT_PROJECT = 'UPDATE_CURRENT_PROJECT'
const UPDATE_CURRENT_PROJECT_FIELDS = 'UPDATE_CURRENT_PROJECT_FIELDS'

const state = {
    projects: [],
    currentProject: null,
    currentProjectFields: []
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
    },
    getCurrentProjectFields: state=>{
        return state.currentProjectFields.map(function(field){
            return { text: field.name, value: field.id, type: field.base_type }
        })
    }
}

const mutations = {
    [SET_PROJECTS](state, payload){
        // Vue.set(state, projects, payload) - EVENTO PARA GERAR REATIVIDADE MAYBE
        state.projects = payload
    },
    [UPDATE_CURRENT_PROJECT](state, payload){
        state.currentProject = payload
    },
    [UPDATE_CURRENT_PROJECT_FIELDS](state, payload){
        state.currentProjectFields = payload
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
            Vue.http.get("projects/" + projectId + "/", {headers : {"content-type": "application/json"}}).then(response=>{
                commit(UPDATE_CURRENT_PROJECT, response.data)
                resolve()
            },
            error =>{
                reject()
            })
        })
    },
    loadCurrentProjectFields({commit}, dashboardId){
        return new Promise((resolve, reject)=>{
            Vue.http.get("metabase/" + dashboardId + "/fields", { headers: { "Authorization": localStorage.token}}).then(response=>{
                commit(UPDATE_CURRENT_PROJECT_FIELDS, response.data.fields)
                resolve()
            },
            error=>{
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

