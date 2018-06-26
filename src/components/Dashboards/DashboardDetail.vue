<template>
  <div class="container-fluid">
    <div v-if="!(dashboard)">
      <header>
        <h2> Detalhes do Dashboard </h2>
      </header>
      <b-jumbotron
        bg-variant="muted"
        class="text-muted">
        <template
          slot="header">
          Oooops
        </template>
        <template
          slot="lead">
          O Dashboard que você está tentando acessar não existe...
        </template>
        <p>
          Não se preocupe, você ainda pode criar um Dashboard e começar sua
          jornada conosco!
        </p>
        <!-- fix link -->
        <router-link
          :to="{name:'MyProjects'}"
          class="btn btn-blue ml-auto">
          <span class="fa fa-arrow-left"/> Voltar ao projeto
        </router-link>
      </b-jumbotron>
    </div>
    <section v-else>
      <header>
        <h2>
          {{ dashboard.name != '' ? dashboard.name : 'dashboard name' }}
          <br>
          <small class="text-muted h4">
            {{ dashboard.project != '' ? dashboard.project : 'project name' }}
          </small>
        </h2>
        <p class="text-justify">
          {{ dashboard.description }}
        </p>
        <router-link
          :to="{ name: 'QueryComponent', params: { id: dashboard.id} }"
          class="btn btn-blue btn-sm">
          <span class="fa fa-search"/> Nova Question
        </router-link>
        <a
          href=""
          class="btn btn-sm btn-outline-secondary">
          <span class="fa fa-share-alt"/> Compartilhar
        </a>
      </header>
      <div class="row pt-4 pb-4">
        <div
          class="card col">
          <div class="card-body">
            <h5 class="card-title">
              {{ dashboard.name }}
              <span
                v-if="dashboard.owner == currentUser"
                class="badge badge-secondary">
                owner
              </span>
            </h5>
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
        <section>
          <div
            v-if="iframes.length > 1"
            class="row">
            <div
              v-for="iframe in iframes"
              :key="iframe.id"
              class="col">
              <div class="card border-primary">
                <custom-iframe
                  :iframe-url="iframe.uuid" />
              <!-- <div class="embed-responsive">
                  <custom-iframe
                    :iframe-url="iframe.uuid"
                    class="embed-responsive-item"/>
              </div> -->
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import IframeComponent from "@/components/Questions/IframeComponent"

export default {
    components: {
        "custom-iframe": IframeComponent,
    },
    data () {
        return {
            showError: false,
        }
    },
    computed: {
        ...mapGetters({ currentUser: "currentUser", iframes: "getIframes"
        }),
        dashboard(){
            return this.$store.getters.getDashboardById(parseInt(this.$route.params.id))
        }
    },
    beforeMount () {
        this.$store.dispatch("loadDashboards")
        this.$store.dispatch("getIframes", this.$route.params.id)
    },
}
</script>

<style lang="scss" scoped>


</style>
