<template>
  <div>
    <Navbar/>
    <div class="row">
      <sidebar class="col-md-2 sidebar"/>
      <div class="col col-md-10 content">
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
            <form>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control">
                <div class="input-group-append">
                  <button
                    class="btn btn-green">
                    <span class="fa fa-search"/>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <hr>
          <section>
            <div
              v-for="project in getProjects"
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
                  <!-- link this to the project detail -->
                  <router-link
                    :to="{name: 'ProjectDetail'}"
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
        <div class="">
          <custom-footer/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { required, minLength, maxLength } from "vuelidate/lib/validators"
import { mapGetters } from "vuex"
import Navbar from "@/components/Utils/Navbar"
import Footer from "@/components/Utils/Footer"
import Sidebar from "@/components/Utils/SideBar"

export default {
    components: {
        Navbar,
        "custom-footer": Footer,
        "sidebar": Sidebar,
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
            getProjects: "getProjects"
        })

    },
    beforeMount ()
    {
        this.loadProjects()
        this.loadTags()
    },
    methods: {
        loadProjects ()
        {
            this.$store.dispatch("loadProjects")
        },
        loadTags ()
        {
            this.$store.dispatch("loadTags")
        }
    }

}
</script>

<style lang="scss" scoped>
  @import '../styles/base.scss';

  .row {
    margin-left: 0;

  }

  section {
    margin: 5em auto;
  }

  .content {
    padding-left: 0;
    padding-right: 0;
  }

  .sidebar {
    padding-left: 0;
  }
</style>
