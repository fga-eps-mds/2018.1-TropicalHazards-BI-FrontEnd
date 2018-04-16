<template>
  <header class="parallax">
    <div class="filter">

      <!--
        navbar e o header aqui estão juntos por conta do efeito desejado
      -->
      <nav class="navbar">
        <div class="nav-wrapper">
          <a href="#/" class="brand-logo">
            <span class="fa fa-eye"></span> OBSERV
          </a>
          <a href="#/" data-target="mobile-menu" class="sidenav-trigger">
            <i class="material-icons">menu</i>
          </a>
          <ul v-if="!currentUser" class="right hide-on-med-and-down">
             <button type="button" class="btn" @click="showModal">Login!</button>
              <modal v-show="isModalVisible" @close="closeModal"/>
          </ul>
          <ul v-if="currentUser" class="right hide-on-med-and-down">
            <a v-on:click="Logout()">
              <li class="navbar-item">
                <span class="fa fa-sign-out"></span> Logout
              </li>
            </a>
        </ul>
          <ul v-if="currentUser" class="right hide-on-med-and-down">
            <li class="navbar-item">
              Bem Vindo {{ currentUser.name }}
            </li>
          </ul>
          <ul class="right hide-on-med-and-down">
            <a href="#/listprojet/">
              <li class="navbar-item">
                <span class="fa fa-bar-chart"></span> Observatórios
              </li>
            </a>
        </ul>
          <ul v-if="currentUser" class="right hide-on-med-and-down">
            <a href="#/home/">
              <li class="navbar-item">
                <span class="fa fa-dashboard"></span> Dashboard
              </li>
            </a>
        </ul>

        </div>
      </nav>
      <ul v-if="!currentUser" class="sidenav grey darken-4 grey-text text-lighten-4 collection" id="mobile-menu">
        <a href="#">
          <li class="collection-item">
            <span class="fa fa-sign-in"></span> Login
          </li>
        </a>
      </ul>
      <ul v-if="currentUser" class="sidenav grey darken-4 grey-text text-lighten-4 collection" id="mobile-menu">
        <a href="#">
          <li class="collection-item">
            <span class="fa fa-sign-in"></span> Bem vindo {{currentUser.name}}
          </li>
        </a>
        <a href="#/projetos">
          <li class="collection-item">
            <span class="fa fa-sign-in"></span> Criar observatório
          </li>
        </a>
      </ul>

      <div class="container center-align" id="teste">
        <h2>
          Sua <b>pesquisa</b>, gerenciada do <b>seu</b> jeito
        </h2>
        <p>
          lorem ipsum dolor sit amet
        </p>
        <form action="" method="post" class=" hide-on-med-and-down" >
          <input type="text" placeholder="Procurar...">
          <button type="submit" class="waves-effect waves-light btn-large cyan darken-2">
            <span class="fa fa-search"></span>
            Buscar
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>

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
  },

  beforeMount(){
    this.menuMobile()
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
