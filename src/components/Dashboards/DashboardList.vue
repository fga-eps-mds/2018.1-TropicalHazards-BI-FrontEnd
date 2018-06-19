<template>
  <div class = "ListDashboard">
    <div
      id="content"
      class="col m12" >
      <secondnav/>
      <div class="grey lighten-4">
        <div class="center-align">
          <h5> <span class="fa fa-line-chart">Estatísticas</span></h5>
          <div class="row">
            <div class="col s12   ">
              <div class="card ">
                <div class="card-content ">
                  <span class="card-title">{{ dashboards.length }}</span>
                  <p>Dashboards ativos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="custom-container">
        <h5>Dashboards</h5>
        <div
          id="projects"
          class="row">
          <div
            v-for="dashboard in dashboards"
            :key="dashboard.id"
            class="col s12 m4 l3">
            <div class="card grey lighten-5">
              <div class="truncate card-content grey-text text-darken-2">
                <span
                  style="font-size:20px"
                  class="card-title">{{ dashboard.name }}</span>
                <p> Descrição: {{ dashboard.description }} </p>
                <p> IdProjeto: {{ dashboard.id }} </p>
                <p> IdUser: {{ dashboard.user }} </p>
              </div>
              <div class="card-action center-align grey-text text-lighten-2">
                <router-link
                  :to="{ name: 'DashboardDetail', params: { id: dashboard.id } }"
                  class="btn blue lighten-1" >
                  <span class="fa fa-search"/>
                </router-link>

                <router-link
                  :to="{ name: 'editDashboard', params: { id: dashboard.id } }"
                  class="btn blue lighten-1" >
                  <span class="fa fa-edit"/>
                </router-link>

              <!-- <a href="#delete-proj" class="modal-trigger btn red">
                    <span class="fa fa-remove"></span>
              </a> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardDetail from "./DashboardDetail"
import SecondNavBar from "@/components/Utils/SecondNavBar"
import {mapGetters} from "vuex"
import modalLogin from "@/components/Modals/modalLogin.vue"

export default {
    components: {
        DashboardDetail,
        "secondnav": SecondNavBar,
        "modal": modalLogin
    },
    data () {
        return {
            dashboards: {
                name: "",
                description: ""
            },
            isModalVisible: false,
            dashboard: ""
        }
    },
    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },
    beforeMount () {
        this.getDashboard()
    },
    methods: {
        getDashboard () {
            this.$http.get("dashboard/", { headers: { "content-type": "application/json" } }).then(result => {
                this.dashboards = result.data
            },
            error => {
                error.log(error)
            })
        }
    },
}
</script>

<style>
::placeholder { /* Most modern browsers support this now. */
   color:    #132a71;
}
</style>
