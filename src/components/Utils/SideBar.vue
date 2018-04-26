<template>
  <div
    id="sidebar"
    class="hide-on-small-only col m1 center-align grey lighten-4">
    <ul class="">
      <router-link :to="{ name: 'LandingPage'}">
        <img
          src="../../assets/v3_round.png"
          class="responsive-img circle center" >
      </router-link>
      <li class="">
        <p> {{ currentUser.name }}</p>
      </li>
      <router-link
        :to="{ name: 'LandingPage' }"
        class="sidebar-icon">
        <li
          class="tooltipped"
          data-position="right"
          data-tooltip="Home">
          <span class="fa fa-home"/>
        </li>
      </router-link>
      <router-link
        :to="{ name: 'HomePage' }"
        class="sidebar-icon">
        <li
          class="tooltipped"
          data-position="right"
          data-tooltip="Projetos">
          <span class="fa fa-th"/>
        </li>
      </router-link>
      <a
        class="sidebar-icon">
        <li
          class="tooltipped"
          data-position="right"
          data-tooltip="Observatórios">
          <span class="fa fa-area-chart"/>
        </li>
      </a>
      <router-link
        :to="{ name: 'EditUser'}"
        class="modal-trigger sidebar-icon">
        <li
          class="tooltipped"
          data-position="right"
          data-tooltip="Edit">
          <span class="fa fa-gear"/>
        </li>
      </router-link>
      <a
        href="#new-proj"
        class="modal-trigger sidebar-icon">
        <li
          class="tooltipped"
          data-position="right"
          data-tooltip="New Proj">
          <span class="fa fa-plus"/>
        </li>
      </a>
      <a
        href="#delete-user"
        class="modal-trigger sidebar-icon">
        <li
          class="tooltipped"
          data-position="right"
          data-tooltip="Delete">
          <span class="fa fa-trash"/>
        </li>
      </a>
      <a
        class="sidebar-icon modal-trigger"
        v-on:
        @click="Logout()">
        <li
          class="tooltipped"
          data-position="right"
          data-tooltip="Sair">
          <span class="fa fa-sign-out"/>
        </li>
      </a>
      <hr>
    </ul>
    <ul
      v-if="!currentUser"
      id="mobile-menu">
      class="sidenav grey darken-4 grey-text text-lighten-4 collection"
      <router-link :to="{name: 'Login'}">

        <li class="collection-item">
          <span class="fa fa-sign-in"/>
        </li>
      </router-link>
    </ul>
    <modal-delete-user/>
    <modal-new-proj/>
    <modal-edit-user/>
  </div>


</template>


<script>
import { mapGetters } from "vuex"
import modalNewProject from "@/components/Modals/modalNewProject"
import modalEditUser from "@/components/Modals/modalEditUser"
import DeleteUser from "@/components/Users/DeleteUser"

export default {
    components: {
        "modal-new-proj": modalNewProject,
        "modal-edit-user": modalEditUser,
        "modal-delete-user": DeleteUser
    },
    data() {
        return {}
    },

    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },

    methods: {
        Logout() {
            this.$http.post("rest-auth/logout/", this.user, {
                headers: { "content-type": "application/json" }
            }).then(result => {
                this.LogoutSucess(result)
            },
            error => {
                this.LoginFail()
                error.log("erro")
            }
            )
        },

        LogoutSucess() {
            this.$store.dispatch("logout") //trigger da ação de login implementado em store/auth.js
            delete localStorage.token
            this.$router.replace("/")
        },
        loadUserInfo() {
            this.user.id = this.currentUser.id
            this.user.username = this.currentUser.name
            this.user.email = this.currentUser.email
        }
    }
}
</script>

<style>
::placeholder {
  /* Most modern browsers support this now. */
  color: #ffffff;
}
</style>
