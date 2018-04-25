<template>
  <div class = "EditUser">
    <div class="row">
      <div class ="col s12">
        <div class="row">
          <div class="container center-align">
            <h1> EDITAR USUÁRIO </h1>
            <input
              v-model="user.username"
              type="text">
            <input
              v-model="user.password"
              type="password">
            <input
              v-model="user.email"
              type="text"
              placeholder="Email">
            <a
              class="model-close waves-effect waves-light btn-large"
              v-on:
              @click ="editUser()"
              @keyup.enter="editUser()">Editar</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex"
export default {
    name: "EditUser",
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
    },
    methods: {
        loadUserInfo (){
            this.user.id = this.currentUser.id
            this.user.username = this.currentUser.name
            this.user.email = this.currentUser.email
        },
        editUser (){
            this.$http.put("users/" + this.currentUser.id + "/",
                this.user,
                { headers: { "Authorization": "JWT " + localStorage.token } }).then(result => {
                this.updateSucess(result)
            },
            error => {
                this.updateFail()
                error.log(error)
            })
        },
        updateSucess(result){
            if(!result){
                this.updateFail()
                return
            }
            this.$http.post("obtain-token/", { "username": this.user.username, "password": this.user.password}).then(result => {
                localStorage.token = result.data.token
            })

            window.confirm("Usuário atualizado")
            this.$store.dispatch("update")
            this.$router.push("/home")
        },
        updateFail() {
            window.alert("Falha no Update")
            this.$router.replace("/home")
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
</style>
