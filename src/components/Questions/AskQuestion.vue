<template>
  <div class="container-fluid">
    <header>
      <h2>
        Nova Question
      </h2>
    </header>
    <div class="row">
      <div class="col col-md-6 offset-md-3">
        <b-alert
          :variant="alert.status"
          :show="alert.show"
          dismissible
          @dismissed="alert.show=false">
          <p>{{ alert.text }}</p>
        </b-alert>
        <form>
          <div class="form-group">
            <label for="p-name">
              Nome da Question:
            </label>
            <input
              id="p-name"
              v-model="question.name"
              type="text"
              class="form-control"
              placeholder="Ex.: Gráfico de Pessoas">
          </div>
          <div class="form-group" >
            <label for="p-name">
              Tipo de Display:
            </label>
            <b-form-select
              id="p-name"
              v-model="question.display"
              :options="options"
              class="form-control" />
          </div>
          <div
            v-if="question.display != 'table'"
            class="form-group">
            <label for="p-dimension">
              Eixo X:
            </label>
            <b-form-select
              id="p-dimension"
              v-model="question.dimension"
              :options="fields" />
          </div>
          <div
            v-if="question.display != 'table'"
            class="form-group">
            <label for="p-metric">
              Eixo Y:
            </label>
            <b-form-select
              id="p-metric"
              v-model="question.metric"
              :options="fields" />
          </div>
          <div class="row">
            <button
              class="col btn btn-green btn-block btn-lg"
              @click="createQuestion()">
              <span class="fa fa-check"/> Salvar
            </button>
            <router-link
              :to="{ name: 'MyProjects' }"
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
/* eslint-disable */
import { mapGetters } from "vuex"

export default {
    props: {
        query: {
            required: true,
            type: Object
        },
        id: {
            type: Number,
            required: true
        }
    },
    data () {
        return {
            alert: {
                variant: "",
                text: "",
                show: false
            },
            question:{
                name: "",
                display: "table",
                query_aggregation: [],
                query_filter: [],
                query_breakout: [],
                dimension: "",
                metric: ""
            },
            uuid: "",
            options: [
              {text: "Tabela", value:"table"},
              {text: "Gráfico de Linha", value:"line"},
              {text: "Gráfico de Barra", value:"bar"},
              {text: "Gráfico de Área", value:"area"}
            ],
        }
    },
    computed: {
        ...mapGetters({fields: "getCurrentProjectFieldsWithoutValue"})
    },
    methods: {
        splitQuestion(){
            this.question.query_aggregation = this.query.aggregation
            this.question.query_filter = this.query.filter
            this.question.query_breakout = this.query.breakout
        },
        createQuestion() {
            this.splitQuestion()
            console.log(this.question.query_filter)
            this.$http.post("metabase/" + this.id,
                this.question,
                {
                    headers:
                    {
                        "Authorization": "JWT " + localStorage.token,
                        "content-type": "application/json"
                    }
                }
            ).then(response=>{
                this.alert.variant = "success"
                this.alert.text = "Indicador criado com sucesso"
                this.alert.show = true
            }, err => {
                this.alert.variant = "warning"
                this.alert.text = "Houve uma falha ao criar o indicador"
                this.alert.show = true
            })
        }
    }
}


</script>

