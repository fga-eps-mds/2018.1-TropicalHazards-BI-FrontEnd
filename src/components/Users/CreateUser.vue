<template>
  <div class = "app">
    <div class="row">
      <secondnav/>
      <div
        id="usuario"
        class ="container  col s12">
        <h2> Registrar </h2>
        <div class="container center-align">
          <input
            v-model="user.username"
            type="text"
            placeholder="Username" >
          <input
            v-model="user.email"
            type="text"
            placeholder="Email" >
          <input
            v-model="user.password"
            type="password"
            placeholder="password" >
          <a
            class="waves-effect waves-light btn-small"
            v-on:
            @click="registerUser()"
            @keyup.enter="registerUser()">Criar Usuario</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import SecondNavBar from "@/components/Utils/SecondNavBar"
export default {
    components: {
        "secondnav": SecondNavBar
    },
    data(){
        return {
            user: {
                username: "",
                email: "",
                password: ""
            }
        }
    },
    methods: {
        registerUser(){
            this.$http.post("users/", this.user, { headers: { "content-type": "application/json" } }).then(result => {
                this.user = result.data
                window.alert("Usuario criado")
            },
            error => {
                window.alert("Dados incorretos ou usuario já cadastrado")
                error.log(error)
            })
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
