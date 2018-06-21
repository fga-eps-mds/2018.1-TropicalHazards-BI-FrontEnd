<template>
  <div class="container-fluid">
    <header>
      <h2>
        Nova Question
      </h2>
    </header>
    <div class="row">
      <div class="col col-md-6 offset-md-3">
        <form>
          <div class="form-group">
            <filter-button
              :fields="fields"
              @createdFilter="addFilterClause"/>
          </div>
          <aggregation
            :fields="fields"
            @updateAggregation="updateAggregation"/>
          <breakout
            :fields="fields"
            @updateBreakout="updateBreakout" />
          <div class="row">
            <button
              class="col btn btn-green btn-block btn-lg"
              @click="generateQuery()">
              <span class="fa fa-check"/> Continuar
            </button>
            <router-link
              :to="{ name: 'HomePage' }"
              class="col btn btn-grey btn-block mt-0 btn-lg">
              <span class="fa fa-undo"/> Voltar
            </router-link>
          </div>
        </form>
      </div>
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
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data (){
        return {
            // PROVAVELMENTE MELHOR DEIXAR OS ELEMENTOS DE FORA DA QUERY E DAR ASSIGN NELES ANTES DE ENVIAR
            // PRO PRÓXIMO PASSO
            query: {
                filter: [ "AND",
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
        this.$store.dispatch("loadCurrentProjectFields", this.id)
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
            this.$router.push({name: "AskQuestion", params: {query: this.query, id: this.id }})
        }
    }
}
</script>

<style>

</style>
