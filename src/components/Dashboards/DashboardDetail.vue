<template>
  <div class="container-fluid">
    <div v-if="showError">
      <header>
        <h2> Detalhes do Dashboard </h2>
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
          O Dashboard que você está tentando acessar não existe...
        </template>
        <p>
          Não se preocupe, você ainda pode criar um Dashboard e começar sua
          jornada conosco!
        </p>
        <!-- fix link -->
        <router-link
          :to="{}"
          class="btn btn-blue ml-auto">
          <span class="fa fa-arrow-left"/> Voltar ao projeto
        </router-link>
      </b-jumbotron>
    </div>
    <section v-else>
      <header>
        <h2>
          {{ dashboard.name != '' ? dashboard.name : 'dashboard name' }}
          <br>
          <small class="text-muted h4">
            {{ dashboard.project != '' ? dashboard.project : 'project name' }}
          </small>
        </h2>
        <p class="text-justify">
          {{ dashboard.description }}
        </p>
        <ul class="list-inline">
          <li
            v-for="tag in dashboard.project.tags"
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
        <section>
          <div class="row">
            <div
              v-for="iframe in iframes"
              :key="iframe.id"
              class="col-lg-6">
              <div class="card col">
                <div class="embed-responsive">
                  <custom-iframe
                    :iframeUrl="iframe.url"
                    class="embed-responsive-item"/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

import IframeComponent from "@/components/Questions/IframeComponent"

export default {
    components: {
        "custom-iframe": IframeComponent,
    },

    data () {

        return {
            dashboard: {
                project: "",
                name: "",
                id: ""
            },
            user: {
                username: "",
                password: "",
                email: "",
                id: ""
            },
            showError: false
        }
    },
    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },

    beforeMount(){
        this.getObservatorioDetail()
        this.loadUserInfo()
        this.modalScript()
    },
    methods: {
        deleteDashboard (){
            if (window.confirm("Deseja realmente deletar o dashboard ?")){
                this.$http.delete("dashboards/" + this.$route.params.id + "/", { headers: { "Authorization": "JWT " + localStorage.token } }).then(result => {
                    window.alert("dashboard deletado")
                    this.$router.replace("/home")
                    this.dashboard = result.data
                },
                error => {
                    window.alert("Erro ao deletar o dashboard")
                    error.log(error)
                })
            }
        },
        getObservatorioDetail(){
            this.$http.get("dashboards/" + this.$route.params.id + "/",  { headers: { "Authorization": "JWT " + localStorage.token } }).then(result => {
                this.dashboard = result.data
            },
            error => {
                error.log(error)
            })
        }
        ,
        loadUserInfo (){
            this.user.id = this.currentUser.id
            this.user.username = this.currentUser.name
            this.user.email = this.currentUser.email
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
