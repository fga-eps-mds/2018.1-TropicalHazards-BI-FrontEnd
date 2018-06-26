<template>
  <div>
    <Navbar/>
    <header>
      <div class="filter container-fluid text-center">
        <h1 class="motto clearfix"> Organize, compartilhe e explore. </h1>
        <p class="h3 clearfix">
          Simples. Fácil. <b>Observ</b>.
        </p>
        <!--<div class="input-group">
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
        </div>-->
        
        <div class="action-button-register">
          <b-button variant="primary" id="btn-create-account" href="#/auth">
          Crie uma conta
          </b-button>  

            <!--<router-link id="btn-create-account"  :to="{ name: 'Auth' }">
              Crie uma conta    
            </router-link>--> 
               
            
          
          <b-button 
            variant="primary"
            id="btn-explore" 
            href="#search-section"> 
            Encontre dados         
          </b-button> 
        </div>           
      </div>
    </header>
  </div>
</template>

<script>

import Navbar from "@/components/Landing/Navbar"
import VueRouter from 'vue-router'
import Search from '@/components/Landing/Search'
import RegisterForm from '@/components/Auth/RegisterForm'

export default {
    components: {
        Navbar, Search, RegisterForm
    },

    data () {
        return {
            brandMotto: "Contribua. Compartilhe. Observ.",
            briefResume: "Simples. Fácil. Observ",
            searchArg: ""
        }
    },

    methods: {
        redirectRegisterAccount(){
          router.push("RegisterForm")
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

    #btn-create-account {
      width: 15vw;
      height: 5vw;
      font-size: 1.5vw;
      padding-top: 1.4%;
      margin-right: 35px;
    }

    #btn-explore {
      width: 15vw;
      height: 5vw;
      font-size: 1.5vw;
      padding-top: 1.4%;
    }

    .action-button-register{
      margin-top: 8%;
    }

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
