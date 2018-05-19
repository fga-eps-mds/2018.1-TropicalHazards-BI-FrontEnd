<template>
  <modal
    :width="600"
    :height="450"
    name="import-csv"
    @before-open="beforeOpen">
    <filter-csv-modal />
    <!-- <v-dialog
      @before-opened="dialogEvent('before-open')"
      @before-closed="dialogEvent('before-close')"
      @opened="dialogEvent('opened')"
      @closed="dialogEvent('closed')"/> -->
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
            @click="buttonHandler ()">
            Próximo
          </a>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import FilterCsvModal from "@/components/Files/FilterCsv.vue"
import LineNavigator from"../../../node_modules/line-navigator/line-navigator.js"
import Papaparse from "../../../node_modules/papaparse/papaparse.js"

export default {
    name: "ImportCsv",
    components: {
        "filter-csv-modal": FilterCsvModal
    },

    data (){
        return {
            text: "Project id: ",
            project: "",
            file: null,
            error: null,
            reader: {
                indexToStartWith: 0,
                numberOfLines: 2
            },
            config: {
                header: true
            },
            navigator: null,
            headers: Object
        }
    },
    methods: {
        beforeOpen(event) {
            this.project = event.params.project
            this.headers = []
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
        getHeaders(){
            this.navigator = new LineNavigator(this.file)
            this.navigator.readLines(this.reader.indexToStartWith,
                this.reader.numberOfLines, (err, index, lines) => { // isEof, progress
                    if (err) {
                        throw err
                    }
                    var line = lines[0] + "\n" + lines[1]
                    var header = Papaparse.parse(line, this.config)
                    // const regex = /,(?![^""]*\))/gm
                    // var keys = lines[0].split(",")
                    // var values = lines[1].split(regex)
                    // for (var i = 0; i < keys.length; i++){
                    //     var current = {index: i+1, key: keys[i], value: values[i]}
                    //     this.headers.push(current)
                    // }
                    this.showFilterCsv(header.data)
                })
        },
        buttonHandler(){
            if(this.checkForm()){
                this.handleFileUpload()
                this.getHeaders()
            }
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
        },
        showFilterCsv (header){
            this.$modal.show("filter-csv", { project: this.project, header: header[0], file: this.file })
        },

    }
}
</script>

