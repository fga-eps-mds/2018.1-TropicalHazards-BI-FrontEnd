<template>
  <modal
    :width="600"
    :height="350"
    name="import-csv"
    @before-open="beforeOpen">

    <!-- @before-open="beforeOpen"> -->
    <div class="container center-align">
      <h4>Inserir Dados</h4>
      <h2>{{ text }}</h2>
      <p>passo 1: carregue o arquivo</p>
      <form>
        <div class="row">
          <div class="file-field input-field">
            <div class="btn">
              <span>Selecione o arquivo</span>
              <input type="file">
            </div>
            <div class="file-path-wrapper">
              <input
                class="file-path validate"
                type="text">
            </div>
          </div>
          <p class="left-align">
            <label>
              <input type="checkbox">
              <span>O arquivo possui cabeçalho</span>
            </label>
          </p>
        </div>
      </form>
      <div class="progress">
        <div
          class="determinate"
          style="width: 25%" />
      </div>
    </div>
    <div class="modal-footer">
      <div class="row center-align">
        <div class="col s12 m4">
          <a
            href="#!"
            class="modal-action modal-close waves-effect waves-light grey disabled white-text btn-flat">
            Voltar
          </a>
        </div>
        <div class="col s12 offset-m4 m4">
          <a
            href="#!"
            class="modal-action modal-close waves-effect waves-light blue lighten-1 white-text btn-flat">
            Próximo
          </a>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
    name: "ImportCsv",
    data (){
        return {
            text: "Project id: "
        }
    },
    methods: {
        beforeOpen(event) {
            console.log("Event:", event)
            console.log("Params:", event.params)
            this.text += event.params.project
        }
    }
}
</script>

