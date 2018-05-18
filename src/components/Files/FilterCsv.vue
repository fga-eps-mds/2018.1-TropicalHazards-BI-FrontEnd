<template>
  <modal
    :width="600"
    :height="350"
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
      <p>{{ listHeaders }} </p>
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
        <div class="col s12 offset-m4 m4">
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
            listHeaders: ""
        }
    },
    methods: {
        beforeOpen(event) {
            this.project = event.params.project
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

    }
}
</script>

