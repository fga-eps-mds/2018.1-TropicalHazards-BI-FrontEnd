<template>
  <div class = "EditUser">

  <div class="row">
    <div class ="col s12">

      <div class="row">
          <div class="container center-align">
          <h1> EDITAR USUÁRIO </h1>
          <input type="text" v-model="user.username" />
          <input type="password" v-model="user.password"   />
          <input type="text" v-model="user.email" placeholder="Email" />
          <a v-on:click="sendData ()" class="waves-effect waves-light btn-large">Editar</a>
        </div>

        <br />
        <br />

        <p> {{ response_put }}</p>

     </div>
    </div>
  </div>


</div>

</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'EditUser',
  data () {
    return {
      user: {
          username: "",
          password: "",
          email: ""
      },
      headers: {
        Authorization: 'JWT' + localStorage.token
      },
      response_get: "",
      response_put:""

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
        console.log("chegou aqui carai")
        this.$http.put('http://localhost:8000/rest-auth/user/', this.user, this.headers).then(result => {
          response_put = result.data
          console.log("porra")
        })
    }
  },
  beforeMount(){
    this.loadUserInfo()
  }
}
</script>

<style>
</style>
