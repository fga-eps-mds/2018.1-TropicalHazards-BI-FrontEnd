<template>
  <modal
    :width="600"
    :height="350"
    name="import-csv"
    @before-open="beforeOpen">

    <v-dialog
      @before-opened="dialogEvent('before-open')"
      @before-closed="dialogEvent('before-close')"
      @opened="dialogEvent('opened')"
      @closed="dialogEvent('closed')"/>
    <div class="container center-align">
      <h4>Inserir Dados</h4>
      <p>passo 1: carregue o arquivo</p>
      <form>
        <div class="row">
          <div class="file-field input-field">
            <div class="btn">
              <span>Selecione o arquivo</span>
              <input
                id="file"
                ref="file"
                type="file"
                autoComplete="off"
                required
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
            file: null,
            error: null
        }
    },
    methods: {
        beforeOpen(event) {
            this.project = event.params.project
            this.file = null
        },
        handleFileUpload(){
            this.file = this.$refs.file.files[0]
        },
        checkForm(){
            if(this.file) return true
            this.error = null
            if(!this.file)
                this.error = "Selecione um arquivo"
            return false
        },
        submitFile(){
            if(this.checkForm()){
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
                    if(response.status == 201){
                        this.showUploadSucess()
                    }
                },
                error => {
                    this.showUploadFail()
                    error.log(error)
                })
            }else{
                this.showInvalidForm(this.error)
            }
        },
        showUploadSucess () {
            this.$modal.show("dialog", {
                title: "Sucesso",
                text: "Arquivo enviado com sucesso",
                buttons: [
                    {
                        title: "Continuar",
                        handler: () => {
                            //APAGAR LINHA ABAIXO QUANDO ESTIVER PRONTA PARTE DE RETORNAR CABEÇALHOS
                            //SEGUIR PARA ETAPA DE CABEÇALHOS
                            this.$modal.hide("import-csv")
                            this.$modal.hide("dialog")
                        }
                    },
                ]
            })
        },
        showUploadFail(){
            this.$modal.show("dialog", {
                title: "Erro",
                text: "Arquivo inválido",
                buttons: [
                    {
                        title: "Tentar novamente",
                        handler: () => {
                            this.file = null
                            this.$modal.hide("dialog")
                        }
                    },
                    {
                        title: "Cancelar",
                        handler: () => {
                            this.$modal.hide("import-csv")
                            this.$modal.hide("dialog")
                        }
                    }
                ]
            })
        },
        showInvalidForm(error){
            this.$modal.show("dialog", {
                title: "Erro",
                text: error,
                buttons: [
                    {
                        title: "Continuar",
                        handler: () => {
                            this.file = null
                            this.$modal.hide("dialog")
                        }
                    }
                ]
            })

        }
    }
}
</script>

