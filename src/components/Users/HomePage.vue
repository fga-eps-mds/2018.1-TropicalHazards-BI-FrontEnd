<template>
 <div id="app">

     <div class="row">
  <div id="SideBar">s
    <side-bar></side-bar>
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
          <a href="#" class="btn-flat blue lighten-1 grey-text text-lighten-2">
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

import SideBar from '../../components/Utils/SideBar'

export default {
  components: {
    'side-bar': SideBar,
  },
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

  },

  beforeMount(){
    this.getProject()
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

.sidebar-icon a :hover {
  background:rgba(0,0,0,0.5);
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
  height: 850px;
  padding: 0;
  float: right;
  position: relative;
}

#content .header h3 {
  margin: 0;
  padding: .3em;
}

#sidebar {
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  border-right: 1px solid #999;
  position: fixed;
  color: #333;
  z-index: 9999;
  top: 0;
  left: 0;
}


</style>
