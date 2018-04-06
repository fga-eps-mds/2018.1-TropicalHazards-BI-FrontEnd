<template>
<div>
    <div class="Login">
        <h1> {{ token }}</h1>
        <input type="text" v-model="user.username" placeholder="Username" />
        <input type="text" v-model="user.password" placeholder="Password" />
        <input type="text" v-model="user.email" placeholder="Email" />
        <button v-on:click="Login()">Login</button>
        <h1> {{ response }} </h1>
        <br />
        <br />
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
      response: "",
      userget: {
        username: "batata",
        first_name: "",
        last_name: ""
      }
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
      this.$http.get("http://localhost:8000/rest-auth/user/", this.userget, { headers: {"content-type": "application/json" } }).then(result =>{
      this.response = result.data;
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
