<template>
<div class = "ListProject">
    <div id="content" class="col m12" >
    <secondnav></secondnav>
      <div class="grey lighten-4">
        <div class="center-align">
          <h5> <span class="fa fa-line-chart"></span>Estatísticas</h5>
          <div class="row">
            <div class="col s12   ">
              <div class="card ">
                <div class="card-content ">
                  <span class="card-title">{{projects.length}}</span>
                  <p>Projetos ativos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="custom-container">
          <h5>Projetos</h5>
          <div class="row" id="projects">
            <div v-for="project in projects" :key="project.id" class="col s12 m4 l3">
              <div class="card grey lighten-5">
                <div class="card-content grey-text text-darken-2">
                  <span style="font-size:20px" class="card-title">{{ project.name }}</span>
                    <p> Descrição: {{project.description }} </p>
                    <p> IdProjeto: {{project.id }} </p>
                    <p> IdUser: {{project.user }} </p>
                </div>
                <div class="card-action center-align grey-text text-lighten-2">
                <router-link :to="{ name: 'ProjectDetail', params: { id: project.id } }"
                                    class="btn blue lighten-1" >
                    <span class="fa fa-search"></span>
                </router-link>

                <router-link :to="{ name: 'EditProject', params: { id: project.id } }"
                                    class="btn blue lighten-1" >
                    <span class="fa fa-edit"></span>
                </router-link>

                  <!-- <a href="#delete-proj" class="modal-trigger btn red">
                    <span class="fa fa-remove"></span>
                  </a> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
/* eslint-disable */

import ProjectDetail from '@/components/Projects/ProjectDetail'
import SecondNavBar from '@/components/Utils/SecondNavBar'
import {mapGetters} from 'vuex'
import modal from '@/components/Modals/modal.vue'
export default {
  components: {
    ProjectDetail,
    'secondnav': SecondNavBar,
    modal
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  data () {
    return {
      projects: {
        name: '',
        description: ''

      },
      isModalVisible: false,
      projetos: ''

    }
  },

  methods: {
    getProject () {
      this.$http.get('http://localhost:8000/projects/', { headers: { 'content-type': 'application/json' } }).then(result => {
        this.projects = result.data
      },
      error => {
        console.error(error)
      })
    }
  },

  beforeMount () {
    this.getProject()
  }

}
</script>

<style>

::placeholder { /* Most modern browsers support this now. */
   color:    #132a71;
}

</style>
