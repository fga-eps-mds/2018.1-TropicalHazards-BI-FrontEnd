<template>
<div id="app">
  <div class="row grey lighten-4">
    <sidebar></sidebar>
    <div id="content" class="col m11">
      <div class="header center-align white">
        <h3>
          {{project.name}}
        </h3>
      </div>
  <div class="container center-align">
<div class="row">
   <div class="">
     <div class="card grey lighten-3">
       <div class="card-content black-text">
         <span style="color: grey;"><h4>Descrição</h4></span>
         <p style="text-align:justify">{{project.description}}</p>
       </div>

     </div>
   </div>
 </div>
  </div>
  <form>
    <div class="container center-align">
        <div class="row">
          <div class="input-field col s12">
            <input v-model="project.name"  id="name" type="text" class="validate">
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <textarea  v-model="project.description" id="deion" class="materialize-textarea"></textarea>
          </div>
        </div>
        <router-link :to="{ name: 'HomePage'}"
                            class=" btn-large grey lighten-1 white-text waves-effect waves-light">
           Cancelar
        </router-link>
        <a v-on:click="updateProject()" class=" btn-large blue lighten-1 white-text waves-effect waves-light">
           Atualizar
        </a>
    </div>
  </form>

    </div>

  </div>
</div>
</template>

<script>
/* eslint-disable */
import {mapGetters} from 'vuex'
import SideBar from '@/components/Utils/SideBar'
export default {
  name: 'EditUser',
  data () {
    return {
      project: {
          name: "",
          description: "",
          email: ""
      },
      response_get: "",

    }
  },
  components: {
    'sidebar': SideBar
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
    getProjectDetail (){
        this.$http.get('projects/' + this.$route.params.id + '/', { headers: { 'Authorization': 'JWT ' + localStorage.token } }).then(result => {
          this.project = result.data;
        },
        error => {
          console.error(error);
        });
    },
    updateProject (){
        this.$http.put('projects/' + this.$route.params.id + '/', this.project, { headers: { 'Content-Type': 'application/json', 'Authorization': 'JWT ' + localStorage.token } }).then(result => {
          window.alert("Projeto atualizado")
          this.$router.push('/project/detail/' + this.$route.params.id + '/')
          location.reload()
        },
        error => {
            console.error(error);
        });
    }
},
  beforeMount(){
    this.loadUserInfo()
    this.testToken()
  },
  created(){
    this.getProjectDetail()
  }
}
</script>

<style>

::placeholder { /* Most modern browsers support this now. */
   color:    #132a71;
}
</style>
