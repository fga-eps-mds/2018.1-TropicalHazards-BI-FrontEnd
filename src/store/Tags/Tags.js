// import Project from "./Project.js" dedicir se vai ser usado
/* eslint-disable */
import Vue from 'vue'
const SET_TAGS = 'SET_TAGS'

const state = {
    tags: []
}

const getters = {
    getTags: state =>{
        return state.tags
    },
    getTagsLength: state =>{
        return state.tags.length
    }
}

const mutations = {
    [SET_TAGS](state, payload){
        // Vue.set(state, projects, payload) - EVENTO PARA GERAR REATIVIDADE MAYBE
        state.tags = payload
    }
}

const actions = {
    loadTags ({commit}){
        return new Promise((resolve, reject)=>{
            Vue.http.get("tags/", { headers: { "Content-type": "application/json" } }).then(response => {
                commit(SET_TAGS, response.data)
                resolve()
            },
            error => {
                reject()
            })
        })
    }
}

export default {
    name: 'Tags',
    state,
    mutations,
    getters,
    actions
}

