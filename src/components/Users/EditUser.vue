<template>
  <div class = "EditUser">
    <div class="row">
      <div class ="col s12">
        <div class="row">
            <div class="container center-align">
            <h1> EDITAR USUÁRIO </h1>
            <input type="text" v-model="user.username" />
            <input type="password" v-model="user.password"   />
            <input type="text" v-model="user.email" placeholder="Email" />
            <a v-on:click="editUser()" v-on:keyup.enter="editUser()"
              class="model-close waves-effect waves-light btn-large">Editar</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import {mapGetters} from 'vuex'
export default {
  name: 'EditUser',
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
  components: {
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  methods: {
    loadUserInfo (){
      this.user.id = this.currentUser.id
      this.user.username = this.currentUser.name
      this.user.email = this.currentUser.email
    },
    editUser (){
        this.$http.put('users/' + this.currentUser.id + '/',
                       this.user,
                       { headers: { 'Authorization': 'JWT ' + localStorage.token } }).then(result => {
                       this.updateSucess(result)
        },error => {
          this.updateFail()
        });
    },
    updateSucess(response){
      if(!result){
        this.updateFail()
        return
      }
        this.$http.post('obtain-token/', { 'username': this.user.username, 'password': this.user.password}).then(result => {
        localStorage.token = result.data.token
      })

      window.confirm("Usuário atualizado")
      this.$store.dispatch('update')
      this.$router.push('/home')
    },
    updateFail() {
      window.alert("Falha no Update")
      this.$router.replace('/home')
    },
    testToken(){
      this.$http.post('obtain-token/', { 'username': this.user.username, 'password': this.user.password}).then(result => {
      localStorage.token = result.data.token
      })
    }
  },
  beforeMount(){
    this.loadUserInfo()
    this.testToken()
  }
}
</script>

<style>
</style>
