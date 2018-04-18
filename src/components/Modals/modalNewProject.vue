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
      console.log("chegou aqui")
      this.$http.post("http://localhost:8000/projects/",this.project, { headers: { 'Authorization': 'JWT ' + localStorage.token, "content-type": "application/json", "Authorization": "JWT" + localStorage.Token } }
                     ).then(result => {
      this.project = result.data;
      window.alert("Projeto criado com Sucesso")
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
    this.modalScript()
    this.loadUserInfo()
    this.loadProject()
    this.testToken()
  }
}
</script>
<template>
 <div id="new-proj" class="modal grey lighten-4">
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
                  <a class="modal-close btn-large grey lighten-1 white-text waves-effect waves-light">
                    <span class="fa fa-trash"></span> Cancelar
                  </a>
                  <button v-on:click="PostProject()" type="submit" class="modal-close btn-large blue lighten-1 white-text waves-effect waves-light">
                    <span class="fa fa-save"></span> Criar
                  </button>
                </form>
              </section>
            </div>
    </div>
</template>
<style>
  body {
  font-family: 'Oxygen', Arial, Helvetica, sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  letter-spacing: .101em;
  font-family: 'Titillium Web', Arial, Helvetica, sans-serif;
}

hr {
  border-style: dashed;
  border-color: #888888;
  margin-bottom: .5em;
}

.modal h4 {
  color: #42a5f5;
}

#login,
#new-proj {
  padding-top: 1em !important;
  max-height: 90% !important;
}
</style>
