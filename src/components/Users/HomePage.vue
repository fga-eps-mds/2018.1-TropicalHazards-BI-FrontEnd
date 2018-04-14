<template>
 <div id="app">

     <div class="row">
    <div id="sidebar" class="hide-on-small-only col m1 center-align grey lighten-4">
      <ul class="">
        <a href="" class="">
          <img src="https://via.placeholder.com/60x60" alt="" class="responsive-img" />
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
        <a href="#/edituser" class="">
          <li class="">
            <p> Editar Perfil</p>
          </li>
        </a>
        <a href="#/deleteuser" class="">
          <li class="">
            <p> Deletar Perfil</p>
          </li>
        </a>
      </ul>
    </div>

    <div id="content" class="col m11">
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
                  <span class="card-title">8</span>
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
            Meus projetos
          </h5>
          <a href="#/projetos" class="btn-flat blue lighten-1 grey-text text-lighten-2">
            Novo projeto <span class="fa fa-plus"></span>
          </a>
          <div class="row">
            <div v-for="projeto in projetos" class="col s12 m4 l3">
              <div class="card grey lighten-5">
                <div class="card-content grey-text text-darken-2">
                  <span class="card-title">{{ projeto.name }}</span>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  </p>
                </div>
                <div class="card-action center-align grey-text text-lighten-2">
                  <a href="#" class="btn  blue lighten-1">
                    <span class="fa fa-search"></span>
                  </a>
                  <a href="#" class="btn  blue lighten-1">
                    <span class="fa fa-edit"></span>
                  </a>
                  <a href="#" class="btn  blue lighten-1">
                    <span class="fa fa-user-plus"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {

  data(){
    name: 'ListProject'
    return {
      projects: {
        name: "",
        description: ""

      },
      projetos: "",
      frase: '',

    }
  },
   computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },

  methods: {
    getProject(){
      console.log("chegou aqui")
      this.$http.get("http://localhost:8000/projects/",  { headers: { "content-type": "application/json" } }).then(result => {
      this.projetos = result.data;
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

  },

  beforeMount(){
    this.getProject()
    this.loadUserInfo()
 },

}
</script>

<style>
a {
  color: inherit !important;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  padding: .5em;
  margin: 0 !important;
}

.row {
  max-width: 100%;
}

.sidebar-icon li {
  font-size: 2em;
  margin-top: .5em;
  margin-bottom: .5em;
}

.card-title {
  font-weight: bold !important;
  color: #5252ff;
}

.header {
  border-bottom: 1px solid #999;
}

.custom-container {
  max-width: 100%;
  padding-right: 5%;
  padding-left: 5%;
}

#content {
  padding: 0;
}

#content .header h3 {
  margin: 0;
  padding: .3em;
}

#sidebar {
  height: 150vh;
  border-right: 1px solid #999;
  position: static;
  color: #333;
}

</style>
