<template>
  <div class="container-fluid">
    <header>
      <h2>
        Projetos
      </h2>
    </header>
    <hr>
    <div class="row">
      <h5 class="col col-md-4">
        Busca
      </h5>
      <form class="col col-md-8">
        <div class="input-group">
          <input
            v-model="searchArgument"
            class="form-control"
            type="text"
            placeholder="Busque por projetos">
          <div class="input-group-append">
            <button
              class="input-group-btn btn btn-green"
              @click="searchProject()">
              <span class="fa fa-search"/>
              Buscar
            </button>
          </div>
        </div>
      </form>
      <ul class="list-inline">
        <li class="list-inline-group">
          <h5>
            Tags
          </h5>
        </li>
        <li
          v-for="tag in tags"
          :key="tag.id"
          class="badge btn-blue"
          @click="filterByTag()">
          {{ tag.name }}
        </li>
      </ul>
      <hr>
    </div>
    <div class="">
      <div
        v-for="project in filter"
        :key="project.id"
        class="col col-md-6 pt-3 pb-3">
        <div class="card w-100">
          <h5 class="card-header">
            {{ project.name }}
          </h5>
          <div class="card-body">
            <h5 class="card-title">
              {{ project.owner.name }}
            </h5>
            <p>
              {{ project.description }}
            </p>
            <router-link
              :to="{ path: '/projects/detail/' + project.id }"
              class="btn btn-small btn-blue">
              <span class="fa fa-search"/> Visualizar
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"


export default {
    data () {
        return {
            project: {
                name: "",
                description: ""
            },
            searchArgument: ""
        }
    },
    computed: {
        ...mapGetters({
            currentUser: "currentUser"
        }),
        filteredList(){
            return this.$store.getters.getProjects(this.searchArgument)
        }
    },

    beforeCreate () {
        this.$store.dispatch("loadProjects")
    },
    methods: {
    },
}
</script>

<style lang="scss" scoped>
  @import '../styles/base.scss';

  .card {
    display: inline-block;
  }
  .row {
    margin: 0;
  }

  .content {
    padding-left: 0;
    padding-right: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
