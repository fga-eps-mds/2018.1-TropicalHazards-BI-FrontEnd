<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col col-md-6 offset-md-3  ">
        <div class="form-group">
          <form>
            <div style="text-align: center">
              <h4>Definir Valores Booleanos</h4>
            </div>
            <div class="form-group text-center">
              <b-table
                :fields="fields"
                :items="boolValues"
                :current-page="currentPage"
                :per-page="perPage"
                responsive
                bordered>
                <template
                  slot="true"
                  slot-scope="data">
                  <b-form-input
                    v-model="data.item.true" />
                </template>
                <template
                  slot="false"
                  slot-scope="data">
                  <b-form-input
                    v-model="data.item.false" />
                </template>
              </b-table>
              <b-row>
                <b-col
                  md="6"
                  class="my-1">
                  <b-pagination
                    :total-rows="boolValues.length"
                    :per-page="perPage"
                    v-model="currentPage"
                    class="my-0" />
                </b-col>
              </b-row>
            </div>
            <div class="row">
              <button
                class="col btn btn-green btn-block btn-lg"
                @click="buttonHandler()">
                <span class="fa fa-check"/> Continuar
              </button>
              <button
                class="col btn btn-grey btn-block mt-0 btn-lg"
                @click="$emit('goBack')">
                <span class="fa fa-undo"/> Voltar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props: {
        headers: {
            type: Array,
            required: true
        }
    },
    data (){
        return {
            currentPage: 1,
            perPage: 3,
            fields: [
                { key: "name", label: "Nome" },
                { key: "true", label: "Verdadeiro"},
                { key: "false", label: "Falso"}
            ]
        }
    },
    computed: {
        boolValues(){
            return this.headers.filter( header => header.type == "bool")
        }
    },
    methods: {
        buttonHandler(){
            this.$emit("defineBoolContinue", this.headers)
        }
    }
}
</script>
