<template>
  <div class = "Login" id="#ancora">
    <div class="row">
      <div class ="col s12">
        <div class="row">
          <div class="container center-align">
            <h1> LOGIN </h1>
            <input type="text" v-model="user.username" placeholder="Username" />
            <input type="password" v-model="user.password" placeholder="Password" />
            <a v-on:keyup.enter="Login()" v-on:click="Login()"  class="waves-effect  btn-large">Login</a>
            <b><p> Ainda não possui uma conta ? </p></b>
            <router-link :to="{name: 'CreateUser'}"
                              class="waves-effect waves-light btn-large">
            Registrar</router-link>
        </div>
      </div>
     </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import {mapGetters} from 'vuex'
import JwtDecode from 'jwt-decode'

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      token: '',
      name: '',
      error: false
    }
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  created () {
    this.CheckLogin()
  },
  update () {
    this.CheckLogin()
  },
  methods: {
    // redireciona o user caso esteja logado
    CheckLogin () {
      console.log(this.currentUser)
      if (this.currentUser) {
        this.$router.replace('/')
      }
    },
    Login () {
      this.$http.post('rest-auth/login/', this.user).then(result => {
        this.token = JwtDecode(result.data.token)
        this.name = this.token.isStaff
        this.LoginSucess(result)
      },
      error => {
        this.LoginFail()
        console.error(error)
      })
    },
    LoginSucess (response) {
      if (!response.data.token) {
        this.loginFail()
        return
      }
      this.error = false
      localStorage.token = response.data.token
      this.$store.dispatch('login') // trigger da ação de login implementado em store/auth.js
      this.$router.replace('/home')
    },
    LoginFail () {
      this.error = 'Falha no Login!'
      this.$store.dispatch('logout') // trigger da ação de logout
      delete localStorage.token
    }
  }
}

</script>

<style>

::placeholder { /* Most modern browsers support this now. */
   color:    #00C583;
}

</style>
