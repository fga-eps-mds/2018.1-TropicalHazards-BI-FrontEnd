<template>
  <div class="container-fluid">
    <header>
      <h2>
        Meus Projetos
      </h2>
      <hr>
      <ul class="list-inline">
        <li
          v-for="tag in getTags"
          :key="tag.id"
          class="list-inline-item">
          <span class="badge badge-primary btn-blue">
            {{ tag.slug }}
          </span>
        </li>
      </ul>
    </header>
    <hr>
    <div class="container">
      <div class="input-group input-group-sm">
        <input
          type="text"
          class="form-control"
          placeholder="Pesquise por seus projetos">
        <div class="input-group-append">
          <button
            class="btn btn-green"
            @click="searchProject()">
            <span class="fa fa-search"/> Buscar
          </button>
        </div>
      </div>
    </div>
    <hr>
    <div v-if="MyProjects.length == 0">
      <b-jumbotron
        bg-variant="muted"
        class="text-muted">
        <template
          slot="header">
          Oooops
        </template>
        <template
          slot="lead">
          Me parece que você ainda não possui nenhum projeto...
        </template>
        <p>
          Não se preocupe, você ainda pode criar um projeto e começar sua
          jornada conosco!
        </p>
        <router-link
          :to="{ name: 'CreateProject' }"
          class="btn btn-blue ml-auto">
          <span class="fa fa-plus"/> Novo projeto
        </router-link>
      </b-jumbotron>
    </div>
    <section v-else>
      <div
        v-for="project in MyProjects"
        :key="project.id"
        class="row">
        <div
          class="card col col-md-6">
          <h5 class="card-header">
            {{ project.name }}
          </h5>
          <div class="card-body">
            <p class="card-text">
              {{ project.description }}
            </p>
            <router-link
              :to="{ name: 'EditProject', params: { id: project.id } }"
              class="btn btn-sm btn-blue mr-auto">
              <span class="fa fa-pencil"/> Editar
            </router-link>
            <router-link
              :to="{ name: 'CreateDashboard', params: { project: project.id } }"
              class="btn btn-sm btn-blue mr-auto">
              <span class="fa fa-pencil"/> Criar Dashboard
            </router-link>
            <router-link
              :to="{ name: 'ProjectDetail', params: { id: project.id } }"
              class="btn btn-sm btn-blue mr-auto">
              <span class="fa fa-search"/> Visualizar
            </router-link>
            <button
              class="btn btn-danger btn-sm"
              @click="deleteProject()">
              <span class="fa fa-trash"/> Excluir
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import bJumbotron from "bootstrap-vue/es/components/jumbotron/jumbotron"

export default {
    components: {
        "b-jumbotron":bJumbotron,
    },

    data () {
        return {
            tags: "",
            project: "",
            projects: [],
        }
    },
    computed: {
        ...mapGetters({
            currentUser: "currentUser",
            getTags: "getTags",
            getProjects: "getProjects",
            MyProjects: "getMyProjects"
        })

    },
    beforeMount () {
        this.loadProjects()
        this.loadMyProjects()
        this.loadTags()
    },
    methods: {
        loadProjects () {
            this.$store.dispatch("loadProjects")
        },
        loadMyProjects () {
            this.$store.dispatch("loadMyProjects")
        },
        loadTags () {
            this.$store.dispatch("loadTags")
        }
    }

}
</script>

<style lang="scss" scoped>
  @import '../styles/base.scss';

  section {
    margin: 5em auto;
  }
</style>
