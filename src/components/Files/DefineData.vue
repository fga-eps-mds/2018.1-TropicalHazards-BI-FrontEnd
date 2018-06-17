<template>
  <modal
    :width="800"
    :height="500"
    name="define-data"
    @before-open="beforeOpen">
    <!-- <v-dialog
      @before-opened="dialogEvent('before-open')"
      @before-closed="dialogEvent('before-close')"
      @opened="dialogEvent('opened')"
      @closed="dialogEvent('closed')"/> -->
    <send-data-modal />
    <div class="modal-content container center-align">
      <h4>Inserir Dados</h4>
      <p>passo 3: Indique os tipos</p>
    </div>
    <div class="content">
      <table>
        <thead>
          <tr>
            <th>Número</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Caracterização</th>
            <th>Pode ser Nulo?</th>
            <th>Transformar?</th>
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
            <td>
              <div class="input-field">
                <select v-model="item.type">
                  <option
                    value=""
                    disabled
                    selected>Selecione o tipo</option>
                  <option value="bool">Booleano</option>
                  <option value="int64">Inteiro</option>
                  <option value="float64">Flutuante</option>
                  <option
                    value="geodata"
                    disabled>Geodata</option>
                  <option value="str">String</option>
                  <option
                    value="list">List</option>
                  <option
                    value="date">Data</option>
                  <option
                    value="identifier">Identificador</option>
                </select>
              </div>
            </td>
            <td>
              ---
            </td>
            <td>
              <p>
                <label>
                  <input
                    v-model="item.acceptNull"
                    type="checkbox">
                  <span />
                </label>
              </p>
            </td>
            <td>
              <div class="input-field">
                <select
                  v-if="item.type == 'bool' || item.type =='str'"
                  v-model="item.transform">
                  <option
                    value=""
                    selected>Não transformar</option>
                  <option value="upper">Maiúsculo</option>
                  <option value="lower">Minúsculo</option>
                </select>
              </div>
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
            @click="$modal.hide('define-data')">
            Voltar
          </a>
        </div>
        <div class="col s12 offset-m4 m4">
          <a
            class="modal-action modal-close waves-effect waves-light blue lighten-1 white-text btn-flat"
            @click="buttonHandler(headers)">
            Próximo
          </a>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
import SendData from "@/components/Files/SendData.vue"

export default {
    name: "DefineData",
    components: {
        "send-data-modal": SendData
    },
    data (){
        return {
            project: "",
            headers: [],
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
        buttonHandler(headers){
            if(this.checkForm(headers)){
                this.showSendData ()
            }else{
                this.showInvalidForm()
            }
        },
        showSendData (){
            this.$modal.show("send-data", { project: this.project, headers: this.headers, file: this.file })
        },
        checkForm(headers){
            for(var i = 0; i<headers.length; i++){
                if(headers[i].type == null && headers[i].selected == true){
                    return false
                }
            }
            return true
        },
        showInvalidForm(){
            this.$modal.show("dialog", {
                title: "Erro",
                text: "Você deve definir todos os tipos de dado antes de prosseguir",
                buttons: [
                    {
                        title: "Continuar",
                        handler: () => {
                            this.file = null
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
div select{
  display: inline-block;
}
</style>
