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
      <import-csv
        v-if="step == 1"
        @filterFile="filterFile" />
    </div>
  </div>
</template>

<script>
import ImportCsv from "@/components/Files/ImportCsv"

export default {
    components: {
        "import-csv": ImportCsv
    },
    props: {
        project: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            step: 1
        }
    },
    methods: {
        filterFile(value){
            console.log(value)
        }
    }
}
</script>

<style>

</style>
