<template>
  <modal
    :width="800"
    :height="500"
    name="filter-csv"
    @before-open="beforeOpen">
    <v-dialog
      @before-opened="dialogEvent('before-open')"
      @before-closed="dialogEvent('before-close')"
      @opened="dialogEvent('opened')"
      @closed="dialogEvent('closed')"/>
    <div class="container center-align">
      <h4>Filtrar Arquivo</h4>
      <p>Selecione as colunas que devem ser inseridas no arquivo</p>
    </div>
    <div class="content">
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
            v-for="{id, name, value, selected} in headers"
            :key="id">
            <td>{{ id+1 }}</td>
            <td>
              {{ name }}
            </td>
            <td>
              <p>
                <label>
                  <input
                    type="checkbox">
                  <span>Salvar</span>
                </label>
              </p>
            </td>
            <td>
              {{ value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="modal-footer">
      <div class="row center-align">
        <div class="col s12 m4">
          <a
            class="modal-action modal-close waves-effect waves-light grey white-text btn-flat"
            @click="$modal.hide('filter-csv')">
            Voltar
          </a>
        </div>
        <div class="col m4">
          <label>
            <input
              type="checkbox">
            <span>Selecionar todos</span>
          </label>
        </div>
        <div class="col s12 m4">
          <a
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
            project: "",
            importData: {},
            headers: [],
            file: null
        }
    },
    methods: {
        beforeOpen(event) {
            this.header = null
            this.projecnumbert = event.params.project
            // this.headers = event.params.header
            // console.log(this.headers)
            this.headers = this.convertToList(event.params.header)
            console.log(this.headers)
            this.file = event.params.file
        },
        convertToList(header){
            var id = 0
            return Object.keys(header).map(function(key){
                return { id: id++ , name: key, value: header[key], type: "", selected: false}
            })
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
div.content {
  height: 300px;
  overflow: auto;
  padding: 20px;
}
.modal-footer {
  padding-top: 20px;
}
</style>
