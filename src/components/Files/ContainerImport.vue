<template>
  <div class="container-fluid">
    <header>
      <h2>
        <router-link
          :to="{ name: 'ProjectDetail', params: { id: project.id } }">
          {{ project.name }}
        </router-link>
        : Importar Arquivo
      </h2>
    </header>
    <div class="row">
      <div class="container-fluid">
        <import-csv
          v-if="step == 1"
          :file = "file"
          @filterFile="filterFile" />
        <filter-csv
          v-else-if="step == 2"
          :headers = "headers"
          :rows = "totalRows"
          @filterContinue="filterContinue"
          @goBack="goBack"/>
        <define-bool
          v-else-if="step == 3"
          :headers = "headers"
          @defineBoolContinue="defineBoolContinue"
          @goBack="goBack" />
        <send-data
          v-else-if="step == 4"
          :headers = "headers"
          :project = "project"
          :file = "file" />
      </div>
    </div>
  </div>
</template>

<script>
import ImportCsv from "@/components/Files/ImportCsv"
import FilterCsv from "@/components/Files/Filter"
import DefineBool from "@/components/Files/DefineBool"
import SendData from "@/components/Files/SendData"

export default {
    components: {
        "import-csv": ImportCsv,
        "filter-csv": FilterCsv,
        "define-bool": DefineBool,
        "send-data": SendData
    },
    props: {
        project: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            step: 1,
            headers: [],
            boolFlag: false,
            totalRows: "",
            file: null
        }
    },
    methods: {
        filterFile(value){
            this.headers = this.convertToList(value.header)
            this.totalRows = this.headers.length
            this.file = value.file
            this.step = 2
        },
        convertToList(header){
            return Object.keys(header).map(function(key){
                return { name: key, example: header[key], type: "str", acceptNull: false, selected: true, transform: "", true: "", false: ""}
            })
        },
        filterContinue(value){
            this.headers = value
            this.step = 3
        },
        defineBoolContinue(value){
            this.headers = value
            this.step = 4
        },
        goBack(){
            this.step = this.step - 1
        },
    }
}
</script>

<style>

</style>
