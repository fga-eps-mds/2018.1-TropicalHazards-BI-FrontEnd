<template>
  <div
    id="#ancora"
    class = "Login">
    <div class="row">
      <div class ="col s12">
        <div class="row">
          <div class="container center-align">
            <h1> LOGIN </h1>
            <input
              v-model="user.username"
              type="text"
              placeholder="Username"
              @input="$v.user.username.$touch()">
            <input
              v-model="user.password"
              type="password"
              placeholder="Password"
              @input="$v.user.password.$touch()">
            <a
              id="login-submit"
              class="waves-effect btn-large"
              v-on:
              @click="Login()">
              Login
            </a>
            <b><p> Ainda não possui uma conta ? </p></b>
            <router-link
              :to="{name: 'CreateUser'}"
              class="waves-effect waves-light btn-large">
              Registrar
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from "vuex"
import JwtDecode from "jwt-decode"
import { required, minLength } from "vuelidate/lib/validators"

export default {
    data () {
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
    validations: {
        user: {
            username: {
                required,
                minLength: minLength(3)
            },
            password: {
                required,
                minLength: minLength(5)
            }
        }
    },
    computed: {
        ...mapGetters({
            currentUser: "currentUser"
        })
    },
    created () {
        this.CheckLogin()
    },
    update () {
        this.CheckLogin()
    },
    methods: {
    // redirects user if already logged in
        CheckLogin () {
            if (this.currentUser) {
                this.$router.replace("/")
            }
        },
        Login () {
            this.$http.post("rest-auth/login/", this.user, {
                headers: {
                    "content-type": "application/json"
                }
            }).then(result => {
                this.token = JwtDecode(result.data.token)
                this.name = this.token.isStaff
                this.LoginSucess(result)
            },
            error => {
                this.LoginFail()
                error.log(error)
            })
        },
        LoginSucess (response) {
            if (!response.data.token) {
                this.loginFail()
                return
            }
            this.error = false
            localStorage.token = response.data.token
            this.$store.dispatch("login") // trigger login implemented in store/auth.js
            this.$router.replace("/home")
        },
        LoginFail () {
            this.error = "Falha no Login!"
            this.$store.dispatch("logout") // trigger logout action
            delete localStorage.token
        }
    }
}

</script>

<style>

::placeholder { /* Most modern browsers support this now. */
   color: #3f3f3f;
}

</style>
