<template>
  <nav>
    <div class="nav-wrapper grey ">
      <a
        href="#/"
        class="brand-logo">
        <span class="fa fa-eye">OBSERV</span>
      </a>

      <ul
        v-if="currentUser"
        id="nav-mobile"
        class="right hide-on-med-and-down">
        <li>
          <router-link
            :to="{name: 'LandingPage'}"/>
        </li>
        <li><router-link :to="{name: 'HomePage'}">Dashboard</router-link></li>
        <li ><a
          href="#">Logout
          @v-on:click="Logout()"</a>
        </li>
      </ul>

      <ul
        v-if="!currentUser"
        id="nav-mobile"
        class="right hide-on-med-and-down">
        <li><router-link :to="{name: 'LandingPage'}">Inicio</router-link></li>
        <li><router-link :to="{name: 'Login'}">Login</router-link></li>

      </ul>
    </div>
  </nav>

</template>


<script>

import {mapGetters} from "vuex"

export default {

    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },

    methods: {

        Logout(){
            this.$http.post("rest-auth/logout/", this.user, { headers: { "content-type": "application/json" } }).then(result => {
                this.LogoutSucess(result)
            },
            error => {
                this.LoginFail()
                error.log(error)
            })
        },
        LogoutSucess(){

            this.$store.dispatch("logout")//trigger da ação de login implementado em store/auth.js
            delete localStorage.token
            this.$router.replace("/")
        },

    }
}

</script>

<style>

</style>
