<template>
  <div class="container-fluid text-center dark-bg">
    <div class="bg-img">
      <div class="row">
        <div class="col-md-4 cell h3">
          <span style="bolder">
            {{ dashboardsLength }}
          </span>
          Dashboards
        </div>
        <div class="col-md-4 cell h3">
          <span style="bolder">
            {{ usersLength }}
          </span>
          Usuários
        </div>
        <div class="col-md-4 cell h3">
          <span style="bolder">
            {{ projectsLength }}
          </span>
          Projetos
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

        }
    },
    computed: {
        ...mapGetters({
            projectsLength: "getProjectsLength",
            dashboardsLength: "getDashboardsLength",
            usersLength: "getUsersLength"
        }),

    },
    beforeMount () {
        this.loadProjects()
        this.loadDashboards()
        this.loadUsers()
    },
    methods: {

        loadProjects () {
            this.$store.dispatch("loadProjects")
        },
        loadDashboards () {
            this.$store.dispatch("loadDashboards")
        },
        loadUsers () {
            this.$store.dispatch("loadUsers")
        },
    }
}
</script>

<style lang="scss" scoped>
  @import '../styles/base.scss';

  .container-fluid {
    padding: 0;
    // background: url('../../assets/data-analytics.png') no-repeat center center;
    // background-size: cover;

    // .bg-img {
    //   background-color: rgba(0, 0, 0, 0.6);
    // }
  }

  .cell {
    padding: 3em 1em;
    background-color: transparent;
    margin-bottom: 0;
    color: $alt-text-color;

    span {
      color: $blue;
    }
  }
</style>
