<template>
  <modal
    :width="800"
    :height="500"
    name="send-data"
    @before-open="beforeOpen">
    <v-dialog />
    <!-- @before-opened="dialogEvent('before-open')"
    @before-closed="dialogEvent('before-close')"
    @opened="dialogEvent('opened')"
    @closed="dialogEvent('closed')" -->
    <div class="modal-content container center-align">
      <h4>Inserir Dados</h4>
      <p>Resumo</p>
    </div>
    <div class="content">
      <table>
        <thead>
          <tr>
            <th>Número</th>
            <th>Nome</th>
            <th>Salvar</th>
            <th>Tipo</th>
            <th>Caracterização</th>
            <th>Exemplo</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in headers"
            v-if="item.selected"
            :key="item.id">
            <td>{{ item.id + 1 }}</td>
            <td>
              {{ item.name }}
            </td>
            <td v-if="item.selected">
              Sim
            </td>
            <td v-else>
              Não
            </td>
            <td>
              {{ item.type }}
            </td>
            <td>
              ---
            </td>
            <td>
              {{ item.example }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="modal-footer">
      <div class="row center-align">
        <div class="col s12 m4">
          <a
            class="modal-action modal-close waves-effect waves-light grey white-text btn-flat"
            @click="$modal.hide('send-data')">
            Voltar
          </a>
        </div>
        <div class="col s12 offset-m4 m4">
          <a
            class="modal-action modal-close waves-effect waves-light blue lighten-1 white-text btn-flat"
            @click="submitFile()">
            Concluir
          </a>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
    name: "SendData",
    data (){
        return {
            project: "",
            headers: [],
            remove: [],
            define: [],
            types: [],
            file: null
        }
    },
    methods: {
        beforeOpen(event) {
            this.headers = []
            this.file = null
            this.project = ""
            this.project = event.params.project
            this.headers = event.params.headers
            this.file = event.params.file
        },
        buttonHandler(){
            this.submitFile()
        },
        // splitHeaders(){
        //     for(var i = 0; i< this.headers.length; i++){
        //         if(this.headers[i].selected == true){
        //             this.define.push(this.headers[i].name)
        //             this.types.push(this.headers[i].type)
        //         }else{
        //             this.remove.push(this.headers[i].name)
        //         }
        //     }
        // },
        submitFile(){
            let formData = new FormData ()
            formData.append("file", this.file)
            formData.append("project", this.project)
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
            ).then((response) => {
                if(response.status == 201){
                    this.showUploadSucess()
                    this.showFilterCsv ()
                }
            },
            error => {
                this.showUploadFail()
                error.log(error)
            })
        },
        showUploadSucess () {
            this.$modal.show("dialog", {
                title: "Sucesso",
                text: "Arquivo enviado com sucesso",
                buttons: [
                    {
                        title: "Continuar",
                        handler: () => {
                            // this.$modal.hide("import-csv")
                            this.$modal.hide("dialog")
                        }
                    },
                ]
            })
        },
        showUploadFail(){
            this.$modal.show("dialog", {
                title: "Erro",
                text: "Houve uma falha no envio",
                buttons: [
                    {
                        title: "Tentar novamente",
                        handler: () => {
                            this.file = null
                            this.$modal.hide("dialog")
                        }
                    },
                    {
                        title: "Cancelar",
                        handler: () => {
                            this.$modal.hide("import-csv")
                            this.$modal.hide("dialog")
                        }
                    }
                ]
            })
        },

    }

}
</script>

<style lang="scss" scoped>
div.content {
  height: 300px;
  overflow: auto;
  padding: 20px;
}
.modal-footer {
  padding-top: 20px;
}

</style>
