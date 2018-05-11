<template>
  <modal
    :width="600"
    :height="550"
    name="import-csv"
    @before-open="beforeOpen">

    <!-- @before-open="beforeOpen"> -->
    <div class="container center-align">
      <h4>Inserir Dados</h4>
      <h2>Id do Projeto: {{ project }}</h2>
      <p>passo 1: carregue o arquivo</p>
      <form>
        <div class="row">
          <div class="file-field input-field">
            <div class="btn">
              <span>Selecione o arquivo</span>
              <input
                id="file"
                ref="file"
                class="file-path validate"
                type="file"
                @change="handleFileUpload ()">
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
            class="modal-action modal-close waves-effect waves-light grey white-text btn-flat"
            @click="$modal.hide('import-csv')">
            Voltar
          </a>
        </div>
        <div class="col s12 offset-m4 m4">
          <a
            href="#!"
            class="modal-action modal-close waves-effect waves-light blue lighten-1 white-text btn-flat"
            @click="submitFile ()">
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
            text: "Project id: ",
            project: "",
            file: ""
        }
    },
    methods: {
        beforeOpen(event) {
            // console.log("Event:", event)
            // console.log("Params:", event.params)
            this.project = event.params.project
        },
        handleFileUpload(){
            this.file = this.$refs.file.files[0]
        },
        submitFile(){
            let formData = new FormData ()
            formData.append("file", this.file)
            formData.append("project", this.project)
            this.$http.post(
                "import/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": "JWT " + localStorage.token
                    }
                }
            ).then((response) => {
            })
        },
    }
}
</script>

