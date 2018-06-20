<template>
    <div class="container-fluid">
    <header>
      <h2>
        Novo Dashboard
      </h2>
    </header>
    <div class="row">
      <div class="col col-md-6 offset-md-3">
        <b-alert
          :variant="alert.status"
          :show="alert.show || ($v.$invalid && $v.$dirty)"
          dismissible
          @dismissed="alert.show=false">
          <p>
            {{ alert.text }}
          </p>
          <p v-show="$v.dashboard.name.$dirty">
            {{ nameErrorMessage }}
          </p>
          <p v-show="$v.dashboard.description.$dirty">
            {{ descriptionErrorMessage }}
          </p>
        </b-alert>
        <form>
          <div class="form-group">
            <label for="p-name">
              Nome do dashboard:
            </label>
            <input
              id="p-name"
              v-model.trim="dashboard.name"
              type="text"
              class="form-control"
              placeholder="Observatório de dengue">
          </div>
          <div class="form-group">
            <label for="d-description">
              Descrição:
            </label>
            <textarea
              id="d-description"
              v-model.trim="dashboard.description"
              class="form-control"
              rows="6"
              placeholder="Propósito da dashboard"/>
          </div>
          <div class="row">
            <button
              class="col btn btn-green btn-block btn-lg"
              @click="postProject()">
              <span class="fa fa-check"/> Salvar
            </button>
            <router-link
              :to="{ name: 'MyProjects' }"
              class="col btn btn-grey btn-block mt-0 btn-lg">
              <span class="fa fa-undo"/> Voltar
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
    data () {

        return {
            alert: {
                variant: "",
                text: "",
                show: false
            },
            project: {
                id: "",
                user: "",
                name: "",
                description: ""
            },
            dashboard: {
                project: "",
                name: "",
                user: "",
            },

            user: {
                username: "",
                email: "",
                password: ""
            },

            // projetos: "",
            dashboardList: [],
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

<style>

::placeholder { /* Most modern browsers support this now. */
   color:    #132a71;
}
</style>
