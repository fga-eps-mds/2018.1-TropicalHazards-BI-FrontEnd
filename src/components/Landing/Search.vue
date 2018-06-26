<template>
  <div id="search-section">
    <b-container class="search">
      <h2 class="motto clearfix"> Explore a plataforma. </h2>
      <div class="input-group">
        <input
          v-model="searchArg"
          type="text"
          name="search-dashes-field"
          class="form-control"
          placeholder="Busque por um tema">
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
    </b-container>
  </div>    
</template> 

<script>
export default {
    components: { 

    },
    data(){
        return{
            searchArg: ""
        }
    }
}


</script>

<style>
    h2 {
      padding-left: 35%;
      padding-bottom: 5%;
      padding-top: 5%;
    }

    #search-seaction {
      padding-top: 60px;
    }
    .search {
        padding-bottom: 1.5em;
    }

    .input-group {
            width: 50vw;
            height: 3vw;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 5%;
            z-index: 105;
    }

    #search {
        transition: all 0.025s ease-in-out;
        }

</style>