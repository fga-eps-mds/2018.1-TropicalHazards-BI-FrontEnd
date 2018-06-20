<template>
  <div class="container-fluid">
    <!-- <header>
      <h2>
        Novo projeto
      </h2>
    </header> -->
    <div class="row">
      <div class="col col-md-6 offset-md-3">
        <div class="form-group">
          <form>
            <div style="text-align: center">
              <h4>Inserir Dados</h4>
              <p>passo 1: carregue o arquivo</p>
            </div>
            <div class="form-group">
              <b-form-file
                v-model="file"
                :state="Boolean(file)"
                placeholder="Escolha um arquivo..."
                accept=".csv" />
            </div>
            <div class="row">
              <button
                class="col btn btn-green btn-block btn-lg"
                @click="buttonHandler()">
                <span class="fa fa-check"/> Continuar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FilterCsvModal from "@/components/Files/FilterCsv.vue"
import LineNavigator from"../../../node_modules/line-navigator/line-navigator.js"
import Papa from "../../../node_modules/papaparse/papaparse.js"

export default {
    name: "ImportCsv",
    components: {
        "filter-csv-modal": FilterCsvModal
    },
    data (){
        return {
            file: null,
            error: null,
            reader: {
                indexToStartWith: 0,
                numberOfLines: 2
            },
            navigator: null,
        }
    },
    methods: {
        beforeOpen() {
            this.headers = []
            this.file = null
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
                    // Papa.parse(line, {
                    //     header: true,
                    //     completed: result =>{
                    //         this.showFilterCsv(result.data)
                    //     }
                    // })
                    var header = Papa.parse(line, {header: true})
                    this.showFilterCsv(header.data)
                })
        },
        buttonHandler(){
            if(this.checkForm()){
                this.getHeaders()
            }
        },
        showFilterCsv(header){
            this.$emit("filterFile", { header: header[0], file: this.file})
            // this.$router.push({name: "FilterCsv", params: { header: header[0], file: this.file }})
        },

    }
}
</script>

