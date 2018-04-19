<template>
   <div id="sidebar" class="hide-on-small-only col m1 center-align grey lighten-4">
      <ul class="">
        <router-link :to="{ name: 'LandingPage'}">
          <img src="../../assets/v3_round.png" alt="" class="responsive-img circle center" />
        </router-link>
        <router-link :to="{name: 'HomePage'}" class="">
          <li class="">
            <p> {{currentUser.name}}</p>
          </li>
        </router-link>
        <router-link :to="{ name: 'HomePage'}" class="sidebar-icon">
          <li class="tooltipped" data-position="right" data-tooltip="Home">
            <span class="fa fa-home"></span>
          </li>
        </router-link>
        <router-link :to="{name: 'HomePage'}" class="sidebar-icon">
          <li class="tooltipped" data-position="right" data-tooltip="Projetos">
            <span class="fa fa-th"></span>
          </li>
        </router-link>
        <router-link :to="{name: 'HomePage'}" class="sidebar-icon">
          <li class="tooltipped"  data-position="right" data-tooltip="Observatórios">
            <span class="fa fa-area-chart"></span>
          </li>
        </router-link>
        <a href="#edit-user" class="modal-trigger sidebar-icon">
          <li class="tooltipped" data-position="right" data-tooltip="Edit">
            <span class="fa fa-gear"></span>
          </li>
        </a>
        <a href="#new-proj" class="modal-trigger sidebar-icon">
          <li class="tooltipped" data-position="right" data-tooltip="Edit">
            <span class="fa fa-plus"></span>
          </li>
        </a>
        <a href="#delete-user" class="modal-trigger sidebar-icon">
          <li class="tooltipped" data-position="right" data-tooltip="Edit">
            <span class="fa fa-trash"></span>
          </li>
        </a>
        <a v-on:click="Logout()" class="sidebar-icon modal-trigger">
          <li class="tooltipped" data-position="right" data-tooltip="Sair">
            <span class="fa fa-sign-out"></span>
          </li>
        </a>
        <hr>
      </ul>
<modal-delete-user></modal-delete-user>
<modal-new-proj></modal-new-proj>
<modal-edit-user></modal-edit-user>
   </div>


</template>


<script>
/* eslint-disable */
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
    showModal () {
        this.isModalVisible = true;
      },
    closeModal() {
        this.isModalVisible = false;
      },
    Logout () {
      this.$http.post('rest-auth/logout/', this.user).then(result => {
        this.LogoutSucess(result)
      },
      error => {
          this.LoginFail()
          console.error(error)
      })
    },
    LogoutSucess (response) {
        this.$store.dispatch('logout')//trigger da ação de login implementado em store/auth.js
        delete localStorage.token
        this.$router.replace('/')
    },
    loadUserInfo () {
      this.user.id = this.currentUser.id;
      this.user.username = this.currentUser.name;
      this.user.email = this.currentUser.email;
    }
  }
};
</script>

<style>

</style>
