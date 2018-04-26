<template>
  <div id="app">
    <div class="row grey lighten-4">
      <sidebar/>
      <div
        id="content"
        class="col m11">
        <div class="header center-align white">
          <h3>
            Editar Perfil
          </h3>
        </div>

        <form>
          <div class="container center-align">
            <div class="row">
              <div class="input-field col s12">
                <input
                  id="name"
                  v-model="user.username"
                  type="text"
                  class="validate">
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input
                  id="deion"
                  v-model="user.email"
                  class="materialize-textarea">
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input
                  id="deion"
                  v-model="user.password"
                  type="password"
                  class="materialize-textarea">
              </div>
            </div>
            <router-link
              :to="{ name: 'HomePage'} "
              class=" btn-large grey lighten-1 white-text waves-effect waves-light">
              Cancelar
            </router-link>
            <a
              class=" btn-large blue lighten-1 white-text waves-effect waves-light"
              v-on:
              @click="sendData()">
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
            user: {
                id: "",
                username: "",
                password: "",
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
        this.modalScript()
    },

    methods: {
        loadUserInfo (){
            this.user.id = this.currentUser.id
            this.user.username = this.currentUser.name
            this.user.email = this.currentUser.email
            this.user.password = this.currentUser.password
        },
        sendData (){
            this.$http.put("users/" + this.user.id + "/",
                this.user,
                { headers: { "Authorization": "JWT " + localStorage.token } }).then(result => {
                this.updateSucess(result)
            },
            error => {
                error.log(error)
                this.updateFail()
            })
        },
        updateSucess(response){
            if(!response.data){
                this.updateFail()
                return
            }
            this.$http.post("obtain-token/", { "username": this.user.username, "password": this.user.password}).then(result => {
                localStorage.token = result.data.token
            })

            window.alert("Usuário atualizado")
            this.$store.dispatch("update")
            this.$router.push("/home")
        },
        updateFail() {
            window.confirm("Falha no Update")
            this.$router.replace("/edituser")
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
