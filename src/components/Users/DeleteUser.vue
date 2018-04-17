<template>
<div id="delete-user" class="modal grey lighten-4">
  <div class="modal-content container center-align">
    <div class="row">
      <h4>
        Deletar Usuário ?
      </h4>
        <div class="col s6">
          <button v-on:click="sendData()" type="submit" class="model-close col s12 btn-large red lighten-1 waves-effect waves-green">
            <span class="fa fa-trash"></span> Sim
          </button>
        </div>
        <div class="col s6">
          <button v-on:click="modalScript()" type="submit" class="model-close col s12 btn-large blue lighten-1 waves-effect waves-green">
            <span class="fa fa-cancel"></span> Não
          </button>
        </div>
    </div>
  </div>
</div>


</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'DeleteUser',
  components: {
  },
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
        console.log("chegou aqui carai")
        this.$http.delete('http://localhost:8000/users/' + this.currentUser.id + '/',
                       { headers: { 'Authorization': 'JWT ' + localStorage.token } }).then(result => {
                         this.DeleteSucess(result)
        },error => {
          this.updateFail()
        });
    },
    DeleteSucess(response){
      if(response.data){
        this.DeleteFail()
        return
      }
      this.$http.post('http://localhost:8000/obtain-token/', { 'username': this.user.username, 'password': this.user.password}).then(result => {
        localStorage.token = result.data.token
      })
      this.$store.dispatch('logout')//trigger da ação de logout implementado em store/auth.js
      delete localStorage.token
      window.confirm("USER DELETADO")
      this.$router.push('/')
      location.reload();

    },
    updateFail() {
      window.confirm("Falha no DELETE")
      this.$router.replace('/')
    },
    testToken(){
      this.$http.post('http://localhost:8000/obtain-token/', { 'username': this.user.username, 'password': this.user.password}).then(result => {
      localStorage.token = result.data.token
      })
    },
    modalScript () {
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
</style>
