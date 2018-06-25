<template>
  <div class="container-fluid">
    <b-alert
      :variant="alert.variant"
      :show="alert.show"
      dismissible
      @dismissed="alert.show=false">
      <p class="text-center">{{ alert.text }}</p>
    </b-alert>
    <div class="row">
      <div class="col">
        <div class="form-group">
          <form>
            <div style="text-align: center">
              <h4>Confirmar Dados Selecionados</h4>
            </div>
            <div class="form-group">
              <b-table
                :fields="fields"
                :items="headers"
                :current-page="currentPage"
                :per-page="perPage"
                responsive
                bordered />
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
                <span class="fa fa-check"/> Confirmar
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
        file: {
            type: Object,
            required: true
        },
        headers: {
            type: Array,
            required: true
        },
        project: {
            type: Number,
            required: true
        }
    },
    data(){
        return {
            currentPage: 1,
            perPage: 4,
            fields: [
                { key: "name", label: "Nome"},
                { key: "example", label: "Exemplo"},
                { key: "selected", label: "Salvar?"},
                { key: "acceptNull", label: "Pode ser nulo?"},
                { key: "type", label: "Tipo"},
                { key: "transform", label: "Transformar"},
            ],
            alert: {
                variant: "",
                text: "",
                show: false
            },
        }
    },
    computed: {
        totalRows(){
            return this.headers.length
        }
    },
    methods: {
        buttonHandler(){
            this.submitFile()
        },
        submitFile(){
            let formData = new FormData ()
            formData.append("file", this.file)
            formData.append("project", this.project.id)
            formData.append("headers", JSON.stringify(this.headers))
            this.$http.post(
                "import/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": "JWT " + localStorage.token
                    }
                }
            /*eslint-disable-next-line*/
            ).then((response) => {
                this.alert.variant = "success"
                this.alert.text = "Arquivo importado com sucesso!"
                this.alert.show = true

            },
            error => {
                error.log(error)
                this.alert.variant = "danger"
                this.alert.text = "Falha ao importar o arquivo!"
                this.alert.show = true
            })
        },

    }

}
</script>
