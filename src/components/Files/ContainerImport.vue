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
        <transition name="fade">
          <import-csv
            v-if="step == 1"
            @filterFile="filterFile" />
          <filter-csv
            v-else-if="step == 2"
            :headers = "headers"
            :rows = "totalRows" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import ImportCsv from "@/components/Files/ImportCsv"
import FilterCsv from "@/components/Files/Filter"

export default {
    components: {
        "import-csv": ImportCsv,
        "filter-csv": FilterCsv
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
                return { name: key, example: header[key], type: null, acceptNull: false, selected: false, transform: "", true: "", false: ""}
            })
        },

    }
}
</script>

<style>

</style>
