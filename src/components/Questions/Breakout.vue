<template>
  <b-container>
    <p>Agrupar por: </p>
    <b-form-row>
      <b-form-group>
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
    </b-form-row>
  </b-container>

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
