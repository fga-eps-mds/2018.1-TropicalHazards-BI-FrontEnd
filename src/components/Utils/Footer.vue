<template>
  <footer class="container-fluid text-center dark-bg">
    <div class="row">
      <div class="col-12">
        <h5>Observ - dashboards inteligentes para seus dados</h5>
        <p class="text-center">
          {{ footerText }}
        </p>
      </div>
    </div>
    <div class="row">
      <a
        href="https://github.com/fga-gpp-mds/2018.1-TropicalHazards-BI"
        class="col text-center">
        Github
      </a>
      <router-link
        :to="{name: 'LandingPage'}"
        class="col text-center">
        Inicio
      </router-link>
      <a
        href="https://fga-gpp-mds.github.io/2018.1-TropicalHazards-BI"
        class="col text-center">
        Docs
      </a>

    </div>
    <p
      id="license"
      class="text-center">
      Protegido sob a licença MIT
    </p>
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
    .row a {
      padding-top: 1.3em;
      padding-bottom: 1.3em;
      text-decoration: none;
      color: inherit;
      &:hover {
        background-color: #444;
        transition: all .4s ease-in-out;
      }
    }

    #license {
      font-size: .7em;
      margin-top: 4em;
    }
  }
</style>
