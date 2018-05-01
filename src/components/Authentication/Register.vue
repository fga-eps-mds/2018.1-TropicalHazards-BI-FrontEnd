<template>
  <div class = "Login">

    <div class="row">
      <div class ="col s12">

        <div class="row">

          <div class="container center-align">
            <h1> REGISTRAR </h1>
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
            <input
              v-model="user.email"
              type="email"
              placeholder="Email"
              @input="$v.user.email.$touch()">
            <a
              id="register-submit"
              v-on:
              click="register()"
              class="waves-effect waves-light btn-large">
              Registrar
            </a>

          </div>

          <br>
          <br>

          <p> {{ response }} </p>

        </div>
      </div>
    </div>


  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators"

export default {
    data () {
        return {
            user: {
                username: "",
                email: "",
                password: ""
            },
            response: "",
        }
    },
    validations: {
        user: {
            username: {
                required,
                minLength: minLength(3)
            },
            email: {
                required,
            },
            password: {
                required,
                minLength: minLength(4)
            }
        }
    },
    methods: {
        register () {
            this.$http.post("users/", this.user, {
                headers: {
                    "content-type": "application/json"
                }
            }).then(result => {
                this.user = result.data
                this.response = result.data
            },
            error => {
                error.log(error)
            })

        }
    }
}

</script>

<style>

</style>
