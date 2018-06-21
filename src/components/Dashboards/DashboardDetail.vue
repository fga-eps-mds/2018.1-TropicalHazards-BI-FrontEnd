<template>
  <div class="container-fluid">
    <div v-if="showError">
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
          :to="{}"
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
        <!-- <ul class="list-inline">
          <li
            v-for="tag in dashboard.project.tags"
            :key="tag.id"
            class="list-inline-item">
            <span class="badge badge-primary btn-blue">
              {{ tag.name }}
            </span>
          </li>
        </ul> -->
      </header>
      <!-- <div class="row">
        <div
          class="card col col-md-6">
          <div class="embed-responsive embed-responsive-16by9">
            <iframe
              :src="dashboard.iframe"
              class="embed-responsive-item"
              frameborder="0"/>
          </div>
          <div class="card-body">
            <h5 class="card-title">
              {{ dashboard.name }}
              <span
                v-if="dashboard.owner == currentUser"
                class="badge badge-secondary h6">
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
          <div class="row">
            <div
              v-for="iframe in iframes"
              :key="iframe.id"
              class="col-lg-6">
              <div class="card col">
                <div class="embed-responsive">
                  <custom-iframe
                    :iframeUrl="iframe.url"
                    class="embed-responsive-item"/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div> -->
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
            dashboard: {
                name: "",
                user: "",
                project: ""
            }
        }
    },
    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },
    beforeMount () {
        this.$store.dispatch("loadDashboards")
        this.dashboard = this.$store.getters.getDashboardById(parseInt(this.$route.params.id))
        if(this.dashboard === undefined){
            this.showError = true
        }else{
            this.$store.dispatch("getProjectOwner", this.project.user).then(response=>{
                this.owner = response
            })
        }
    },
}
</script>

<style lang="scss" scoped>


</style>
