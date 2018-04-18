<template>
<div class = "Login">

  <div class="row">
    <div class ="col s12">

      <div class="row">

          <div class="container center-align">
          <h1> REGISTRAR </h1>
          <input type="text" v-model="user.username" placeholder="Username" />
          <input type="password" v-model="user.password" placeholder="Password" />
          <input type="text" v-model="user.email" placeholder="Email" />
          <a v-on:click="Register()" class="waves-effect waves-light btn-large">Registrar</a>

        </div>

        <br />
        <br />

        <p> {{ response }}</p>

     </div>
    </div>
  </div>


</div>
</template>

<script>
/* eslint-disable */

export default {
  data(){
    name: 'Register'
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
    // metodo pra registrar usuário
    Register(){
      this.$http.post("http://localhost:8000/users/", this.user, { headers: { "content-type": "application/json" } }).then(result => {
      this.user = result.data;
      this.response = response.data;
      },
      error => {
          console.error(error);
      });

    }
  }
}

</script>

<style>

</style>
