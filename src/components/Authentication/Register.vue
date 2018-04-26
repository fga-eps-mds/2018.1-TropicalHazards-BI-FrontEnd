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
              placeholder="Username">
            <input
              v-model="user.password"
              type="password"
              placeholder="Password">
            <input
              v-model="user.email"
              type="text"
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
