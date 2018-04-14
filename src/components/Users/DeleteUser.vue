<template>
  <div class = "EditUser">

  <div class="row">
    <div class ="col s12">

      <div class="row">
          <div class="container center-align">
          <h1> DELETAR USUÁRIO ? </h1>
          <a v-on:click="sendData ()" class="waves-effect red btn-large">Deletar</a>
        </div>


     </div>
    </div>
  </div>


</div>

</template>

<script>
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
    sendData (){
        console.log("chegou aqui carai")
        this.$http.delete('http://localhost:8000/users/' + this.currentUser.id + '/',
                       { headers: { 'Authorization': 'JWT ' + localStorage.token } }).then(result => {
                         this.DeleteSucess(result)
        },error => {
          this.updateFail()
        });
    },
    DeleteSucess(response){
      if(response.data){
        this.DeleteFail()
        return
      }
      this.$http.post('http://localhost:8000/obtain-token/', { 'username': this.user.username, 'password': this.user.password}).then(result => {
        localStorage.token = result.data.token
      })
      this.$store.dispatch('logout')//trigger da ação de login implementado em store/auth.js
      delete localStorage.token
      window.confirm("USER DELETADO")
      this.$router.push('/')
      location.reload();

    },
    updateFail() {
      window.confirm("Falha no DELETE")
      this.$router.replace('/')
    },
    testToken(){
      this.$http.post('http://localhost:8000/obtain-token/', { 'username': this.user.username, 'password': this.user.password}).then(result => {
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
