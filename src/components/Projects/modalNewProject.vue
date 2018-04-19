<script>
/* eslint-disable */
import {mapGetters} from 'vuex'
import JwtDecode from 'jwt-decode'
  export default {
  data(){
    name: 'modalNewProject'
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
      this.$http.post("projects/",this.project, { headers: { 'Authorization': 'JWT ' + localStorage.token, "content-type": "application/json", "Authorization": "JWT" + localStorage.Token } }
                     ).then(result => {
      this.projeto = result.data;
      this.postSucess(result)
    },
      error => {
          console.error(error);
      });
    },

    postSucess(response){
      window.alert("Projeto criado com Sucesso")
    },

    CreateFail (){
      window.confirm("Falha na criação do projeto")
    },
    testToken(){
    this.$http.post('obtain-token/', { 'username': this.user.username, 'password': 'senhabanda'}).then(result => {
    localStorage.token = result.data.token
    })
  },
    modalScript() {

        $(document).ready(function(){
        $('.modal').modal();
      });


      $(document).ready(function(){
        $('select').formSelect();
      });
     }
    },

  beforeMount() {
    this.loadUserInfo()
    this.loadProject()
    this.testToken()
  },

}
</script>
<template>
<div id="app">
 <div id="new-proj" class="modal">
            <div class="modal-content container center-align">
              <h4>Criar Projeto</h4>
              <section class="modal-form">
                <form>
                  <div class="row">
                    <div class="input-field col s12">
                      <input v-model="project.name" id="name" type="text" class="validate">
                      <label for="name">Nome do projeto</label>
                    </div>
                    <div class="input-field col s12">
                      <textarea v-model="project.description" id="deion" class="materialize-textarea"></textarea>
                      <label for="deion">Descrição do projeto</label>
                    </div>
                  </div>
                  <button type="submit" class="model-close col s12 btn-large grey lighten-1 waves-effect waves-green">
                    <span class="fa fa-trash"></span> Cancelar
                  </button>
                  <button v-on:click="()" type="submit" class="model-close col s12 btn-large blue lighten-1 waves-effect waves-green">
                    <span class="fa fa-save"></span> Criar
                  </button>
                </form>
              </section>
            </div>
    </div>
  </div>
</template>
<style>


</style>
