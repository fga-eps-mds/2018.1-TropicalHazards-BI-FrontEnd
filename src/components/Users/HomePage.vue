<template>

  <div id="app ">

    <nav class="navbar hide-on-med-and-up">
      <div class="nav-wrapper">
        <a
          href="#/"
          data-target="mobile-menu"
          class="sidenav-trigger">
          <i class="material-icons">menu</i>
        </a>
      </div>
    </nav>
    <div class="row grey lighten-4">
      <sidebar/>
      <div
        id="content"
        class="col m11" >
        <div class="header center-align white">
          <h3>Home</h3>
        </div>
        <div class="grey lighten-4">
          <div class="custom-container">
            <h5> <span class="fa fa-line-chart">Estatísticas de perfil</span></h5>
            <div class="row">
              <div class="col s12 m4">
                <div class="card">
                  <div class="card-content">
                    <span class="card-title">{{ projects.length }}</span>
                    <p>Projetos ativos</p>
                  </div>
                </div>
              </div>
              <div class="col s12 m4">
                <div class="card">
                  <div class="card-content">
                    <span class="card-title">1</span>
                    <p>Observatórios</p>
                  </div>
                </div>
              </div>
              <div class="col s12 m4">
                <div class="card">
                  <div class="card-content">
                    <span class="card-title">1</span>
                    <p>Contribuidor(es)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="custom-container">
            <h5>
              Projetos
            </h5>
            <div
              id="projects"
              class="row">
              <div
                v-for="project in projects"
                :key="project.id"
                class="col s12 m4 l3">
                <div class="truncate card grey lighten-5">
                  <div class="card-content grey-text text-darken-2">
                    <span
                      style="font-size:20px"
                      class="card-title">{{ project.name }}</span>
                    <p> Descrição: {{ project.description }} </p>
                    <p> IdProjeto: {{ project.id }} </p>
                    <p> IdUser: {{ project.user }} </p>
                  </div>
                  <div class="card-action center-align grey-text text-lighten-2">
                    <router-link
                      :to="{ name: 'ProjectDetail', params: { id: project.id } }"
                      class="btn blue lighten-1" >
                      <span class="fa fa-search"/>
                    </router-link>

                    <router-link
                      :to="{ name: 'EditProject', params: { id: project.id } }"
                      class="btn blue lighten-1" >
                      <span class="fa fa-edit"/>
                    </router-link>

                  <!-- <a href="#delete-proj" class="modal-trigger btn red">
                    <span class="fa fa-remove"></span>
                  </a> -->

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Menu Side bar for mobile -->

    <ul
      id="mobile-menu"
      class="sidenav grey darken-4 grey-text text-lighten-4 collection">

      <router-link :to="{ name: 'HomePage'}">
        <img
          src="../../assets/v3_rect.png"
          class="imageSideBar responsive-img">
      </router-link>
      <router-link :to="{name: 'HomePage'}">
        <li class="collection-item">
          <span class="fa fa-sign-in">Bem vindo {{ currentUser.name }}</span>
        </li>
      </router-link>
      <router-link :to="{name: 'CreateProject'}">
        <li class="collection-item">
          <span class="fa fa-plus">Criar Projeto</span>
        </li>
      </router-link>

      <router-link :to="{name: 'EditUser'}">
        <li class="collection-item">
          <span class="fa fa-edit">Editar Perfil</span>
        </li>
      </router-link>

      <router-link :to="{name: 'DeleteUser'}">
        <li class="collection-item">
          <span class="fa fa-trash">Deletar Perfil</span>
        </li>
      </router-link>
      <a
        href="#"
        v-on:
        @click="Logout()">
        <li class="collection-item">
          <span class="fa fa-sign-out">Logout</span>
        </li>
      </a>
    </ul>
    <!-- Menu Side bar for mobile -->

    <modal-delete-proj/>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import SideBar from "@/components/Utils/SideBar"
import modalDeleteProject from "@/components/Modals/modalDeleteProject"

export default {

    components: {
        "sidebar": SideBar,
        "modal-delete-proj": modalDeleteProject
    },
    data () {
        return {
            projects: [],
            user: {
                username: "",
                password: "",
                email: ""
            },
            isModalVisible: false
        }
    },

    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },
    beforeMount () {
        this.loadUserInfo()
        this.getProject()
        this.menuMobile()
    },
    methods: {
        deleteProject () {
            this.$http.delete("project/" + this.projeto.id + "/",
                { headers: { "Authorization": "JWT " + localStorage.token } })
            window.alert("projeto deletado")
        },
        getProject () {
            this.$http.get("projects/", { headers: { "content-type": "application/json" } }).then(result => {
                this.projects = result.data
            },
            error => {
                error.log(error)
            })
        },

        loadUserInfo () {
            this.user.id = this.currentUser.id
            this.user.username = this.currentUser.name
            this.user.email = this.currentUser.email
        },
        showModal () {
            this.isModalVisible = true
        },
        closeModal () {
            this.isModalVisible = false
        },
        modalScript () {
            (document).ready(function () {
                (".modal").modal()
            }),
            (document).ready(function () {
                ("select").formSelect()
            })
        },
        menuMobile () {
            (document).ready(function () {
                (".sidenav").sidenav()
            })
        },
        Logout () {
            this.$http.post("rest-auth/logout/", this.user, { headers: { "content-type": "application/json"} })
            this.$store.dispatch("logout")//trigger da ação de login implementado em store/auth.js
            delete localStorage.token
            this.$router.replace("/")

        },
    },

}
</script>

<style>

#mobile-menu a,
.collection-item {
  font-size: 1.1em;
  background-color: inherit !important;
  color: inherit !important;
}

.imageSideBar{
  padding-left: 100px;
  padding-top: 10px;
}

</style>
