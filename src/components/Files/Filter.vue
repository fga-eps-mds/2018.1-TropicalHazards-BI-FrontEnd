<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="form-group">
          <form>
            <div style="text-align: center">
              <h4>Filtrar</h4>
              <p>passo 2: selecione os tipos de dados</p>
            </div>
            <div class="form-group">
              <b-table
                :fields="fields"
                :items="headers"
                :current-page="currentPage"
                :per-page="perPage"
                responsive
                bordered>
                <template
                  slot="selected"
                  slot-scope="data">
                  <b-form-checkbox
                    v-model="data.item.selected"
                    success/>
                </template>
                <template
                  slot="type"
                  slot-scope="data">
                  <b-form-select
                    :options="typeOptions"
                    v-model="data.item.type"
                    class="mb-3" />
                </template>
                <template
                  slot="acceptNull"
                  slot-scope="data">
                  <b-form-checkbox
                    v-model="data.item.acceptNull" />
                </template>
                <template
                  slot="transform"
                  slot-scope="data">
                  <b-form-select
                    :options="transformOptions"
                    :disabled="!(data.item.type == 'bool' || data.item.type == 'str')"
                    v-model="data.item.transform" />
                </template>
              </b-table>
              <b-row>
                <b-col
                  md="6"
                  class="my-1">
                  <b-pagination
                    :total-rows="totalRows"
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
        },
    },
    data (){
        return {
            currentPage: 1,
            perPage: 3,
            fields: [
                { key: "name", label: "Nome"},
                { key: "example", label: "Exemplo"},
                { key: "selected", label: "Salvar?"},
                { key: "acceptNull", label: "Pode ser nulo?"},
                { key: "type", label: "Tipo"},
                { key: "transform", label: "Transformar"},
            ],
            typeOptions: [
                { text: "", value: ""},
                { text: "Booleano", value: "bool"},
                { text: "Inteiro", value: "int64"},
                { text: "Flutuante", value: "float64"},
                { text: "String", value: "str"}
            ],
            transformOptions: [
                { text: "Não transformar", value: ""},
                { text: "Transformar Maíusculo", value:"upper"},
                { text: "Transformar Minúsculo", value: "lower"}
            ]
        }
    },
    computed: {
        totalRows(){
            return this.headers.length
        }
    },
    methods: {
        buttonHandler(){
            this.$emit("filterContinue", this.headers)
        }
    }
}
</script>

