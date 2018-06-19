<template>
  <div class="col col-md-10 content">
    <div class="container-fluid">
      <header>
        <h2>
          {{ project.name != '' ? project.name : 'Project name' }}
          <br>
          <small class="text-muted h4">
            {{ project.user != '' ? project.user : 'Owner name' }}
          </small>
        </h2>
        <ul class="list-inline">
          <li
            v-for="tag in tags"
            :key="tag.id"
            class="list-inline-item">
            <span class="badge badge-primary btn-blue">
              {{ tag.name }}
            </span>
          </li>
        </ul>
      </header>
      <div class="row">
        <p class="text-justify">
          {{ project.description }}
        </p>
        <div
          v-for="dashboard in dashboards"
          :key="dashboard.id"
          class="card col col-md-6">
          <div class="embed-responsive embed-responsive-16by9">
            <iframe
              :src="dashboard.iframe"
              class="embed-responsive-item"
              frameborder="0"/>
          </div>
          <div class="card-body">
            <h5 class="card-title">
              {{ dashboard.name }}
              <span
                v-if="dashboard.owner == currentUser"
                class="badge badge-secondary h6">
                owner
              </span>
            </h5>
            <p class="card-text">
              {{ dashboard.description }}
            </p>
            <router-link
              :to="{ name: 'DashboardDetail' }"
              class="btn btn-blue btn-sm">
              <span class="fa fa-search"/> Visualizar
            </router-link>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
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
    },
    created () {
        this.getProjectDetail()
        this.getObserv()
        this.getTags()
    },

    methods: {
        showImportCsv (){
            this.$modal.show("import-csv", { project: this.$route.params.id })
        },
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
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
