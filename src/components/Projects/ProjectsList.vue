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
              @click="searchProject()"
              class="input-group-btn btn btn-green">
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
          @click="filterByTag()"
          class="badge btn-blue">
          {{ tag.name }}
        </li>
      </ul>
      <hr>
    </div>
    <div class="row">
      <div class="col col-md-6 offset-md-3">
        <div class="row">
          <div
          v-for="project in projects"
          :key="project.id"
          class="card col col-md-6">
          <h5 class="card-header">
            {{ project.name }}
          </h5>
          <div class="card-body">
            <h5 class="card-title">
              {{ project.owner }}
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
  </div>
</template>

<script>
import { mapGetters } from "vuex"

import Navbar from "@/components/Utils/Navbar"
import Footer from "@/components/Utils/Footer"
import SideBar from "@/components/Utils/SideBar"

export default {
    components: {
        Navbar,
        "custom-footer": Footer,
        "sidebar": SideBar,
    },
    data () {
        return {
            project: {
                name: "",
                description: ""
            },
            isModalVisible: false,
            projects: []
        }
    },
    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },
    beforeMount () {
        this.getProject()
    },
    methods: {
        getProject () {
            this.$http.get("project/", { headers: { "content-type": "application/json" } }).then(result => {
                this.project = result.data
            },
            error => {
                error.log(error)
            })
        }
    },
}
</script>

<style lang="scss" scoped>
  .row {
    margin: 0;
  }

  .content {
    padding-left: 0;
    padding-right: 0;
  }

</style>
