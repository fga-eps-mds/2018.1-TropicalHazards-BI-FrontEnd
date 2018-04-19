<template>
<div id="edit-user" class="modal grey lighten-4">
  <div class="modal-content container center-align">
    <div class="row">
      <img src="../../assets/v3_rect.png" class="img-responsive">
      <h4>
        Editar Perfil
      </h4>
      <section class="modal-form">
        <form>
          <div class="input-field col s12">
            <input v-model="user.username" type="text" id="name" class="validate">
          </div>
          <div class="input-field col s12">
            <input v-model="user.email"  type="email" id="email" class="validate">
            <label for="email">E-mail</label>
          </div>
          <div class="input-field col s12">
            <input v-model="user.password" type="password" id="password" class="validate">
            <label for="password">Nova senha</label>
          </div>
          <button v-on:click="sendData ()" type="submit" class="model-close col s12 btn-large blue lighten-1 waves-effect waves-green">
            <span class="fa fa-sign-in"></span> Enviar
          </button>
        </form>
      </section>
    </div>
  </div>
</div>
</template>

<script>
/* eslint-disable */
import {mapGetters} from 'vuex'

export default {
  name: 'modalEditUser',
  data () {
    return {
      user: {
          username: "",
          password: "",
          email: ""
      },
      response_get: "",

    }
  },
  components: {
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
    sendData (){
        this.$http.put('users/' + this.currentUser.id + '/',
                       this.user,
                       { headers: { 'Authorization': 'JWT ' + localStorage.token } }).then(result => {
                         this.updateSucess(result)
        },error => {
          this.updateFail()
        });
    },
    updateSucess(response){
      if(!response.data){
        this.updateFail()
        return
      }
      this.$http.post('obtain-token/', { 'username': this.user.username, 'password': this.user.password}).then(result => {
        localStorage.token = result.data.token
      })
      window.alert("Usuário atualizado")
      this.$store.dispatch('update')
      this.$router.push('/home')
    },
    updateFail() {
      window.confirm("Falha no Update")
      this.$router.replace('/edituser')
    },
    testToken(){
      this.$http.post('obtain-token/', { 'username': this.user.username, 'password': this.user.password}).then(result => {
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
  beforeMount(){
    this.loadUserInfo()
    this.testToken()
    this.modalScript()
  }
}
</script>

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
