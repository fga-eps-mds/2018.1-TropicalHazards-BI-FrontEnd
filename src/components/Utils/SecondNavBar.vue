<template>
<nav>
    <div class="nav-wrapper grey ">
      <a href="#/" class="brand-logo">
      <span class="fa fa-eye"></span> OBSERV
      </a>

      <ul v-if="currentUser" id="nav-mobile" class="right hide-on-med-and-down">
        <li><router-link :to="{name: 'LandingPage'}"></router-link></li>
        <li><router-link :to="{name: 'HomePage'}">Dashboard</router-link></li>
        <li ><a v-on:click="Logout()" href="#">Logout</a></li>
      </ul>

      <ul v-if="!currentUser" id="nav-mobile" class="right hide-on-med-and-down">
        <li><router-link :to="{name: 'LandingPage'}">Inicio</router-link></li>
        <li><router-link :to="{name: 'Login'}">Login</router-link></li>

      </ul>
    </div>
  </nav>

</template>


<script>
/* eslint-disable */
import {mapGetters} from 'vuex'

export default {

  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },

  methods: {
// redireciona o user caso esteja logado
/* eslint-disable */
    Logout(){
      this.$http.post("rest-auth/logout/", this.user, { headers: { "content-type": "application/json" } }).then(result => {
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

</style>
