<template>
  <div class="container">
    <div class="row">
      <b-form-group
        horizontal
        class="mb-1"
        label="Agrupar por"
        label-for="pop"
        description="Campo"
        invalid-feedback="Campo obrigatório">
        <b-form-select
          id="pop"
          :options="fields"
          v-model="field"
          size="sm" >
          <option
            selected
            value="">Não agrupar</option>
        </b-form-select>
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
            field: "",
            breakoutClause: [],
        }
    },
    watch: {
        field(){
            this.emitAggregation()
        }
    },
    methods: {
        emitAggregation(){
            if(this.field != ""){
                this.breakoutClause[0] = "field-id"
                this.breakoutClause[1] = this.field.value
            }else{
                this.breakoutClause = []
            }
            this.$emit("updateBreakout", this.breakoutClause)
        }
    }
}
</script>

<style>

</style>
