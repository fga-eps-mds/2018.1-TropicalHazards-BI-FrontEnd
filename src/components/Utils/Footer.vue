<template>
  <footer class="container-fluid text-center dark-bg">
    <div class="row">
      <div class="col-12">
        <h5>Observ</h5>
        <p class="text-center">
          {{ footerText }}
        </p>
      </div>
      <a
        href="github.com/fga-gpp-mds/2018.1-TropicalHazards-BI/issues/new?template=bug.md"
        class="col-4 offset-4">
        <span class="fa fa-bug"/> Reportar um bug
      </a>
    </div>
    <div class="row">
      <a
        href="github.com/fga-gpp-mds/2018.1-TropicalHazards-BI"
        class="col">
        <span class="fa fa-github"/> Github
      </a>
      <a
        href="fga-gpp-mds.github.io/2018.1-TropicalHazards-BI"
        class="col">
        <span class="fa fa-book"/> Docs
      </a>
      <router-link
        :to="name='home'"
        class="col">
        <span class="fa fa-home"/> Home
      </router-link>
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
