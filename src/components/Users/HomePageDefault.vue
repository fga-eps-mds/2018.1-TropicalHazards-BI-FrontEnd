<template>
  <div class="container-fluid">
    <header>
      <h2>
        Bem vindo {{ user.username }}!
      </h2>
      <hr>
    </header>
    <section>
      <div class="container">
        <h4 class="pl-0">
          O que deseja fazer hoje?
        </h4>
        <ul class="list-inline">
          <router-link
            :to="{ name: 'CreateProject' }"
            class="list-inline-item btn btn-green">
            <span class="fa fa-plus"/> Criar projeto
          </router-link>
          <router-link
            :to="{ name: 'ProjectsList' }"
            class="list-inline-item btn btn-blue">
            <span class="fa fa-folder-o"/> Explorar projetos
          </router-link>
          <router-link
            :to="{ name: 'DashboardsList' }"
            class="list-inline-item btn btn-blue">
            <span class="fa fa-bar-chart"/> Explorar dashboards
          </router-link>
        </ul>
        <b-jumbotron
          class="">
          <template slot="header">
            Guia
          </template>
          <template slot="lead">
            Fluxo básico do Observ:
            <hr>
            <ul class="">
              <li class="pt-4 pb-4">
                Passo 1: Criar um projeto.
                <div class="row mt-3 mb-1">
                  <div class="col col-md-6">
                    <img
                      src="../../assets/create-project.gif"
                      alt="Passo 1"
                      width="100%"
                      class="responsive-img">
                  </div>
                  <div class="col col-md-6 h6">
                    <p>
                      Ao criar um projeto, você poderá subir seus dados e centralizar todo o
                      conteúdo da sua pesquisa em um repositório de dados.
                    </p>
                  </div>
                </div>
              </li>
              <li class="pt-4 pb-4">
                Passo 2: Fazer o upload de dados.
                <div class="row mt-3 mb-1">
                  <div class="col col-md-6">
                    <img
                      src="../../assets/importar-arquivo-csv.gif"
                      alt="Passo 2"
                      width="100%"
                      class="responsive-img">
                  </div>
                  <div class="col col-md-6 h6">
                    <p>
                      Ao subir os dados da sua pesquisa, você pode gerar indicadores
                      relacionados ao seu projeto de pesquisa.
                    </p>
                  </div>
                </div>
              </li>
              <li class="pt-4 pb-4">
                Passo 3: Criar um dashboard.
                <div class="row mt-3 mb-1">
                  <div class="col col-md-6">
                    <img
                      src="../../assets/create-dashboard.gif"
                      alt="Passo 1"
                      width="100%"
                      class="img-responsive">
                  </div>
                  <div class="col col-md-6 h6">
                    <p>
                      O dashboard será o que vai conter seu indicador. Nele, você irá organiza-los
                      de acordo com o seu critério.
                    </p>
                  </div>
                </div>
              </li>
              <li class="pt-4 pb-4">
                Passo 4: Criar um indicador.
                <div class="row mt-3 mb-1">
                  <div class="col col-md-6">
                    <!-- <img
                      src="../../assets/.jpg"
                      alt="Passo 1"
                      class="responsive-img"> -->
                  </div>
                  <div class="col col-md-6 h6">
                    <p>
                      O que são dados se você não pode analizá-los? A criação de indicadores permite
                      que você visualize e interprete seus dados de forma clara e objetiva,
                    </p>
                  </div>
                </div>
              </li>
              <li class="pt-4 pb-4">
                Passo 5: Compartilhar dashboard.
                <div class="col">
                  Para compartilhar seu dashboard, basta enviar a url para seu destinatario
                </div>
                <!-- <div class="row mt-3 mb-1">
                  <div class="col col-md-6">
                    <img
                      src=""
                      alt="Passo 1"
                      class="responsive-img">
                  </div>
                  <div class="col col-md-6 h6">
                    <p>
                      Compartilhe os dashboards de seu projeto tanto para pesquisadores quanto para interessados,
                      de forma simples, enxuta e formal.
                    </p>
                  </div>
                </div> -->
              </li>
            </ul>
          </template>
        </b-jumbotron>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

import bJumbotron from "bootstrap-vue/es/components/jumbotron/jumbotron"

export default {
    components: {
      "b-jumbotron": bJumbotron,
    },

    data () {
        return {
            user: {
                username: "Visitante",
            }
        }
    },

    computed: {
        ...mapGetters({
            currentUser: "currentUser"
        })
    },

    beforeMount () {
        this.loadUserInfo()
    },

    methods:{
        loadUserInfo () {
            this.user.username = this.currentUser.username
        }
    }

}
</script>

<style lang="scss" scoped>

</style>
