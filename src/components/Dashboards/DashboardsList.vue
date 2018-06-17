<template>
  <div class="container-fluid content">
    <header class="col text-left">
      <h2>
        Dashboards
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
            placeholder="Busque por dashboards">
          <div class="input-group-append">
            <button
              @click="searchDashboard()"
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
    </div>
    <hr>
    <section class="row">
      <div
        v-for="dashboard in dashboards"
        :key="dashboard.id"
        class="col col-md-6 text-left">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">
              <span class="fa fa-pie-chart"/> {{ dashboard.name }}
            </h4>
            <h6 class="card-subtitle text-muted">
              {{ dashboard.owner }}
            </h6>
            <p class="card-text">
              {{ dashboard.project }}
            </p>
            <ul class="list-inline">
              <li class="list-inline-item">
                <p class="text-muted">
                  Tags:
                </p>
              </li>
              <li
                v-for="tag in dashboard.tags"
                :key="tag.id"
                class="badge badge-secondary list-inline-item">
                {{ tag.name }}
              </li>
            </ul>
            <hr>
            <router-link
              :to="{ path: '/dashboards/detail/' + dashboard.id }"
              class="btn btn-blue btn-sm">
              <span class="fa fa-search"/> Visualizar
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
    data () {
        return {

            dashboards: [],
            searchArgument: '',

        }
    }
}
</script>

<style lang="scss" scoped>
  @import '../styles/base.scss';

  .row {
    margin: 0;
  }

  .card {
    margin: 1em .5em;
    color: $text-color;

    .card-title {
      font-weight: bold;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
      padding: .2em;
    }

    .list-inline {
      margin: 0;

      p {
        margin: 0;
      }
    }
  }
</style>
