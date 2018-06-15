<template>
  <div class="container">
    <div class="row">
      <filter-button
        :fields="fields"
        @createdFilter="addFilterClause"/>
      <aggregation :fields="fields" />
    </div>
  </div>
</template>

<script>
import FilterButton from "./AddFilter"
import Aggregation from "./Aggregation"
import { mapGetters } from "vuex"

export default {
    components: {
        "filter-button": FilterButton,
        "aggregation": Aggregation
    },
    data (){
        return {
            query: {
                filter: [
                    "AND"
                ],
                aggregation: [],
                breakout: [],
            }
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
            this.query.filter.push(value)
        },
        updateAggregation(value){
            this.query.aggregation[0] = value
        }
    }
}
</script>

<style>

</style>
