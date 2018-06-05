<template>
  <header>
    <Navbar/>
    <div class="filter container-fluid text-center">
      <h1 class="motto clearfix">
        {{ brandMotto }}
      </h1>
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
</template>

<script>
import Navbar from "@/components/Landing/Navbar"

export default {
    components: {
        Navbar
    },

    data () {
        return {
            brandMotto: "Sua pesquisa gerenciada do seu jeito",
            briefResume: "esse front end nao ta uma desgraceira",
            searchArg: ""
        }
    }
}
</script>

<style lang="scss" scoped>
  @import '../styles/base.scss';
  header {
    background: url('../../assets/bg-img.jpg') no-repeat center center;
    background-size: cover;
    color: $alt-text-color;

    background-color: #909090;
    
      .filter {
        background-size: cover;
        background-color: rgba(0, 0, 0, 0.5);
      }

    .container-fluid {
      padding-bottom: 2.5em;
      
      h1 {
        padding-top: 2em;
        padding-bottom: 1.5em;
      }
      
      .h3 {
        padding-bottom: 1.5em;
      }

      .input-group {
        width: 80vw;
        margin-left: auto;
        margin-right: auto;

        input {
          background-color: rgba(255, 255, 255, 0.3);
          color: #fff;
          border: none;

          &::placeholder {
            color: #fff;
          }
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
