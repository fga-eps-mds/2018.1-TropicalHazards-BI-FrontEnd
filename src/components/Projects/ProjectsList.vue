<template>
  <div class = "ListProject">
    <div
      id="content"
      class="col m12" >
      <secondnav/>
      <div class="grey lighten-4">
        <div class="center-align">
          <h5> <span class="fa fa-line-chart">Estatísticas</span></h5>
          <div class="row">
            <div class="col s12   ">
              <div class="card ">
                <div class="card-content ">
                  <span class="card-title">{{ projects.length }}</span>
                  <p>Projetos ativos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="custom-container">
        <h5>Projetos</h5>
        <div
          id="projects"
          class="row">
          <div
            v-for="project in projects"
            :key="project.id"
            class="col s12 m4 l3">
            <div class="card grey lighten-5">
              <div class="truncate card-content grey-text text-darken-2">
                <span
                  style="font-size:20px"
                  class="card-title">{{ project.name }}</span>
                <p> Descrição: {{ project.description }} </p>
                <p> IdProjeto: {{ project.id }} </p>
                <p> IdUser: {{ project.user }} </p>
              </div>
              <div class="card-action center-align grey-text text-lighten-2">
                <router-link
                  :to="{ name: 'ProjectDetail', params: { id: project.id } }"
                  class="btn blue lighten-1" >
                  <span class="fa fa-search"/>
                </router-link>

                <router-link
                  :to="{ name: 'EditProject', params: { id: project.id } }"
                  class="btn blue lighten-1" >
                  <span class="fa fa-edit"/>
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
import ProjectDetail from "@/components/Projects/ProjectDetail"
import SecondNavBar from "@/components/Utils/SecondNavBar"
import {mapGetters} from "vuex"
import modalLogin from "@/components/Modals/modalLogin.vue"
export default {
    components: {
        ProjectDetail,
        "secondnav": SecondNavBar,
        "modal": modalLogin
    },
    data () {
        return {
            projects: {
                name: "",
                description: ""
            },
            isModalVisible: false,
            projetos: ""
        }
    },
    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },
    beforeMount () {
        this.getProject()
    },
    methods: {
        getProject () {
            this.$http.get("projects/", { headers: { "content-type": "application/json" } }).then(result => {
                this.projects = result.data
            },
            error => {
                error.log(error)
            })
        }
    },
}
</script>

<style>
::placeholder { /* Most modern browsers support this now. */
   color:    #132a71;
}
</style>
