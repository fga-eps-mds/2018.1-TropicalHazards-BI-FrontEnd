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
          <div class="form-group">
            <label for="p-name">
              Tipo de Display:
            </label>
            <select
              id="p-name"
              v-model="question.display"
              class="form-control"
              placeholder="Ex.: Gráfico de Pessoas">
              <option value="table">Tabela</option>
            </select>
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
            question:{
                name: "",
                display: "",
                query_aggregation: [],
                query_filter: [],
                query_breakout: []
            },
            uuid: "",
            options: [
              {text: "Tabela", value:"table"}
            ],
        }
    },
    methods: {
        splitQuestion(){
            this.query_aggregation = this.query.aggregation
            this.query_filter = this.query.filter
            this.query_breakout = this.query.breakout
        },
        createQuestion() {
            this.$http.post("metabase/" + this.id,
                this.question,
                {
                    headers:
                    {
                        "Authorization": "JWT " + localStorage.token,
                        "content-type": "application/json"
                    }
                }
            ).then(result => {
                console.log(result)
            },
            error => {
            })
        }
    }
}


</script>

