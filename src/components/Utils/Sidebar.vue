<template>
  <nav class="dark-bg side-bar-expanded">
    <div class="nav-header">
      <div
        v-if="!currentUser">
        <router-link
          :to="{ name: 'Auth' }"
          id="log-or-reg"
          class="text-left dark-bg h6">
          Entrar ou registrar
        </router-link>
      </div>
      <div
        v-else>
        <h6 class="text-left">
          <span class="fa fa-user"/>
          {{ (user.username == '') ? 'username' : user.username }}
        </h6>
        <h6>
          <small>
            <a
              class=""
              @click="logout()">
              <span class="fa fa-sign-out"/>
              Sair
            </a>
          </small>
        </h6>
        <h6 class="text-muted">
          <span class="mr-auto fa fa-gear"/>
          <small>
            Configurações
          </small>
        </h6>
      </div>
      <div class="input-group input-group-sm">
        <input
          v-model="search"
          class="form-control custom-field"
          type="text"
          placeholder="Pesquisar">
        <div class="input-group-append">
          <button class="btn btn-outline btn-sm btn-grey">
            <span class="fa fa-search"/>
          </button>
        </div>
      </div>
    </div>
    <hr>
    <ul class="list-group text-capitalize">
      <router-link
        :to="{ name: 'HomePage' }"
        class="list-group-item">
        <span class="fa fa-home"/> home
      </router-link>
      <li class="list-group-item disabled">
        <span class="fa fa-pie-chart"/> Dashboards
      </li>
      <router-link
        v-if="currentUser"
        :to="{ name: 'MyDashboards' }"
        class=" list-group-item">
        Meus Dashboards
      </router-link>
      <router-link
        :to="{ name: '' }"
        class="list-group-item">
        Procurar Dashboards
      </router-link>
      <div class="list-group-item disabled">
        <span class="fa fa-folder"/> Projetos
      </div>
      <router-link
        v-if="currentUser"
        :to="{ name: 'MyProjects' }"
        class=" list-group-item">
        Meus Projetos
      </router-link>
      <router-link
        v-if="currentUser"
        :to="{ name: 'CreateProject' }"
        class=" list-group-item">
        Novo Projeto
      </router-link>
      <router-link
        :to="{ name: '' }"
        class="list-group-item">
        Procurar Projetos
      </router-link>
      <a
        href="https://github.com/fga-gpp-mds/2018.1-TropicalHazards-BI"
        target="_blank"
        class="list-group-item">
        <span class="fa fa-github"/> github
      </a>
      <a
        href="https://fga-gpp-mds.github.io/2018.1-TropicalHazards-BI/"
        target="_blank"
        class="list-group-item">
        <span class="fa fa-book"/> docs
      </a>
    </ul>
  </nav>
</template>


<script>
import { mapGetters } from "vuex"

export default {
    components: {

    },
    data() {
        return {
            search: "",
            user: {
                username: "",
                id: "",
                email: ""
            }
        }
    },

    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },

    beforeMount () {
        this.loadUserInfo ()
    },
    methods: {

        logout () {
            this.$store.dispatch("logout") //trigger da ação de login implementado em store/auth.js
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
  @import '../styles/base.scss';

  nav {
    min-height: 100%;
    overflow: auto;
    font-family: $text-font-family;
    letter-spacing: .1em !important;
    left: 0 !important;
    font-size: .8em;

    hr {
      margin: 0;
      border-color: #555;
    }

    input {
      background-color: #444;
      border: none;
      color: $alt-text-color;

      &:focus, &:active {
        background-color: #555!important;
        outline: none;
      }

      &::placeholder {
        color: #999;
      }
    }

    .input-group {
      margin-top: 1em;
    }

    .list-group-item {
      color: inherit;
      background-color: inherit;
      border: none;
    }

    .text-capitalize > a.list-group-item {
      border-left: 3px solid transparent;
      transition: all .3s ease-in-out;

      &:hover {
        border-color: $highlight-text-color;
        transition: all .3s ease-in-out;
      }
    }

    #log-or-reg {
      text-decoration: none;
    }

    .nav-header {
      padding: 2em .6em;
    }
  }
</style>
