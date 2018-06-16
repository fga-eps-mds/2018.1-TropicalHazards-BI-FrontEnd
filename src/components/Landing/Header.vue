<template>
  <div>
    <Navbar/>
    <header>
      <div class="filter container-fluid text-center">
        <h1 class="motto clearfix"> Contribua. Compartilhe. <b>Observ</b>. </h1>
        <p class="h3 clearfix">
          {{ briefResume }}
        </p>
        <div class="input-group">
          <input
            v-model="searchArg"
            type="text"
            name="search-dashes-field"
            class="form-control"
            placeholder="Descubra dashboards">
          <div class="input-group-append">
            <button
              id="search"
              class="btn btn-primary btn-blue">
              <p class="d-none d-md-inline-block">
                Buscar
              </p>
              <span class="fa fa-search"/>
            </button>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
// quinta dia 21 11hrs na sala meeting carla pre r2
import Navbar from "@/components/Landing/Navbar"

export default {
    components: {
        Navbar
    },

    data () {
        return {
            brandMotto: "Contribua. Compartilhe. Observ.",
            briefResume: "Seus dados organizados e compartilhados",
            searchArg: ""
        }
    }
}
</script>

<style lang="scss" scoped>
  @import '../styles/base.scss';
  header {
    background: url('../../assets/metachart-background-2.jpg') no-repeat center center;
    background-size: cover;
    color: $text-color;
    background-color: #909090;


    .filter {
      background-size: cover;
      background-color: rgba(112, 167, 225, 0.2);
    }

    .filter h1, .filter p, .filter .input-group {
      z-index: 1800;
    }

    .container-fluid {
      padding-bottom: 2.5em;
      padding-top: .5em;

      @media (min-width: 691px) {
        padding: 11em 2.5em;
        height: 100vh;
      }

    #search {
      transition: all 0.025s ease-in-out;
    }
      h1 {
        padding-top: 1em;
        padding-bottom: 0.5em;
      }

      .h3 {
        padding-bottom: 1.5em;
        font-style: italic;
        color: #333F;
      }

      .input-group {
        width: 50vw;
        margin-left: auto;
        margin-right: auto;
        z-index: 105;


        input {
          color: rgba(169, 18, 219, 0.2);
          // font-style: italic;
        }
      }

    }
  }
  button {
    p {
      margin-bottom: auto;
    }
  }
</style>
