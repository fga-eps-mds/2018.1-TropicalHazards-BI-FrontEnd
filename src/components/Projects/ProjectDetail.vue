<template>
  <div class="col col-md-10 content">
    <div class="container-fluid">
      <div v-if="showError">
        <header>
          <h2> Detalhes do Projeto </h2>
        </header>
        <b-jumbotron
          bg-variant="muted"
          class="text-muted">
          <template
            slot="header">
            Oooops
          </template>
          <template
            slot="lead">
            O projeto que você está tentando acessar não existe...
          </template>
          <p>
            Não se preocupe, você ainda pode criar um projeto e começar sua
            jornada conosco!
          </p>
          <router-link
            :to="{ name: 'CreateProject' }"
            class="btn btn-blue ml-auto">
            <span class="fa fa-plus"/> Novo projeto
          </router-link>
        </b-jumbotron>
      </div>
      <section v-else>
        <header>
          <h2>
            {{ project.name != '' ? project.name : 'Project name' }}
            <br>
            <small class="text-muted h4">
              {{ project.user != '' ? owner : 'Owner name' }}
            </small>
          </h2>
          <p class="text-justify">
            {{ project.description }}
          </p>
          <ul class="list-inline">
            <li
              v-for="tag in project.tags"
              :key="tag.id"
              class="list-inline-item">
              <span class="badge badge-primary btn-blue">
                {{ tag.name }}
              </span>
            </li>
          </ul>
        </header>
        <div class="row">
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
      </section>
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
            owner: "",
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
            showError: false
        }
    },
    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },

    mounted () {
        this.$store.dispatch("loadProjects")
        this.project = this.$store.getters.getProjectById(parseInt(this.$route.params.id))
        if(this.project === undefined){
            this.showError = true
        }else{
            this.$store.dispatch("getProjectOwner", this.project.user).then(response=>{
                this.owner = response
            })
        }
    },
    created () {
        this.getObserv()
        this.getTags()
    },

    methods: {
        showImportCsv (){
            this.$modal.show("import-csv", { project: this.$route.params.id })
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

::placeholder { /* Most modern browsers support this now. */
  color:    #132a71;
}

</style>
