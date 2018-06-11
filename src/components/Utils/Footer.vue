<template>
  <footer class="page-footer dark-bg">
    <div class="container text-center text-md-left">
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
  </footer>
</template>

<script>
export default {
    data () {
        return {
            footerText: ""
        }
    }
}
</script>

<style lang="scss" scoped>
  footer {
    padding-top: 1em;
    padding-bottom: .3em;

    .row {
      margin: 0;
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
