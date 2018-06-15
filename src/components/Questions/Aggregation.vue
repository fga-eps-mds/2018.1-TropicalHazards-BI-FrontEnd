<template>
  <div class="container">
    <div class="row">
      <b-form-group
        horizontal
        class="mb-1"
        label="Visualizar"
        label-for="pop"
        description="Escolha um valor"
        invalid-feedback="Campo obrigatório">
        <b-form-select
          id="pop"
          :options="options"
          v-model="operator"
          size="sm"/>
      </b-form-group>
      <b-form-group
        horizontal
        class="mb-1"
        label=""
        label-for="pop"
        description="Campo"
        invalid-feedback="Campo obrigatório">
        <b-form-select
          id="pop"
          :options="fields"
          :disabled="!fieldEnabled"
          v-model="field"
          size="sm"/>
      </b-form-group>
    </div>
  </div>

</template>

<script>

export default {
    props: {
        fields: {
            type: Array,
            required: true
        }
    },
    data(){
        return {
            options: [
                {text: "Dado Cru", value: ""},
                {text: "Média de", value: "avg"},
                {text: "Contagem de", value: "count"},
                {text: "Contagem Cumulativa de", value: "cum-count"},
                {text: "Valores Distintos de", value: "distinct"},
                {text: "Soma de", value: "sum"},
                {text: "Menor Valor de", value: "min"},
                {text: "Maior Valor de", value: "max"}
            ],
            field: "",
            fieldEnabled: false,
            operator: "",
            aggregationClause: [],
        }
    },
    watch: {
        operator (val){
            if(val != ""){
                this.fieldEnabled = true
                this.emitAggregation()
                return
            }
            this.emitAggregation()
            this.fieldEnabled = false
            return
        },
        field(){
            this.emitAggregation()
        }
    },
    methods: {
        emitAggregation(){
            if(this.operator != ""){
                if(this.field != ""){
                    this.aggregationClause[0] = this.operator
                    this.aggregationClause[1] = this.field
                }
            }else{
                this.aggregationClause = []
            }
            this.$emit("updateAggregation", this.aggregationClause)
        }
    }
}
</script>

<style>

</style>
