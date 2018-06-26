<template>
  <section>
    <!--<div class="container text-center mx-auto">
      <h1 class="text-center">Sobre</h1>
      <hr style="width: 30%; padding-bottom: 2em">
      <p>
        O <b>OBSERV</b> é um observátorio de dados com interpretação de dados, geração de indicadores e gráficos. Tudo isso para apoiara visualização dos indicadores dos dados da sua pesquisa.
      </p>
    </div> -->
    <div class="container-fluid text-center mx-auto">
      <div class="row">
        <div class="col-md-4 text-center">
          <div class="card">
            <div class="card-body">
              <div class="card-title ">
                <span class="fa fa-pie-chart"/>
              </div>
              <div class="card-subtitle h2">
                <h2 id="subtitle-dashboards">Dashboards</h2>
              </div>
              <div class="card-text align-middle">
                <hr>
                <p>
                  Visualize os resultados de pesquisas dos diferentes projetos cadastrados.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 text-center">
          <div class="card">
            <div class="card-body">
              <div class="card-title ">
                <span class="fa fa-folder-o"/>
              </div>
              <div class="card-subtitle  h2">
                <h2>Projeto</h2>
              </div>
              <div class="card-text align-middle">
                <hr>
                <p>
                  Crie e compartilhe os dados da sua pesquisa. Escolha os dados que deseja disponibilizar, interprete as informações, gere indicadores e gráficos, crie e gerencie os observatórios.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 text-center">
          <div class="card">
            <div class="card-body">
              <div class="card-title ">
                <span class="fa fa-users"/>
              </div>
              <div class="card-subtitle h2">
                <h2>Colaboradores</h2>
              </div>
              <div class="card-text align-middle">
                <hr>
                <p>
                  Interaja com os dados das pesquisas, gere seus próprios indicadores e contribua com o conhecimento do projeto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

</script>

<style lang="scss" scoped>
  @import '../styles/base.scss';

  section {
    padding-top: 3em;
    font-size: 1.15em;

    .container-fluid {
      margin-top: 3em;
      padding-top: 2em;
      padding-bottom: 5em;
      background-color: #e0e0e0;
    }

    .row {
      padding-top: 3em;
      margin-left: .01em;
    }

    .card {
      min-height: 26em;
      max-height: 26em;
      margin-top: 1em;
      margin-bottom: 1em;

      .card-title {
        font-size: 3em;
        min-height: 1em;
        color: $highlight-text-color;
      }

      .card-subtitle {
        color: $blue;
      }

      #subtitle-dashboards {
        font-size: 3vw;
        margin-left: 20vw;
      }

      .card-subtitle {
        font-size: 3vw;
        margin-left: -1%;
        text-align: left;
      }

      p {
        font-size: 1.5vw;
      }
    }
  }
</style>
