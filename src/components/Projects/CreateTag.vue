<template>
  <div id="app">
    <div class="row grey lighten-4">
      <sidebar/>
      <div
        id="content"
        class="col m11">
        <div class="header center-align grey lighten-4">
          <h3>
            Criar Tag
          </h3>
        </div>
        <div class="container center-align">
          <div class="row">
            <div class="">
              <div class="card grey lighten-3">
                <div class="card-content black-text">
                  <span style="color: grey;text-align:left;"><p>Nome:</p></span>
                  <p style="text-align:left">{{ tags.name }}</p>
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
                  <span style="color: grey;text-align:left;"><p>Slug:</p></span>
                  <p style="text-align:left">{{ tags.slug }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form>
          <div class="container center-align">
            <div class="row">
              <div class="input-field col s12">
                <textarea
                  id="deion"
                  v-model="tags.name"
                  class="materialize-textarea"/>
                <label
                  for="descricao"
                  data-error="wrong"
                  data-success="right">Nome da tag</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <textarea
                  id="deion"
                  v-model="tags.slug"
                  class="materialize-textarea"/>
                <label
                  for="descricao"
                  data-error="wrong"
                  data-success="right">Slug da tag</label>
              </div>
            </div>
            <a
              class=" btn-large blue lighten-1 white-text waves-effect waves-light"
              v-on:
              @click="PostTag()">
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

            tags: {
                name: "",
                slug: ""
            },
            user: {
                username: "",
                email: "",
                password: ""
            },

            tag: "",
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

        PostTag (){
            this.$http.post("tags/", this.tags, { headers: {  "Authorization": "JWT " + localStorage.token, "content-type": "application/json", } }
            ).then(result => {
                this.tag = result.data
                this.postSucess(result)
            },
            error => {
                error.log(error)
            })
        },

        postSucess() {
            window.alert("Tag criada com Sucesso")
            this.$router.replace("/projetos")
        },

        CreateFail () {
            window.confirm("Falha na criação da tag")
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
