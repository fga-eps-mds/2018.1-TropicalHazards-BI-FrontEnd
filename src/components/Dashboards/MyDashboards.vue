<template>
  <div class="container-fluid">
    <header>
      <h2>
        Minhas dashboards
      </h2>
    </header>
    <hr>
    <div class="row">
      <h5 class="col-md-4">
        Buscar
      </h5>
      <div class="input-group col-md-8">
        <input
          v-model="srchArg"
          type="text"
          class="form-control"
          placeholder="Busque por dashboards">
        <div class="input-group-append">
          <button
            class="input-group-btn btn btn-green"
            @click="searchDashboard()">
            <span class="fa fa-search"/> Buscar
          </button>
        </div>
      </div>
      <ul class="list-inline col mt-2">
        <li class="list-inline-item h5">
          Tags:
        </li>
        <li
          v-for="tag in tagList"
          :key="tag.id"
          class="list-inline-item badge btn-blue clickable"
          @click="filterByTag(tag.name)">
          {{ tag.name }}
        </li>
      </ul>
    </div>
    <hr>
    <section id="dashboards-board">
      <div class="row">
        <div
          v-for="dashboard in filteredDashboards"
          :key="dashboard.id"
          class="col col-lg-6 pb-3 pt-3">
          <!-- <div class="embed-responsive embed-responsive-16by9">
            <custom-iframe
              :src="2"
              class=""/>
              <iframe
              :src="dashboard.iframe"
              class="embed-responsive-item"
              frameborder="0"/>
          </div> -->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                {{ dashboard.name }}
                <span
                  class="badge badge-success h6">
                  owner
                </span>
              </h5>
              <h6 class="card-subtitle">
                Placeholder Nome Projeto
              </h6>
              <p class="card-text">
                {{ dashboard.description }}
              </p>
              <router-link
                :to="{ name: 'DashboardDetail' }"
                class="btn btn-blue btn-sm">
                <span class="fa fa-search"/> Visualizar
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import IframeComponent from "@/components/Questions/IframeComponent"
import { mapGetters } from "vuex"

export default {
    components: {
        "custom-iframe": IframeComponent,
    },
    data () {
        return {
            srchArg: "",
        }
    },
    computed: {
        ...mapGetters({ currentUser: "currentUser" }),
        dashboards(){
            return this.$store.getters.getMyDashboards(this.currentUser.id)
        },
        filteredDashboards(){
            return this.dashboards.filter(dashboard =>{
                return dashboard.name.toLowerCase().includes(this.srchArg.toLowerCase())
            })
        }
    },
    beforeCreate(){
        this.$store.dispatch("loadDashboards")
    }

}
</script>

<style lang="scss" scoped>
@import '../styles/base.scss';

.row {
  margin: 0;
}

.clickable :hover {
  cursor: pointer;
}

.card {
  h1,h2,h3,h4,h5,h6,
  .h1,.h2,.h3,.h4,.h5,.h6, {
    padding-left: 0;
  }

  .card-title {
    color: $highlight-text-color;
  }
}

#dashboards-board {
  margin: 5em auto;
}

</style>
