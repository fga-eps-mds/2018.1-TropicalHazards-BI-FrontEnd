<template>
  <div class = "Login">

    <div class="row">
      <div class ="col s12">

        <div class="row">

          <div class="container center-align">
            <h1> REGISTRAR </h1>
            <input
              v-model="user.username"
              @input="$v.user.username.$touch()"
              type="text"
              placeholder="Username">
            <input
              v-model="user.password"
              @input="$v.user.password.$touch()"
              type="password"
              placeholder="Password">
            <input
              v-model="user.email"
              @input="$v.user.email.$touch()"
              type="email"
              placeholder="Email">
            <a
              v-on:
              click="Register()"
              class="waves-effect waves-light btn-large">Registrar</a>

          </div>

          <br>
          <br>

          <p> {{ response }}</p>

        </div>
      </div>
    </div>


  </div>
</template>

<script>
import { required, minLength, between } from "vuelidate/lib/validators"

export default {
    data(){
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
                between: between(3, 50)
            },
            email: {
                required,
                between: between(6, 70)
            },
            password: {
                required,
                minLength: minLength(4)
            }
        }
    },
    methods: {
        Register(){
            this.$http.post("users/", this.user, { headers: { "content-type": "application/json" } }).then(result => {
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
