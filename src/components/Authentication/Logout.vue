<template>
<div class = "Logout" >

  <div class="row">
    <div class ="col s12">

      <div class="row">

        <div class="container center-align">
          <h1> Logout </h1>

          <a v-on:click="Logout()" class="waves-effect  btn-large">Logout</a>
        

        </div>
     </div>
    </div>
  </div>
</div>
</template>

<script>

import {mapGetters} from 'vuex'
import JwtDecode from 'jwt-decode'

export default {
  data(){
    name: 'Logout'
    return {
      user: {
        username: "",
        password: ""
      },
      token: "",
      name: "",
      error: false
    }
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  created () {
    this.CheckLogout()
  },
  update () {
    this.CheckLogout()
  },
  methods: {
    // redireciona o user caso esteja logado
    CheckLogout(){
      console.log(this.currentUser)
      if(!this.currentUser) {
        this.$router.replace('/')
      }
    },
    Logout(){
      this.$http.post("http://localhost:8000/rest-auth/logout/", this.user, { headers: { "content-type": "application/json" } }).then(result => {
      this.LogoutSucess(result)
      },
      error => {
          this.LoginFail()
          console.error(error)
      });
    },
    LogoutSucess(response){
  
        this.$store.dispatch('logout')//trigger da ação de login implementado em store/auth.js
        delete localStorage.token
        this.$router.replace('/')
        },

  }
}


</script>

<style>

::placeholder { /* Most modern browsers support this now. */
   color:    #00C583;
}

</style>
