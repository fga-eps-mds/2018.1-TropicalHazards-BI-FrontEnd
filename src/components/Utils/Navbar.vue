<template>
 <div id="app">
  <header class="parallax">
    <div class="filter">
      <!--
        navbar e o header aqui estão juntos por conta do efeito desejado
      -->
      <nav class="navbar">
        <div class="nav-wrapper">
          <router-link :to="{name: 'LandingPage'}" class="brand-logo">
            <span  class="fa fa-eye"></span> OBSERV
          </router-link>
          <router-link :to="{name: ' ' }" data-target="mobile-menu" class="sidenav-trigger">
            <i class="material-icons">menu</i>
          </router-link>
          <ul v-if="!currentUser" class="right hide-on-med-and-down">

              <modal v-show="isModalVisible" @close="closeModal"/>
               <a @click="showModal">
                <li class="navbar-item">
                  <span class="fa fa-sign-in"></span> Login
                </li>
              </a>
          </ul>
          <ul v-if="currentUser" class="right hide-on-med-and-down">
            <a v-on:click="Logout()">
              <li class="navbar-item">
                <span class="fa fa-sign-out"></span> Logout
              </li>
            </a>
        </ul>
          <ul v-if="!currentUser" class="right hide-on-med-and-down">
            <router-link :to="{name: 'ListProjects'}">
              <li class="navbar-item">
                <span class="fa fa-chart"></span> Projetos
              </li>
            </router-link>
          </ul>
          <ul v-if="currentUser" class="right hide-on-med-and-down">
            <li class="navbar-item">
              Bem Vindo {{ currentUser.name }}
            </li>
          </ul>
          <ul v-if="currentUser" class="right hide-on-med-and-down">
              <router-link :to="{name: 'HomePage'}">
              <li class="navbar-item">
                <span class="fa fa-dashboard"></span> Dashboard
              </li>
              </router-link>
          </ul>
        </div>
      </nav>
      <ul v-if="!currentUser" class="sidenav grey darken-4 grey-text
                                     text-lighten-4 collection" id="mobile-menu">
        <router-link :to="{name: 'Login'}">

          <li class="collection-item">
            <span class="fa fa-sign-in"></span> Login
          </li>
        </router-link>
      </ul>
      <ul v-if="currentUser" class="sidenav grey darken-4 grey-text
                                    text-lighten-4 collection" id="mobile-menu">
          <router-link :to="{name: 'HomePage'}">
          <li class="collection-item">
            <span class="fa fa-sign-in"></span> Bem vindo {{currentUser.name}}
          </li>
          </router-link>
        <router-link :to="{name: 'Projects'}">
          <li class="collection-item">
            <span class="fa fa-sign-in"></span> Criar observatório
          </li>
        </router-link>
      </ul>
      <div class="container center-align" id="teste">
          <h2>Sua <b>pesquisa</b>, gerenciada do <b>seu</b> jeito</h2>
          <p>Cadastre-se e gerencie sua pesquisa</p>
          <form action="" method="post" class=" hide-on-med-and-down" >
            <input type="text" placeholder="Procurar...">
              <button type="submit" class="waves-effect waves-light btn-large cyan darken-2">
              <span class="fa fa-search">Buscar</span>
              </button>
          </form>
      </div>
    </div>
  </header>
</div>
</template>

<script>
/* eslint-disable */
// FIXME this function is breaking the tests.
// $(document).ready(function () {
//   $('.sidenav').sidenav();
// });

import {mapGetters} from 'vuex'
import modal from '@/components/Modals/modal'

export default {
  name: 'Navbar',
  components: {
    modal
  },

  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },

  data () {
    return {

    user: { //Get currentUser information
      username: "",
      email: "",
      id:""
    },
    isModalVisible: false,

    }
  },
  methods: {
    showModal() {
        this.isModalVisible = true;
      },
    closeModal() {
        this.isModalVisible = false;
      },

      menuMobile (){
        $(document).ready(function () {
         $('.sidenav').sidenav();
        });
      },

      Logout(){
      this.$http.post("rest-auth/logout/", this.user).then(result => {
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
    this.menuMobile()
    this.loadUserInfo()
  }
}

</script>

<style>
body {
  font-family: 'Oxygen', Arial, Helvetica, sans-serif;
}

header {
  height: 100vh;
}

p {
  letter-spacing: .1em;
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
button[type='submit'] {
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
  letter-spacing: .101em;
  font-family: 'Titillium Web', Arial, Helvetica, sans-serif;
}

footer .row {
  margin-bottom: 0;
}

.parallax {
  background-image: url('../../assets/laptop.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.filter {
  background-color: rgba(10, 10, 10, .6);
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
  right: .6em;
  bottom: .6em;
  padding: .7em 1em;
  text-decoration: none;
  background-color: rgba(10, 10, 10, .6);
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

::placeholder { /* Most modern browsers support this now. */
   color:    #ffffff;
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
    padding-left: .7em;
    padding-right:.7em;
  }

  .navbar-item:hover {
    background-color: rgba(200, 200, 200, .5);
  }

  .navbar a {
    color: inherit !important;
  }

  .parallax {
    background-attachment: static;
  }


}
</style>
