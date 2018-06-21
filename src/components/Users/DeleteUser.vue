<template>
  <div
    id="delete-user"
    class="modal grey lighten-4">
    <div class="modal-content container center-align">
      <div class="row">
        <h4>
          Deletar Usuário ?
        </h4>
        <div class="col s6">
          <button
            type="submit"
            class="model-close col s12 btn-large red lighten-1 waves-effect waves-green"
            v-on:
            @click="sendData()">
            <span class="fa fa-trash">Sim</span>
          </button>
        </div>
        <div class="col s6">
          <button
            type="submit"
            class="model-close col s12 btn-large blue lighten-1 waves-effect waves-green"
            v-on:
            @click="modalScript()">

            <span class="fa fa-cancel">Não</span>
          </button>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import {mapGetters} from "vuex"
export default {

    data () {
        return {
            user: {
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
        this.testToken()
        this.modalScript()
    },

    methods: {
        loadUserInfo (){
            this.user.id = this.currentUser.id
            this.user.username = this.currentUser.name
            this.user.email = this.currentUser.email
        },
        sendData (){
            this.$http.delete("users/" + this.currentUser.id + "/",
                { headers: { "Authorization": "JWT " + localStorage.token } }).then(result => {
                this.DeleteSucess(result)
            },
            error => {
                this.updateFail()
                error.log(error)
            })
        },
        DeleteSucess(response){
            if(response.data){
                this.DeleteFail()
                return
            }
            this.$http.post("obtain-token/", { "username": this.user.username, "password": this.user.password}).then(result => {
                localStorage.token = result.data.token
            })
            this.$store.dispatch("logout")//trigger da ação de logout implementado em store/auth.js
            delete localStorage.token
            window.alert("Usuário Deletado")
            this.$router.push("/")
        },
        updateFail() {
            window.alert("Falha ao deletar usuário")
            this.$router.replace("/")
        },
        testToken(){
            this.$http.post("obtain-token/", { "username": this.user.username, "password": this.user.password}).then(result => {
                localStorage.token = result.data.token
            })
        },
        modalScript () {
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

<style lang="scss" scoped>
</style>
