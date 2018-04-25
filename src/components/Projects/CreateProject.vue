<template>
  <div class = "CreateProject">
    <div class="row">
      <div class ="col s12">
        <div class="container center-align">
          <h1> Criar Projeto </h1>
          <input
            v-model="project.name"
            type="text"
            placeholder="Nome do projeto">
          <input
            v-model="project.description"
            type="text"
            placeholder="Descrição">
          <a
            class="waves-effect waves-light btn-large"
            v-on:
            @click="PostProject()">
            Criar projeto</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
    data(){
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
        ...mapGetters({ currentUser: "currentUser" })
    },

    beforeMount(){
        this.loadUserInfo()
        this.loadProject()
        this.testToken()
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
            this.$http.post("projects/",this.project, { headers: { "Authorization": "JWT " + localStorage.token, "content-type": "application/json" } }
            ).then(result => {
                this.project = result.data
                window.confirm("Projeto criado com Sucesso")
                this.$router.push("/home")
                this.CreateSucess(result)
            },
            error => {
                error.log(error)
            })
        },

        CreateSucess (response){
            if(!response.data){
                this.CreateFail()
                return
            }
        },
        CreateFail (){
            window.confirm("Falha na criação do projeto")
        },
        testToken(){
            this.$http.post("obtain-token/", { "username": this.user.username, "password": "senhabanda"}).then(result => {
                localStorage.token = result.data.token
            })
        }
    },
}
</script>

<style>

::placeholder { /* Most modern browsers support this now. */
   color:    #132a71;
}

</style>
