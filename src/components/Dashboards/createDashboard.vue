<template>
  <div class="row grey lighten-4">
    <sidebar/>
    <div
      id="content"
      class="col m11">
      <div class="header center-align white">
        <h3>
          Criar Observatório
        </h3>
      </div>
      <div class="container center-align">
        <div class="row">
          <div class="">
            <div class="card grey lighten-3">
              <div class="card-content black-text">
                <span style="color: grey;text-align:left;"><h4>Nome</h4></span>
                <p style="text-align:left">{{ observatory.name }}</p>
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
            @click="PostObservatory()">
            Criar
          </a>
        </div>
      </form>
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
                id: "",
                user: "",
                name: "",
                description: ""
            },
            observatory: {
                project: "",
                name: "",
                user: "",
            },

            user: {
                username: "",
                email: "",
                password: ""
            },

            projetos: "",
            observatorios: "",
        }
    },
    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },

    beforeMount() {
        this.loadUserInfo()
        this.getProjectDetail()
    },
    methods: {
        loadUserInfo (){
            this.user.id = this.currentUser.id
            this.user.username = this.currentUser.name
            this.user.email = this.currentUser.email
        },
        getProjectDetail () {
            this.$http.get("projects/" + this.$route.params.id + "/", { headers: { "Authorization": "JWT " + localStorage.token } }).then(result => {
                this.project = result.data
                this.observatory.project = this.project.id
            },
            error => {
                error.log(error)
            })
        },
        PostObservatory (){
            this.observatory.project = this.project.id
            this.observatory.user = this.user.id
            this.$http.post("dashboards/", this.observatory, { headers: { "Authorization": "JWT " + localStorage.token, "content-type": "application/json", } }
            ).then(result => {
                this.observatorios = result.data
                this.postSucess(result)
            },
            error => {
                error.log(error)
                this.CreateFail()
            })
        },

        postSucess() {
            window.alert("Observatório criado com Sucesso")
            this.$router.replace("/home")
        },

        CreateFail () {
            window.confirm("Falha na criação do observatório")
        },
        modalScript() {
            $(document).ready(function(){
                $(".modal").modal()
            })
            $(document).ready(function(){
                $("select").formSelect()
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
