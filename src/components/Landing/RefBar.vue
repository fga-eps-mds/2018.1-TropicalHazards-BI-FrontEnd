<template>
  <div class="container-fluid text-center">
    <div class="bg-img">
      <div class="row">
        <div class="col-md-4 cell h3">
          <span style="bolder">
            {{ nmbrDashes }}
          </span>
          Dashboards
        </div>
        <div class="col-md-4 cell h3">
          <span style="bolder">
            {{ nmbrMembers }}
          </span>
          Usuários
        </div>
        <div class="col-md-4 cell h3">
          <span style="bolder">
            {{ nmbrProjects() }}
          </span>
          Projetos
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            nmbrDashes: 0,
            nmbrMembers: 0,
            nmbrProjects: 0
        }
    },

    beforeMount () {
        this.getNmbrOfDashes()
        this.getNmbrOfMembers()
        this.getNmbrOfProjects()
    },

    methods: {
        getNmbrOfDashes () {
            // this.nmbrDashes = this.$store.state.dashboards.length()
        },

        getNmbrOfMembers () {
            // this.nmbrMembers = this.$store.state.members.length()
        },

        getNmbrOfProjects () {
            return this.$store.state.getAllProjects.length()
        },

        getProjects () {
            this.$store.dispatch("loadProjects")
        }
    }
}
</script>

<style lang="scss" scoped>
  @import '../styles/base.scss';

  .container-fluid {
    background: url('../../assets/data-analytics.png') no-repeat center center;
    background-size: cover;
    padding: 0;

    .bg-img {
      background-color: rgba(0, 0, 0, 0.6);
    }
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
