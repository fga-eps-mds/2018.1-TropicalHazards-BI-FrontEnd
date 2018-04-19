<template>

 <div id="app ">
 
 <nav class="navbar hide-on-med-and-up">
 <div class="nav-wrapper">
   <a href="#/" data-target="mobile-menu" class="sidenav-trigger">
   <i class="material-icons">menu</i>
   </a>
  </div>
   </nav>

  <div class="row grey lighten-4">
    <sidebar></sidebar>
    <div id="content" class="col m11" >
      <div class="header center-align white">
        <h3>Home</h3>
      </div>
      <div class="grey lighten-4">
        <div class="custom-container">
          <h5> <span class="fa fa-line-chart"></span>Estatísticas de perfil</h5>
          <div class="row">
            <div class="col s12 m4">
              <div class="card">
                <div class="card-content">
                  <span class="card-title">{{projects.length}}</span>
                  <p>Projetos ativos</p>
                </div>
              </div>
            </div>
            <div class="col s12 m4">
              <div class="card">
                <div class="card-content">
                  <span class="card-title">1</span>
                  <p>Observatórios</p>
                </div>
              </div>
            </div>
            <div class="col s12 m4">
              <div class="card">
                <div class="card-content">
                  <span class="card-title">1</span>
                  <p>Contribuidor(es)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="custom-container">
          <h5>
            Projetos
          </h5>
          <div class="row" id="projects">
            <div v-for="project in projects" :key="project.id" class="col s12 m4 l3">
              <div class="truncate card grey lighten-5">
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

                <router-link :to="{ name: 'EditProject', params: { id: project.id } }"
                                    class="btn blue lighten-1" >
                    <span class="fa fa-edit"></span>
                </router-link>

                  <!-- <a href="#delete-proj" class="modal-trigger btn red">
                    <span class="fa fa-remove"></span>
                  </a> -->

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

      <!-- Menu Side bar for mobile -->

  <ul class="sidenav grey darken-4 grey-text
             text-lighten-4 collection" id="mobile-menu">
    <router-link :to="{ name: 'HomePage'}">
    <img  src="../../assets/v3_rect.png" alt="" class="imageSideBar responsive-img" />
  </router-link>
   <router-link :to="{name: 'HomePage'}">
     <li class="collection-item">
       <span class="fa fa-sign-in"></span> Bem vindo {{currentUser.name}}
     </li>
   </router-link>
     <router-link :to="{name: 'CreateProject'}">
       <li class="collection-item">
         <span class="fa fa-plus"></span> Criar Projeto
       </li>
     </router-link>

     <router-link :to="{name: 'EditUser'}">
       <li class="collection-item">
         <span class="fa fa-edit"></span> Editar Perfil
       </li>
     </router-link>

     <router-link :to="{name: 'DeleteUser'}">
       <li class="collection-item">
         <span class="fa fa-trash"></span> Deletar Perfil
       </li>
     </router-link>
     <a v-on:click="Logout()" href="#">
       <li class="collection-item">
         <span class="fa fa-sign-out"></span> Logout
       </li>
     </a>
  </ul>
    <!-- Menu Side bar for mobile -->

<modal-delete-proj></modal-delete-proj>
</div>
</template>

<script>
/* eslint-disable */
import {mapGetters} from 'vuex'
import SideBar from '@/components/Utils/SideBar'
import modalDeleteProject from '@/components/Modals/modalDeleteProject'

export default {

  components: {
    'sidebar': SideBar,
    'modal-delete-proj': modalDeleteProject
  },
  data () {
    return {
      projects: [],
      user: {
        username: '',
        password: '',
        email: ''
      },
      isModalVisible: false
    }
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  methods: {

    deleteProject () {
      this.$http.delete('project/' + this.projeto.id + '/',
        { headers: { 'Authorization': 'JWT ' + localStorage.token } }).then(result => {
        window.alert('projeto deletado')
      },
      error => {
        console.error(error)
      })
    },
    getProject () {
      this.$http.get('projects/', { headers: { 'content-type': 'application/json' } }).then(result => {
        this.projects = result.data
      },
      error => {
        console.error(error)
      })
    },
    loadUserInfo () {
      this.user.id = this.currentUser.id
      this.user.username = this.currentUser.name
      this.user.email = this.currentUser.email
    },
    showModal () {
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    },
    modalScript () {
      (document).ready(function () {
        ('.modal').modal()
      })
      (document).ready(function () {
        ('select').formSelect()
      })
    },
    menuMobile () {
      $(document).ready(function () {
        $('.sidenav').sidenav();
      });
  },
    Logout () {
    this.$http.post('rest-auth/logout/', this.user, { headers: { 'content-type': 'application/json'} }).then(result => {
      this.$store.dispatch('logout')//trigger da ação de login implementado em store/auth.js
      delete localStorage.token
      this.$router.replace('/')
    },
    error => {
        this.LoginFail()
        console.error(error)
    })
  },

},
  beforeMount () {
    this.loadUserInfo()
    this.getProject()
    this.menuMobile()
  }

}
</script>

<style>

#mobile-menu a,
.collection-item {
  font-size: 1.1em;
  background-color: inherit !important;
  color: inherit !important;
}

.imageSideBar{
  padding-left: 100px;
  padding-top: 10px;
}

</style>
