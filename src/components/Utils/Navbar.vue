<template>
  <div id="app">
    <header class="parallax">
      <div class="filter">
        <nav class="navbar">
          <div class="nav-wrapper">
            <router-link
              :to="{name: 'LandingPage'}"
              class="brand-logo">
              <span class="fa fa-eye">OBSERV</span>
            </router-link>
            <a
              href="#/"
              data-target="mobile-menu"
              class="sidenav-trigger">
              <i class="material-icons">menu</i>
            </a>
            <ul
              v-if="!currentUser"
              class="right hide-on-med-and-down">

              <modal
                v-show="isModalVisibleLogin"
                @close="closeModalLogin"/>
              <a @click="showModalLogin">
                <li class="navbar-item">
                  <span class="fa fa-sign-in">Login</span>
                </li>
              </a>
            </ul>
            <ul
              v-if="!currentUser"
              class="right hide-on-med-and-down">
              <modalRegister
                v-show="isModalVisibleRegister"
                @closed="closeModalRegister"/>
              <a @click="showModalRegister">
                <li class="navbar-item">
                  <span class="fa fa-arrow-up">Registrar</span>
                </li>
              </a>
            </ul>
            <ul
              v-if="currentUser"
              class="right hide-on-med-and-down">
              <a
                v-on:
                @click="Logout()">
                <li class="navbar-item">
                  <span class="fa fa-sign-out">Logout</span>
                </li>
              </a>
            </ul>
            <ul
              v-if="!currentUser"
              class="right hide-on-med-and-down">
              <router-link :to="{name: 'ListProjects'}">
                <li class="navbar-item">
                  <span class="fa fa-area-chart">Projetos</span>
                </li>
              </router-link>
            </ul>
            <ul
              v-if="currentUser"
              class="right hide-on-med-and-down">
              <li class="navbar-item">
                Bem Vindo {{ currentUser.name }}
              </li>
            </ul>
            <ul
              v-if="currentUser"
              class="right hide-on-med-and-down">
              <router-link :to="{name: 'HomePage'}">
                <li class="navbar-item">
                  <span class="fa fa-dashboard">Dashboard</span>
                </li>
              </router-link>
            </ul>
          </div>
        </nav>
        <ul
          v-if="!currentUser"
          id="mobile-menu"
          class="sidenav grey darken-4 grey-text text-lighten-4 collection">
          <router-link :to="{name: 'Login'}">
            <li class="collection-item">
              <span class="fa fa-sign-in">Login</span>
            </li>
          </router-link>

          <router-link :to="{name: 'CreateUser'}">
            <li class="collection-item">
              <span class="fa fa-arrow-up">Registrar</span>
            </li>
          </router-link>

          <router-link :to="{name: 'ListProjects'}">
            <li class="collection-item">
              <span class="fa fa-area-chart">Projetos</span>
            </li>
          </router-link>
        </ul>
        <ul
          v-if="currentUser"
          id="mobile-menu"
          class="sidenav grey darken-4 grey-text text-lighten-4 collection">
          <router-link :to="{name: 'HomePage'}">
            <li class="collection-item">
              <span class="fa fa-sign-in">Bem vindo {{ currentUser.name }}</span>
            </li>
          </router-link>
          <router-link :to="{name: 'ProjectDetail'}">
            <span class="fa fa-sign-in">Criar observatório</span>
          </router-link>
        </ul>
        <div
          id="teste"
          class="container center-align" >
          <h2>Sua <b>pesquisa</b>, gerenciada do <b>seu</b> jeito</h2>
          <p>Cadastre-se e gerencie sua pesquisa</p>
          <form
            action=""
            method="post"
            class=" hide-on-med-and-down" >
            <input
              type="text"
              placeholder="Procurar...">
            <button
              type="submit"
              class="waves-effect waves-light btn-large cyan darken-2">
              <span class="fa fa-search">Buscar</span>
            </button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import modal from "@/components/Modals/modal"
import modalRegister from "@/components/Modals/modalRegister"

export default {
    components: {
        modal,
        modalRegister
    },

    data () {
        return {
            user: { //Get currentUser information
                username: "",
                email: "",
                id: ""
            },
            isModalVisibleLogin: false,
            isModalVisibleRegister: false
        }
    },

    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },

    beforeMount() {
        this.menuMobile()
        this.loadUserInfo()
    },


    methods: {
        showModalLogin() {
            this.isModalVisibleLogin = true
        },
        closeModalLogin() {
            this.isModalVisibleLogin = false
        },
        showModalRegister() {
            this.isModalVisibleRegister = true
        },
        closeModalRegister() {
            this.isModalVisibleRegister = false
        },

        menuMobile() {
            (document).ready(function() {
                (".sidenav").sidenav()
            })
        },

        Logout() {
            this.$http.post("rest-auth/logout/", this.user, {
                headers: { "content-type": "application/json" }
            }).then(result => {
                this.LogoutSucess(result)
            },

            error => {
                this.LoginFail()
                error.log(error)
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
    },


}
</script>

<style>
body {
  font-family: "Oxygen", Arial, Helvetica, sans-serif;
}

header {
  height: 100vh;
}

p {
  letter-spacing: 0.1em;
  font-size: 1.1em;
}

header .navbar,
header {
  color: #efefef;
}

header .container {
  margin-top: 20vh;
  margin-bottom: auto;
}

form,
button[type="submit"] {
  margin-top: 1em;
}

section {
  padding-top: 6em;
  padding-bottom: 6em;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  letter-spacing: 0.101em;
  font-family: "Titillium Web", Arial, Helvetica, sans-serif;
}

footer .row {
  margin-bottom: 0;
}

.parallax {
  background-image: url("../../assets/laptop.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.filter {
  background-color: rgba(10, 10, 10, 0.6);
  height: 100%;
}

.card-content {
  font-size: 1.5em;
}

.card-content .metric {
  color: #42a5f5;
  font-size: 1.8em;
  font-weight: bold;
}

#to-page-top-btn {
  position: fixed;
  right: 0.6em;
  bottom: 0.6em;
  padding: 0.7em 1em;
  text-decoration: none;
  background-color: rgba(10, 10, 10, 0.6);
}

#stats {
  background-color: #ddd;
}

.navbar {
  background-color: #2b4a6ef1;
}

#mobile-menu a,
.collection-item {
  font-size: 1.1em;
  background-color: inherit !important;
  color: inherit !important;
}

::placeholder {
  /* Most modern browsers support this now. */
  color: #ffffff;
}

@media (min-width: 993px) {
  .navbar {
    padding: 1em;
    background-color: transparent !important;
    box-shadow: none;
    color: black;
    position: static;
  }

  .navbar-item {
    font-size: 1.2em;
    padding-left: 0.7em;
    padding-right: 0.7em;
  }

  .navbar-item:hover {
    background-color: rgba(200, 200, 200, 0.5);
  }

  .navbar a {
    color: inherit !important;
  }

  .parallax {
    background-attachment: static;
  }
}
</style>
