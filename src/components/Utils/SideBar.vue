<template>
  <div class="wrapper">
    <nav id="sidebar">
      <div class="sidebar-header">
        <span class="fa fa-user"/>
        {{ username }}
        <span class="fa fa-bolt"/>
        <form action="">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Busca">
            <div class="input-group-append">
              <button class="btn">
                <span class="fa fa-search"/>
              </button>
            </div>
          </div>
        </form>
      </div>
      <ul class="list-unstyled sidebar-links list-group text-capitalize">
        <li>
          <router-link
            :to="{ name: '' }"
            class="list-group-item">
            Projetos <span class="fa fa-plus"/>
          </router-link>
          <ul class="list-group">
            <li>
              <router-link
                :to="{ name: '' }"
                class="list-group-item">
                ver projetos
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: '' }"
                class="list-group-item">
                meus projetos
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: '' }"
                class="list-group-item">
                criar projeto
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link
            :to="{ name: '' }"
            class="list-group-item">
            dashboards <span class="fa fa-plus"/>
          </router-link>
          <ul class="list-group">
            <li>
              <router-link
                :to="{ name: '' }"
                class="list-group-item">
                ver dashboards
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: '' }"
                class="list-group-item">
                minhas dashboards
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <a href="http://github.com/fga-gpp-mds/2018.1-TropicalHazards-BI">
            <span class="fa fa-github"/> github
          </a>
        </li>
        <li>
          <a href="http://fga-gpp-mds.github.io/2018.1-TropicalHazards-BI">
            <span class="fa fa-repository"/> docs
          </a>
        </li>
      </ul>
    </nav>
  </div>
  <!-- <div
    id="sidebar"
    class="hide-on-small-only col m1 center-align grey lighten-4">
    <ul class="">
      <router-link :to="{ name: 'LandingPage'}">
        <img
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
      <router-link
        :to=" { name: 'CreateProject'}"

        class="modal-trigger sidebar-icon">
        <li
          class="tooltipped"
          data-position="right"
          data-tooltip="New Proj">
          <span class="fa fa-plus"/>
        </li>
      </router-link>
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
  </div> -->
</template>


<script>
import { mapGetters } from "vuex"

export default {
    components: {

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

<style lang="scss" scoped>
  @import '@/components/styles/base.scss';

  .wrapper {
    display: flex;
  }

  #sidebar {
    min-width: 250px;
    max-width: 250px;
    height: 10vw;
    background-color: $alt-background-color;
    color: $alt-font-color;
  }
</style>
