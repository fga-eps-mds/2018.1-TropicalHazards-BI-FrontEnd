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
    <import-csv />
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
    }
}
</script>

<style>

</style>
