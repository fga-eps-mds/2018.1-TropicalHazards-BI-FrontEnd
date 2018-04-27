<template>
  <div id="app">
    <div class="row grey lighten-4">
      <sidebar/>
      <div
        id="content"
        class="col m11">
        <div class="header center-align white">
          <h3>
            {{ project.name }}
          </h3>
        </div>
        <div class="container center-align">
          <div class="row">
            <div class="">
              <div class="card grey lighten-3">
                <div class="card-content black-text">
                  <span style="color: grey;"><h4>Descrição</h4></span>
                  <p style="text-align:justify">{{ project.description }}</p>
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
              @click="updateProject()">
              Atualizar
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

    data () {
        return {
            project: {
                name: "",
                description: "",
                email: ""
            },
            response_get: "",
        }
    },
    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },

    beforeMount(){
        this.loadUserInfo()
        this.testToken()
    },
    created(){
        this.getProjectDetail()
    },
    methods: {
        loadUserInfo (){
            this.user.id = this.currentUser.id
            this.user.username = this.currentUser.name
            this.user.email = this.currentUser.email
        },
        getProjectDetail (){
            this.$http.get("projects/" + this.$route.params.id + "/",  { headers: {"Authorization": "JWT " + localStorage.token } }).then(result => {
                this.project = result.data
            },
            error => {
                error.log(error)
            })
        },

        updateProject (){
            this.$http.put("projects/" + this.$route.params.id + "/", this.project,
                { headers: {"Authorization": "JWT " + localStorage.token } }).then(result => {
                window.alert("Projeto atualizado")
                this.response_get = result.data
                this.$router.push("/project/detail/" + this.$route.params.id + "/")
            },
            error => {
                error.log(error)
            })
        },
        testToken(){
            this.$http.post("obtain-token/", { "username": this.user.username, "password": this.user.password}).then(result => {
                localStorage.token = result.data.token
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
