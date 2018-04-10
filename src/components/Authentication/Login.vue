<template>
<div class = "Login" id="#ancora">

  <div class="row">
    <div class ="col s12">
    
      <div class="row">
      
        <div class="container center-align">
          <h1> LOGIN </h1>
        
          <input type="text" v-model="user.username" placeholder="Username" />
          <input type="password" v-model="user.password" placeholder="Password" />
          <input type="text" v-model="user.email" placeholder="Email" />
          <a v-on:click="Login()" class="waves-effect  btn-large">Login</a>         
          <b><p> Ainda não possui uma conta ? </p></b>
          <a class="waves-effect waves-light btn-large" href="#/register">Registrar</a>
        
        </div>

        <br />
        <p> {{ token }}</p>      
     </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data(){
    name: 'Login'
    return {
      user: {
        username: "",
        email: "",
        password: ""
      },
      token: "",
    }
  },
  methods: {
    Login(){
      console.log("chegou aqui")
      this.$http.post("http://localhost:8000/rest-auth/login/", this.user, { headers: { "content-type": "application/json" } }).then(result => {
      this.token = result.data;
      },
      error => {
          console.error(error);
      });
    },
  }
}


</script>

<style>

::placeholder { /* Most modern browsers support this now. */
   color:    #00C583;
}

</style>
