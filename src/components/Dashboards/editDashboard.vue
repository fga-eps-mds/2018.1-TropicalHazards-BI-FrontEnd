<template>
  <div id="app">
    <div class="row grey lighten-4">
      <sidebar/>
      <div
        id="content"
        class="col m11">
        <div class="header center-align white">
          <h3>
            Editar Observatório
          </h3>
        </div>
        <div class="container center-align">
          <div class="row">
            <div class="">
              <div class="card grey lighten-3">
                <div class="card-content black-text">
                  <span style="color: grey;"><h4>Nome</h4></span>
                  <p style="text-align:justify">{{ observatory.name }}</p>
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
                  v-model="observatory.name"
                  type="text"
                  class="validate">
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
              @click="updateDashboard()">
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
            observatory: {
                project: "",
                name: "",
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
        this.getDashboardDetail()
    },
    methods: {
        loadUserInfo (){
            this.user.id = this.currentUser.id
            this.user.username = this.currentUser.name
            this.user.email = this.currentUser.email
        },
        getDashboardDetail (){
            this.$http.get("dashboards/" + this.$route.params.id + "/",  { headers: {"Authorization": "JWT " + localStorage.token } }).then(result => {
                this.observatory = result.data
            },
            error => {
                error.log(error)
            })
        },

        updateDashboard (){
            this.$http.put("dashboards/" + this.$route.params.id + "/", this.observatory,
                { headers: {"Authorization": "JWT " + localStorage.token } }).then(result => {
                window.alert("Observatorio atualizado")
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

<style lang="scss" scoped>

::placeholder { /* Most modern browsers support this now. */
   color:    #132a71;
}
</style>
