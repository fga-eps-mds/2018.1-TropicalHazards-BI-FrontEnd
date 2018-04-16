<template>
<div id="app">
  <div class="row grey lighten-4">
    <sidebar></sidebar>
    <div id="content" class="col m11">
      <div class="header center-align white">
        <h3>
          Mapa da dengue em brasília
        </h3>
      </div>
      <div class="grey lighten-4">
        <div class="custom-container">
          <h5>Estatísticas do projeto</h5>
          <div class="row">
            <div class="col s12 m4">
              <div class="card">
                <div class="card-content">
                  <span class="card-title">6</span>
                  <p>
                    <span class="fa fa-line-chart"></span> Observatórios
                  </p>
                </div>
              </div>
            </div>
            <div class="col s12 m4">
              <div class="card">
                <div class="card-content">
                  <span class="card-title">14</span>
                  <p>
                    <span class="fa fa-users"></span> Contribuidores
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="custom-container">
          <h5>
            Observatórios neste projeto:
          </h5>
          <a href="#new-observ" class="btn-flat blue lighten-1 grey-text text-lighten-2 modal-trigger">
            Novo Observatório
            <span class="fa fa-plus"></span>
          </a>
          <div class="row">
            <div class="col s12 m4 l3">
              <div class="card grey lighten-5">
                <div class="card-content grey-text text-darken-2">
                  <span class="card-title">Lago Norte</span>
                  <p>
                    Observátório sobre os dados da dengue no ano de 2010
                  </p>
                  <small>Criado por: João do Caminhão</small>
                </div>
                <div class="card-action center-align grey-text text-lighten-2">
                  <a href="observatory.html" class="btn  blue lighten-1">
                    <span class="fa fa-search"></span>
                  </a>
                  <a href="#" class="btn red">
                    <span class="fa fa-remove"></span>
                  </a>
                  <!-- <a href="#" class="btn  blue lighten-1">
                    <span class="fa fa-user-plus"></span>
                  </a> -->
                </div>
              </div>
            </div>
            <div class="col s12 m4 l3">
              <div class="card grey lighten-5">
                <div class="card-content grey-text text-darken-2">
                  <span class="card-title">Lago Sul</span>
                  <p>
                    Observátório sobre os dados da dengue no ano de 2015
                  </p>
                  <small>Criado por: Sérgio Capixaba</small>
                </div>
                <div class="card-action center-align grey-text text-lighten-2">
                  <a href="observatory.html" class="btn  blue lighten-1">
                    <span class="fa fa-search"></span>
                  </a>
                 <a href="#" class="btn red">
                    <span class="fa fa-remove"></span>
                  </a>
                  <!-- <a href="#" class="btn  blue lighten-1"> -->
                    <!-- <span class="fa fa-user-plus"></span> -->
                  <!-- </a> -->
                </div>
              </div>
            </div>
            <div class="col s12 m4 l3">
              <div class="card grey lighten-5">
                <div class="card-content grey-text text-darken-2">
                  <span class="card-title">titulo</span>
                  <p>
                    Lorem impsum Lorem impsum Lorem impsum
                  </p>
                  <small>Criado por: Cleiton Jr.</small>
                </div>
                <div class="card-action center-align grey-text text-lighten-2">
                  <a href="observatory.html" class="btn  blue lighten-1">
                    <span class="fa fa-search"></span>
                  </a>
                  <a href="#delete-user" class="modal-trigger btn red">
                    <span class="fa fa-remove"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <modal-delete-project></modal-delete-project>
</div>
</template>

<script>
import SideBar from '@/components/Utils/SideBar'
import modalDeleteProject from '@/components/Modals/modalDeleteProject'
import {mapGetters} from 'vuex'

export default {
  name: 'ProjectDetail',
  components: {
    'sidebar': SideBar,
    'modal-delete-project': modalDeleteProject
  },

  data () {
    return {
      project: {},
      projeto: "",
      user: {

        name: "",
        id: "",
        email: ""
      }

    }
  },

  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  methods: {
    loadUserInfo (){
      this.user.id = this.currentUser.id
      this.user.username = this.currentUser.name
      this.user.email = this.currentUser.email
    },
    getProjectDetail (){
        this.$http.get('http://localhost:8000/projects/4/',
                       { headers: { 'Authorization': 'JWT ' + localStorage.token } }).then(result => {
        this.projeto = result.data
        },error => {
        });
    },
    getProject(){
      this.$http.get("http://localhost:8000/projects/",  { headers:
                    { "content-type": "application/json" } }).then(result => {
      this.project = result.data;
      },
      error => {
          console.error(error);
      });
    },
    testToken(){
      this.$http.post('http://localhost:8000/obtain-token/', { 'username': this.user.username, 'password': this.user.password}).then(result => {
      localStorage.token = result.data.token
      })
    },
        modalScript() {

        $(document).ready(function(){
        $('.modal').modal();
      });


      $(document).ready(function(){
        $('select').formSelect();
      });
     }
  },
  beforeMount(){
    this.loadUserInfo()
    this.testToken()
    this.modalScript()
  },
  created () {
    this.getProject()
    this.getProjectDetail ()
  }
}
</script>

<style>

::placeholder { /* Most modern browsers support this now. */
  color:    #132a71;
}

</style>
