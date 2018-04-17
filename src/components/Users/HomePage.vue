<template>
 <div id="app ">
  <div class="row grey lighten-4">
    <sidebar></sidebar>
    <div id="content" class="col m11" >
      <div class="header center-align white">
        <h3>
          Home
        </h3>
      </div>
      <div class="grey lighten-4">
        <div class="custom-container">
          <h5>Estatísticas de perfil</h5>
          <div class="row">
            <div class="col s12 m4">
              <div class="card">
                <div class="card-content">
                  <span class="card-title">{{projects.length}}</span>
                  <p>
                    Projetos ativos
                  </p>
                </div>
              </div>
            </div>
            <div class="col s12 m4">
              <div class="card">
                <div class="card-content">
                  <span class="card-title">37</span>
                  <p>
                    Observatórios
                  </p>
                </div>
              </div>
            </div>
            <div class="col s12 m4">
              <div class="card">
                <div class="card-content">
                  <span class="card-title">162</span>
                  <p>
                    Contribuidores
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="custom-container">
          <h5>
            Projetos
          </h5>
          <div class="row">
            <div v-for="project in projects" :key="project.id" class="col s12 m4 l3">
              <div class="card grey lighten-5">
                <div class="card-content grey-text text-darken-2">
                  <span style="font-size:20px" class="card-title">{{ project.name }}</span>
                    <p> Descrição: {{project.description }} </p>
                    <p> IdProjeto: {{project.id }} </p>
                    <p> IdUser: {{project.user }} </p>
                </div>
                <div class="card-action center-align grey-text text-lighten-2">
                <router-link :to="{ name: 'ProjectDetail', params: { id: project.id } }"
                                    class="btn blue lighten-1" >
                    <span class="fa fa-search"></span>
                </router-link>
                  <a href="#" class="btn  blue lighten-1">
                    <span class="fa fa-edit"></span>
                  </a>
                  <a href="#delete-proj" class="modal-trigger btn red">
                    <span class="fa fa-remove"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
<modal-delete-proj></modal-delete-proj>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import SideBar from '@/components/Utils/SideBar'
import modalDeleteProject from '@/components/Modals/modalDeleteProject'

export default {

  components: {
    'sidebar': SideBar,
    'modal-delete-proj': modalDeleteProject
  },
  data(){
    name: 'HomePage'
    return {
      projects: [],
      user: {
          username: "",
          password: "",
          email: ""
      },
      isModalVisible: false,
    }
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  methods: {


     deleteProject (){
      if(currentUser.id == projeto.user){
        this.$http.delete('http://localhost:8000/project/' + this.projeto.id + '/',
                        { headers: { 'Authorization': 'JWT ' + localStorage.token } }).then(result => {
                          window.alert("projeto deletado")
                          console.log("deu merda")

      },error => {
       console.log("deu merda")
    });
  }
},
    getProject(){
      this.$http.get("http://localhost:8000/projects/",  { headers: { "content-type": "application/json" } }).then(result => {
      this.projects = result.data;
      },
      error => {
          console.error(error);
      });
    },
    loadUserInfo (){
      this.user.id = this.currentUser.id
      this.user.username = this.currentUser.name
      this.user.email = this.currentUser.email
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
     this.isModalVisible = false;
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
      this.getProject()
      this.loadUserInfo()
      this.modalScript()
 },
}
</script>

<style>

p {
  font-size: 15px;
}

</style>
