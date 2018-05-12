<template>
  <div id="app">
    <div class="row grey lighten-4">
      <sidebar/>
      <div
        id="content"
        class="col m11">
        <div class="header center-align grey lighten-4">
          <h3>
            Criar Projeto
          </h3>
        </div>
        <div class="container center-align">
          <div class="row">
            <div class="">
              <div class="card grey lighten-3">
                <div class="card-content black-text">
                  <span style="color: grey; text-align:left;"><p>Nome:</p></span>
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
                  <span style="color: grey;text-align:left;"><p>Descrição:</p></span>
                  <p style="text-align:left">{{ project.description }}</p>
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
                  <span style="color: grey;text-align:left;"><p>Tags:</p></span>
                  <p style="text-align:left">{{ project.tags.slug }}</p>
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
                <label
                  for="descricao"
                  data-error="wrong"
                  data-success="right">Nome do projeto</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <textarea
                  id="deion"
                  v-model="project.description"
                  class="materialize-textarea"/>
                <label
                  for="descricao"
                  data-error="wrong"
                  data-success="right">Descrição</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <textarea
                  id="deion"
                  v-model="selectedTags"
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
                  v-model="project.tags[0].slug"
                  class="materialize-textarea"/>
                <label
                  for="descricao"
                  data-error="wrong"
                  data-success="right">Slug da tag</label>
              </div>
            </div>
            <div class="row">
              <h1>{{ project.tags }}</h1>
              <div
                v-for="tag in tags"
                :key="tag.id"
                class="input-field col s2">
                <form action="#">
                  <p>
                    <label>
                      <input
                        v-model="project.tags"
                        :value= "tag"
                        type="checkbox">
                      <span>{{ tag.slug }}</span>
                    </label>
                  </p>
                </form>
              </div>

            </div>
            <div class="row">
              <div class="col s4">
                <router-link
                  :to="{ name: 'CreateTag'}"
                  class=" btn-large blue lighten-1 white-text waves-effect waves-light">
                  Nova Tag +
                </router-link>
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
                description: "",
                tags: [{}]

            },
            selectedTags: [],
            tags: {
                name: "",
                slug: ""
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
    created(){
        this.getTags()
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
        getTags () {
            this.$http.get("tags/", { headers:
                    {"content-type": "application/json" } }).then(result => {
                this.tags = result.data
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
