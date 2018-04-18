<template>
<div class = "CreateProject">
  <div class="row">
    <div class ="col s12">
          <div class="container center-align">
          <h1> Criar Projeto </h1>
          <input type="text" v-model="project.name" placeholder="Nome do projeto" />
          <input type="text" v-model="project.description" placeholder="Descrição" />
          <a v-on:click="PostProject()" class="waves-effect waves-light btn-large">Criar projeto</a>
         </div>
        <br />
     </div>
  </div>
</div>
</template>

<script>
/* eslint-disable */

import {mapGetters} from 'vuex'
import CreateUserVue from '../Users/CreateUser.vue';

  export default {
  data(){
    name: 'CreateProject'
    return {
      project: {
        user: "",
        name: "",
        description: ""

      },
      user: {
        username: "",
        email: "",
        password: ""

      },
      projetos: "",

    }
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  methods: {
    loadUserInfo (){
      this.user.id = this.currentUser.id
      this.user.username = this.currentUser.name
      this.user.email = this.currentUser.email
    },
    loadProject (){
      this.project.user = this.currentUser.id
    },
    PostProject (){
      console.log("chegou aqui")
      this.$http.post("http://localhost:8000/projects/",this.project, { headers: { 'Authorization': 'JWT ' + localStorage.token, "content-type": "application/json", "Authorization": "JWT" + localStorage.Token } }
                     ).then(result => {
      this.project = result.data;
      window.confirm("Projeto criado com Sucesso")
      this.$router.push('/home')

      CreateSucess (result)
      },
      error => {
          console.error(error);
      });
    },
    CreateSucess (response){
      if(!response.data){
        this.CreateFail()
        return
      }
      location.reload();
    },
    CreateFail (){
      window.confirm("Falha na criação do projeto")
    },
    testToken(){
    this.$http.post('http://localhost:8000/obtain-token/', { 'username': this.user.username, 'password': 'senhabanda'}).then(result => {
    localStorage.token = result.data.token
    })
  }
  },
    beforeMount(){
    this.loadUserInfo()
    this.loadProject()
    this.testToken()
  }

}
</script>

<style>

::placeholder { /* Most modern browsers support this now. */
   color:    #132a71;
}

</style>
