<template>
  <div class="row grey lighten-4">
    <sidebar/>
    <div
      id="content"
      class="col m11">
      <div class="header center-align white">
        <small>Projeto: Mapa da Dengue no DF</small>
        <h3>
          {{ dashboard.name }}
        </h3>
      </div>
      <div class="grey lighten-4">
        <div class="custom-container">

          <h5>Dados do Observatório</h5>

          <div class="row">
            <div class="col s12 m4">
              <div class="card">
                <div class="card-content">
                  <span class="card-title">
                    Cleiton Jr.
                  </span>
                  <p>
                    Criador
                  </p>
                </div>
              </div>
              <button
                class = "btn-large red"
                v-on:
                @click="deleteDashboard()">Deletar Dashboard
                <span class="fa fa-trash"/>
              </button>
              <!-- <button
                class = "btn-large blue"
                @click="$modal.show('ask-question', { dashboard: dashboard.id })">Gerar indicador
                <span class="fa fa-trash"/>
              </button>
              <modal-question/> -->
            </div>
            <div class="col s12 m4">
              <div class="card">
                <div class="card-content">
                  <span class="card-title">1.3 Gb</span>
                  <p>
                    De dados
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="custom-container">
          <div class="row">
            <div class="col s12">
              <!-- vai ser iframe então lembrar de colocar tag de iframe com a classe de reixar IFRAME RESPONSIVO -->
              <!-- <iframe
                src="{{ iframeUrl}}" /> -->
            </div>
          </div>
          <div class="row white darken-1">
            <div class="col s12">
              <a
                href="#"
                class="btn-large waves-effect waves-light blue lighten-1 white-text">
                <span class="fa fa-download">Baixar dados usados</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex"
import Sidebar from "@/components/Utils/Sidebar"

export default {

    components: {
        "sidebar": Sidebar,
    },
    data(){

        return {
            dashboard: {
                project: "",
                name: "",
                id: ""
            },
            user: {
                username: "",
                password: "",
                email: ""
            }
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

<style>


</style>
