<template>

  <div id="app">
    <div class="row grey lighten-4">
      <sidebar/>
      <div
        id="content"
        class="col m11">
        <div class="header center-align grey lighten-4">
          <h3>
            {{ project.name }}
          </h3>
        </div>
        <div class="grey lighten-4">
          <div class="custom-container">
            <h5>Estatísticas do projeto</h5>
            <div class="row">
              <div class="col s12 m4">
                <div class="card">
                  <div class="card-content">
                    <span class="card-title">Descrição</span>
                    <p>
                      <span class="fa fa-line-chart">{{ project.description }}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="col s12 m4">
                <div class="card">
                  <div class="card-content">
                    <span class="card-title">6</span>
                    <p>
                      <span class="fa fa-line-chart">Observatórios</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="col s12 m4">
                <div class="card">
                  <div class="card-content">
                    <span class="card-title">14</span>
                    <p>
                      <span class="fa fa-users">Contribuidores</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="custom-container">
            <h5>
              Observatórios neste projeto:
            </h5>
            <router-link
              v-if="currentUser.id == project.user"
              :to="{ name: 'createObservatorio', params: { id: project.id } }"
              class="btn blue lighten-1" >
              Novo observatório
              <span class="fa fa-plus"/>
            </router-link>
            <router-link
              v-if="currentUser.id == project.user"
              :to="{ name: 'EditProject', params: { id: project.id } }"
              class="btn green lighten-1" >
              Editar Projeto
              <span class="fa fa-plus"/>
            </router-link>
            <a
              v-if="currentUser.id == project.user"
              :to="{ name: 'HomePage'} "
              class="btn-flat red lighten-1 grey-text text-lighten-2"
              v-on:
              @click="deleteProject()">
              Deletar Projeto
              <span class="fa fa-trash"/>
            </a>
            <br>
            <br>
            <div
              id="detail"
              class="row">
              <div

                v-for="dashboard in dashboards"
                :key="dashboard.id"
                class=" col s12 m4 l3">
                <div class="truncate card grey lighten-5">
                  <div class="card-content grey-text text-darken-2">
                    <span class="card-title">{{ dashboard.name }}</span>
                    <p>
                      projeto relacionado: {{ dashboard.project }}
                    </p>
                    <small>Criado por: {{ project.user }}</small>
                    <small>Id dashboard: {{ dashboard.id }}</small>
                  </div>
                  <div class="card-action center-align grey-text text-lighten-2">
                    <router-link
                      :to="{name: 'ObservatorioDetail', params: {id: dashboard.id} }"
                      href="#/observer-detail"
                      class="btn  blue lighten-1">
                      <span class="fa fa-search"/>
                    </router-link>
                    <router-link
                      v-if="currentUser.id == project.user"
                      :to="{ name: 'editObservatorio', params: { id: dashboard.id } }"
                      class="btn blue">
                      <span class="fa fa-edit"/>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/Utils/SideBar"
import {mapGetters} from "vuex"

export default {
    components: {
        "sidebar": SideBar,
    },

    data () {
        return {
            project: {
                id: "",
                user: "",
                name: "",
                description: "",
            },
            user: {
                name: "",
                id: "",
                email: ""
            },
            dashboards:{
                id: "",
                name: "",
                project: ""
            },
        }
    },
    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },

    beforeMount () {
        this.loadUserInfo()
        this.testToken()
        this.modalScript()
    },
    created () {
        this.getProjectDetail()
        this.getObserv()
        this.getTags()
    },

    methods: {
        loadUserInfo () {
            this.user.id = this.currentUser.id
            this.user.username = this.currentUser.name
            this.user.email = this.currentUser.email
        },
        getProjectDetail () {
            this.$http.get("projects/" + this.$route.params.id + "/", { headers: { "Authorization": "JWT " + localStorage.token } }).then(result => {
                this.project = result.data
            },
            error => {
                error.log(error)
            })
        },
        deleteProject (){
            if (window.confirm("Deseja realmente deletar o projeto ?")){
                this.$http.delete("projects/" + this.$route.params.id + "/", { headers: { "Authorization": "JWT " + localStorage.token } }).then(result => {
                    window.alert("Projeto deletado")
                    this.$router.replace("/home")
                    this.project = result.data
                },
                error => {
                    window.alert("Erro ao deletar o projeto")
                    error.log(error)
                })
            }
        },
        getProject () {
            this.$http.get("projects/", { headers:
                    { "content-type": "application/json" } }).then(result => {
                this.project = result.data
            },
            error => {
                error.log(error)
            })
        },
        getTags () {
            this.$http.get("tags/", { headers:
                    {"content-type": "application/json" } }).then(result => {
                this.tags = result.data
            },
            error => {
                error.log(error)

            })
        },
        getObserv () {
            this.$http.get("dashboards/", { headers:
                    { "content-type": "application/json" } }).then(result => {
                this.dashboards = result.data
            },
            error => {
                error.log(error)
            })
        },
        testToken () {
            this.$http.post("obtain-token/", {"username": this.user.username, "password": this.user.password}).then(result => {
                localStorage.token = result.data.token
            })
        },
        modalScript () {
            (document).ready(function () {
                (".modal").modal()
            });

            (document).ready(function () {
                ("select").formSelect()
            })
        }
    }

}
</script>

<style>

::placeholder { /* Most modern browsers support this now. */
  color:    #132a71;
}

</style>
