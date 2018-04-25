<template>
  <div id="app">
    <div
      id="new-proj"
      class="modal">
      <div class="modal-content container center-align">
        <h4>Criar Projeto</h4>
        <section class="modal-form">
          <form>
            <div class="row">
              <div class="input-field col s12">
                <input
                  id="name"
                  v-model="project.name"
                  type="text"
                  class="validate">
                <label for="name">Nome do projeto</label>
              </div>
              <div class="input-field col s12">
                <textarea
                  id="deion"
                  v-model="project.description"
                  class="materialize-textarea"/>
                <label for="deion">Descrição do projeto</label>
              </div>
            </div>
            <button
              type="submit"
              class="model-close col s12 btn-large grey lighten-1 waves-effect waves-green">
              <span class="fa fa-trash">Cancelar</span>
            </button>
            <button
              class="model-close col s12 btn-large blue lighten-1 waves-effect waves-green"
              type="submit"
              v-on:
              @click="PostProject()">
              <span class="fa fa-save">Criar</span>
            </button>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
export default {
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


</style>
