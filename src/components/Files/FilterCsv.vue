<template>
  <modal
    :width="800"
    :height="450"
    name="filter-csv"
    @before-open="beforeOpen">
    <div class="container-overflow">
      <v-dialog
        @before-opened="dialogEvent('before-open')"
        @before-closed="dialogEvent('before-close')"
        @opened="dialogEvent('opened')"
        @closed="dialogEvent('closed')"/>
      <div class="container center-align">
        <h4>Filtrar Arquivo</h4>
        <p>Selecione as colunas que devem ser inseridas no arquivo</p>
        <p>{{ listHeaders }} </p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Número</th>
            <th>Nome coluna</th>
            <th>Salvar?</th>
            <th>Exemplo</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="header in headers"
            :key="header.key">
            <td>{{ header.index }}</td>
            <td>
              {{ header.key }}
            </td>
            <td>
              <p>
                <label>
                  <input type="checkbox">
                  <span>Salvar</span>
                </label>
              </p>
            </td>
            <td>
              {{ header.value }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="modal-footer">
        <div class="row center-align">
          <div class="col s12 m4">
            <a
              class="modal-action modal-close waves-effect waves-light grey white-text btn-flat"
              @click="$modal.hide('filter-csv')">
              Voltar
            </a>
          </div>
          <div class="col s12 offset-m4 m4">
            <a
              class="modal-action modal-close waves-effect waves-light blue lighten-1 white-text btn-flat">
              Próximo
            </a>
          </div>
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
            project: "",
            importData: {},
            headers: [],
            file: null
        }
    },
    methods: {
        beforeOpen(event) {
            this.project = event.params.project
            this.headers = event.params.headers
            this.file = event.params.file
            this.getImportData ()
        },
        getImportData () {
            this.$http.get("import/" + this.project + "/" , { headers: { "Authorization": "JWT " + localStorage.token } }).then(result => {
                this.importData = result.data
                this.listHeaders = Object.keys(this.importData[0])
            },
            error => {
                error.log(error)
            })
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
                        this.showFilterCsv ()
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
                            // this.$modal.hide("import-csv")
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
    }
}
</script>
<style>
div.container-overflow {
  height: 450px;
  overflow: scroll;
  padding: 20px;
}
</style>
