<template>
  <div>
    <filter-button @createdFilter="addFilterClause"/>
    <p>{{ query }}</p>
  </div>
</template>

<script>
import FilterButton from "./AddFilter"

export default {
    components: {
        "filter-button": FilterButton
    },
    data (){
        return {
            query: {
                filter: [
                    "AND"
                ]
            }
        }
    },
    methods: {
        addFilterClause(value){
            this.query.filter.push(value)
        }
    }
}
</script>

<style>

</style>
