<template>
<div class = "app">
  <div class="row">
    <secondnav></secondnav>
    <div id="usuario" class ="container  col s12">
                <h2> Registrar </h2>

          <div class="container center-align">
          <input type="text" v-model="user.username" placeholder="Username" />
          <input type="text" v-model="user.email" placeholder="Email" />
          <input type="password" v-model="user.password" placeholder="password" />
          <a v-on:click="PostUser()" class="waves-effect waves-light btn-small">Criar Usuario</a>
         </div>
     </div>
  </div>
</div>
</template>

<script>
import SecondNavBar from '@/components/Utils/SecondNavBar'
  export default {
    components: {
     'secondnav': SecondNavBar
    },
  data(){
    name: 'CreateUser'
    return {
      user: {
        username: "",
        email: "",
        password: ""

      }
    }
  },
  methods: {
    PostUser(){
      this.$http.post("http://localhost:8000/users/", this.user, { headers: { "content-type": "application/json" } }).then(result => {
      this.user = result.data;
      window.alert("Usuario criado")
      },
      error => {
      window.alert("Erro")
      });
    },
  }
}
</script>

<style>
::placeholder { /* Most modern browsers support this now. */
   color:    #132a71;
}
#usuario {
 width: 300px;
   height: 350px;
   outline: 1px solid #c6c6c6;
   position: relative;
   left: 50%;
   margin-left: -150px;
   margin-top: 50px;
}


</style>
