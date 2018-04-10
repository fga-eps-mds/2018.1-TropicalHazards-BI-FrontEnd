<template>
<div class = "Login">

  <div class="row">
    <div class ="col s12">
    
      <div class="row">
      
        <div class="col s6">
          <h1> LOGIN </h1>
          <input type="text" v-model="user.username" placeholder="Username" />
          <input type="text" v-model="user.password" placeholder="Password" />
          <input type="text" v-model="user.email" placeholder="Email" />
          <button v-on:click="Login()">Login</button>
        </div>    

          <div class="col s6">
          <h1> REGISTRAR </h1>      
          <input type="text" v-model="user.username" placeholder="Username" />
          <input type="text" v-model="user.password" placeholder="Password" />
          <input type="text" v-model="user.email" placeholder="Email" />
          <button v-on:click="Register()">Registrar</button>
        </div>  
          
        <br />
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
      this.$http.get("http://localhost:8000/rest-auth/user/", this.token, { headers: {"content-type": "application/json" } }).then(result =>{
      this.response = result.data;
      },
      error => {
          console.error(error);
      });

    },

    Register(){
      console.log("chegou aqui")
      this.$http.post("http://localhost:8000/users/", this.user, { headers: { "content-type": "application/json" } }).then(result => {
      this.user = result.data;
      },
      error => {
          console.error(error);
      });
      
    }
  }
}


</script>

<style>

input{
  text-align:center;
  display: block;
}

.Login{
  text-align:center;
}

#opa{
  text-align:center;
}



</style>
