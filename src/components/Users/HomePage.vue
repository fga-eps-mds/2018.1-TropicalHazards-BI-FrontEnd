<template>
 <div id="app ">
  <div class="row grey lighten-4">
      <sidebar></sidebar>
    <div id="content" class="col m11" >
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
          <a href="#" class="btn-flat blue lighten-1 grey-text text-lighten-2">
            Novo projeto <span class="fa fa-plus"></span>
          </a>
          <div class="row">
            <div v-for="projeto in projetos" class="col s12 m4 l3">
              <div class="card grey lighten-5">
                <div class="card-content grey-text text-darken-2">
                  <span style="font-size:20px" class="card-title">{{ projeto.name }}</span>
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
import SideBar from '@/components/Utils/SideBar'

export default {

  components: {
    'sidebar': SideBar
  },

  data(){
    name: 'ListProject'
    return {

      projetos: "",

    }
  },
   computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },

  methods: {
    getProject(){
      this.$http.get("http://localhost:8000/projects/",  { headers:
                    { "content-type": "application/json" } }).then(result => {
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
p{
  font-size: 15px;
}


</style>
