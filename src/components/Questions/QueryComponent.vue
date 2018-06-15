<template>
  <div class="container">
    <div class="row">
      <filter-button
        :fields="fields"
        @createdFilter="addFilterClause"/>
      <aggregation
        :fields="fields"
        @updateAggregation="updateAggregation"/>
      <breakout
        :fields="fields"
        @updateBreakout="updateBreakout" />
    </div>
  </div>
</template>

<script>
import FilterButton from "./AddFilter"
import Aggregation from "./Aggregation"
import Breakout from "./Breakout"

import { mapGetters } from "vuex"

export default {
    components: {
        "filter-button": FilterButton,
        "aggregation": Aggregation,
        "breakout": Breakout
    },
    data (){
        return {
            // PROVAVELMENTE MELHOR DEIXAR OS ELEMENTOS DE FORA DA QUERY E DAR ASSIGN NELES ANTES DE ENVIAR
            // PRO PRÓXIMO PASSO
            query: {
                filter: ["AND",
                    []],
                aggregation: [],
                breakout: [],
            },
            filter: []
        }
    },
    computed: {
        ...mapGetters({
            fields: "getCurrentProjectFields"
        })
    },
    beforeMount(){
        this.$store.dispatch("loadCurrentProjectFields", 4)
    },
    methods: {
        addFilterClause(value){
            this.filter.push(value)
        },
        updateAggregation(value){
            this.query.aggregation = value
        },
        updateBreakout(value){
            this.query.breakout = value
        },
        generateQuery(){
            if(this.filter.length == 0){
                delete this.query.filter
            }else{
                Array.prototype.push.apply(this.query.filter[1], this.filter)
            }
            if(this.query.aggregation == 0){
                delete this.query.aggregation
            }
            if(this.query.breakout == 0){
                delete this.query.breakout
            }
            console.log(JSON.stringify(this.query))
        }
    }
}
</script>

<style>

</style>
