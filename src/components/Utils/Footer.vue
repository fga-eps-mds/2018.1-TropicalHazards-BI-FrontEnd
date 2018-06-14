<template>
  <footer class="dark-bg">
    <div v-if="!currentUser">
      <div class="text-center text-md-left">
        <div class="row">
          <div class="col-md-6 mx-auto">
            <h5 class="font-weight-bold text-uppercase mt-3 mb-4">
              Observ
            </h5>
            <p class="">
              O Observ é uma plataforma online de observatórios de dados
              científicos com suporte à geração de mapas e gráficos. Tudo de
              maneira colaborativa.
            </p>
          </div>
          <div class="col-md-4 mx-auto text-md-right">
            <h5 class="font-weight-bold text-uppercase mt-3 mb-4">
              Links
            </h5>
            <ul class="list-unstyled">
              <li>
                <a
                  href="https://fga-gpp-mds.github.io/2018.1-TropicalHazards-BI">
                  Docs
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/fga-gpp-mds/2018.1-TropicalHazards-BI">
                  GitHub
                </a>
              </li>
              <li>
                <router-link
                  :to="{ name: 'LandingPage' }">
                  Inicio
                </router-link>
              </li>
              <li>
                <router-link
                  :to="{ name: 'Dashboards' }">
                  Dashboard
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ul class="list-unstyled list-inline text-center py-2">
        <li class="list-inline-item">
          <h5 class="mb-1">
            Junte-se a nós
          </h5>
        </li>
        <li class="list-inline-item">
          <router-link
            :to="{ name: 'Auth' }"
            class="btn btn-blue">
            Cadastrar
          </router-link>
        </li>
      </ul>
      <hr>
      <div class="dark-bg text-center h6">
        Licensa MIT | 2018 Copyright
      </div>
    </div>
    <div v-if="currentUser">
      <h4 class="text-center">
        Observ
      </h4>
      <h6 class="text-center">
        <!-- pegar o nome do currentUser -->
        Seja bem vindo
        <!-- {{ currentUser.name }}! -->
      </h6>
      <ul class="list-inline mx-auto text-center text-capitalize">
        <router-link
          :to="{ name: '' }"
          tag="li"
          class="list-inline-item">
          <span class="fa fa-home"/>  home
        </router-link>
        <router-link
          :to="{ name: '' }"
          tag="li"
          class="list-inline-item">
          <span class="fa fa-folder"/> projetos
        </router-link>
        <router-link
          :to="{ name: '' }"
          tag="li"
          class="list-inline-item">
          <span class="fa fa-pie-chart"/> dashboards
        </router-link>
        <router-link
          :to="{ name: '' }"
          tag="li"
          class="list-inline-item">
          <span class="fa fa-github"/>  github
        </router-link>
      </ul>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from "vuex"

export default {
    data () {
        return {
            footerText: "",
            username: ""
        }
    },

    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },
}
</script>

<style lang="scss" scoped>
  footer {
    max-width: 100%;
    padding-top: 1em;
    padding-bottom: .3em;

    .row {
      margin-left: .03em;
    }


    .list-unstyled li {
      padding-top: .3em;
      padding-bottom: .3em;
    }

    .row a {
      text-decoration: none;
      color: inherit;

    }

    #license {
      font-size: .7em;
      margin-top: 4em;
    }

  }
</style>
