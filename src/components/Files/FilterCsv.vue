<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col col-md-6 offset-md-3">
        <div class="row">
          <form>
            <div style="text-align: center">
              <h4>Inserir Dados</h4>
              <p>passo 1: carregue o arquivo</p>
            </div>
          </form>
          <!-- <div class="col s12 m4">
            <a
              class="modal-action modal-close waves-effect waves-light blue lighten-1 white-text btn-flat"
              @click="showDefineData()">
              Próximo
            </a>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DefineDataModal from "@/components/Files/DefineData.vue"


export default {
    name: "ImportCsv",
    components: {
        "define-data-modal": DefineDataModal
    },
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
            this.project = event.params.project
            this.headers = this.convertToList(event.params.header)
            this.file = event.params.file
        },
        convertToList(header){
            var id = 0
            return Object.keys(header).map(function(key){
                return { id: id++ , name: key, example: header[key], type: null, acceptNull: false, selected: false, transform: "", true: "", false: ""}
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
        showDefineData (){
            this.$modal.show("define-data", { project: this.project, headers: this.headers, file: this.file })
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
