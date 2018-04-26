<template>
  <div id="app">
    <div class="row grey lighten-4">
      <sidebar/>
      <div
        id="content"
        class="col m11">
        <div class="header center-align white">
          <h3>
            Criar Projeto
          </h3>
        </div>
        <div class="container center-align">
          <div class="row">
            <div class="">
              <div class="card grey lighten-3">
                <div class="card-content black-text">
                  <span style="color: grey; text-align:left;"><h4>Nome:</h4></span>
                  <p style="text-align:left">{{ project.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container center-align">
          <div class="row">
            <div class="">
              <div class="card grey lighten-3">
                <div class="card-content black-text">
                  <span style="color: grey;text-align:left;"><h4>Descrição:</h4></span>
                  <p style="text-align:left">{{ project.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form>
          <div class="container center-align">
            <div class="row">
              <div class="input-field col s12">
                <input
                  id="name"
                  v-model="project.name"
                  type="text"
                  class="validate">
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <textarea
                  id="deion"
                  v-model="project.description"
                  class="materialize-textarea"/>
              </div>
            </div>
            <router-link
              :to="{ name: 'ProjectDetail' , params: { id: project.id }}"
              class=" btn-large grey lighten-1 white-text waves-effect waves-light">
              Cancelar
            </router-link>
            <a
              class=" btn-large blue lighten-1 white-text waves-effect waves-light"
              v-on:
              @click="PostProject()">
              Criar
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import SideBar from "@/components/Utils/SideBar"
export default {

    components: {
        "sidebar": SideBar
    },
    data(){

        return {
            project: {
                user: "",
                name: "",
                description: ""
            },

            user: {
                username: "",
                email: "",
                password: ""
            },

            projetos: "",
        }
    },
    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },
    beforeMount() {
        this.loadUserInfo()
        this.loadProject()
        this.testToken()
    },
    methods: {
        loadUserInfo (){
            this.user.id = this.currentUser.id
            this.user.username = this.currentUser.name
            this.user.email = this.currentUser.email
        },
        loadProject (){
            this.project.user = this.currentUser.id
        },
        PostProject (){
            this.$http.post("projects/",this.project, { headers: { "Authorization": "JWT " + localStorage.token, "content-type": "application/json", } }
            ).then(result => {
                this.projeto = result.data
                this.postSucess(result)
            },
            error => {
                error.log(error)
            })
        },

        postSucess() {
            window.alert("Projeto criado com Sucesso")
            this.$router.replace("/home")
        },

        CreateFail () {
            window.confirm("Falha na criação do projeto")
        },

        testToken(){
            this.$http.post("obtain-token/", { "username": this.user.username, "password": "senhabanda"}).then(result => {
                localStorage.token = result.data.token
            })
        },
        modalScript() {
            (document).ready(function(){
                (".modal").modal()
            });

            (document).ready(function(){
                ("select").formSelect()
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
