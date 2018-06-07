<template>

  <modal
    :width="800"
    :height="500"
    name="ask-question"
    @before-open="beforeOpen">

    <div class="container">
      <div class="row">
        <h1> Gerar indicador </h1>
        <p> Nome </p>
        <input
          v-model="question.name"
          type="text"
          placeholder="Nome">
        <p> Tipo do gráfico </p>
        <input
          v-model="question.display"
          type="text"
          placeholder="Tipo do gráfico">
      </div>
      <button
        style="text-align: center;"
        class="btn-large blue"
        v-on:
        @click="createQuestion()">
        Criar IFRAME
      </button>
    </div>
  </modal>

</template>

<script>
/* eslint-disable */

export default {
    name: "AskQuestion",


    data () {

        return {
            question:{
                name: "",
                display: ""
            },
            uuid: "",
            dashboard: ""

        }

    },

    methods: {
        beforeOpen(event) {
            this.dashboard = event.params.dashboard
        },
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
                console.log(result.body)
            },
            error => {
            })
        }
    }
}


</script>

