<template>
   <div id="sidebar" class="hide-on-small-only col m1 center-align grey lighten-4">
      <ul class="">
        <a href="" class="">
          <img src="../../assets/v3_round.png" alt="" class="responsive-img circle center" />
        </a>
        <a href="#/home" class="">
          <li class="">
            <p> {{currentUser.name}}</p>
          </li>
        </a>
        <a href="" class="sidebar-icon">
          <li class="tooltipped" data-position="right" data-tooltip="Home">
            <span class="fa fa-home"></span>
          </li>
        </a>
        <a href="" class="sidebar-icon">
          <li class="tooltipped" data-position="right" data-tooltip="Projetos">
            <span class="fa fa-th"></span>
          </li>
        </a>
        <a href="" class="sidebar-icon">
          <li class="tooltipped"  data-position="right" data-tooltip="Observatórios">
            <span class="fa fa-area-chart"></span>
          </li>
        </a>
        <a href="" class="sidebar-icon">
          <li class="tooltipped"  data-position="right" data-tooltip="Dados">
            <span class="fa fa-cubes"></span>
          </li>
        </a>
        <a href="" class="sidebar-icon">
          <li class="tooltipped"  data-position="right" data-tooltip="Gerenciar perfil">
            <span class="fa fa-gear"></span>
          </li>
        </a>
        <a href="" class="sidebar-icon">
          <li class="tooltipped" data-position="right" data-tooltip="Sair">
            <span class="fa fa-sign-out"></span>
          </li>
        </a>
        <a href="#edit-user" class="modal-trigger">
          <li class="">
            <p> Editar Perfil</p>
          </li>
        </a>
        <a href="#delete-user" class="modal-trigger">
          <li class="">
            <p> Deletar Perfil</p>
          </li>
        </a>
        <a href="#new-proj" class="modal-trigger">
          <li class="">
            <p> Criar Projeto</p>
          </li>
        </a>
        <a v-on:click="Logout()" class="modal-trigger">
          <li class="">
            <p> Sair</p>
          </li>
        </a>

        <hr>
      </ul>
<modal-edit-user></modal-edit-user>
<modal-delete-user></modal-delete-user>
<modal-new-proj></modal-new-proj>
   </div>


</template>


<script>
import {mapGetters} from 'vuex'
import modalNewProject from '@/components/Modals/modalNewProject'
import modalEditUser from '@/components/Modals/modalEditUser'
import DeleteUser from '@/components/Users/DeleteUser'

export default {
    components: {
    'modal-new-proj': modalNewProject,
    'modal-edit-user': modalEditUser,
    'modal-delete-user': DeleteUser
},
    data () {
      return {
        isModalVisible: false,
      }
    },

   computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },

  methods: {

    modalScript () {
        $(document).ready(function(){
        $('.modal').modal();
      });


      $(document).ready(function(){
        $('select').formSelect();
      });
    },
    Logout(){
      this.$http.post("http://localhost:8000/rest-auth/logout/", this.user, { headers: { "content-type": "application/json" } }).then(result => {
      this.LogoutSucess(result)
      },
      error => {
          this.LoginFail()
          console.error(error)
      });
    },
      LogoutSucess(response){
        this.$store.dispatch('logout')//trigger da ação de login implementado em store/auth.js
        delete localStorage.token
        this.$router.replace('/')
        },
    loadUserInfo (){
      this.user.id = this.currentUser.id
      this.user.username = this.currentUser.name
      this.user.email = this.currentUser.email
    }

  },
      beforeMount(){
      this.modalScript ()
 },

}


</script>



<style>

</style>
