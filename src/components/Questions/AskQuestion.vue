<template>
  <div class="container-fluid">
    <header>
      <h2>
        Nova Question
      </h2>
      <h3>{{ JSON.stringify(query) }}</h3>
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
              <options value="table">Tabela</options>
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
        }
    },
    data () {
        return {
            question:{
                name: "",
                display: ""
            },
            uuid: "",
            options: [
              {text: "Tabela", value:"table"}
            ],
            dashboard: ""
        }
    },
    beforeMount(){
        console.log(JSON.stringify(this.query))
    },
    methods: {
        createQuestion() {
            this.$http.post("metabase/" + this.dashboard ,
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

