<template>
  <modal
    :width="800"
    :height="500"
    name="define-data"
    @before-open="beforeOpen">
    <v-dialog
      @before-opened="dialogEvent('before-open')"
      @before-closed="dialogEvent('before-close')"
      @opened="dialogEvent('opened')"
      @closed="dialogEvent('closed')"/>
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
            <th>Exemplo</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in headers"
            :key="item.id">
            <td>{{ item.id }}</td>
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
                  <option value="interger">Inteiro</option>
                  <option value="float">Flutuante</option>
                  <option
                    value="geodata"
                    disabled>Geodata</option>
                  <option value="string">String</option>
                  <option
                    value="list"
                    disabled>List</option>
                  <option
                    value="data">Data</option>
                  <option
                    value="identifier"
                    disabled>Identificador</option>
                </select>
              </div>
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
            @click="$modal.hide('define-data')">
            Voltar
          </a>
        </div>
        <div class="col s12 offset-m4 m4">
          <a
            class="modal-action modal-close waves-effect waves-light blue lighten-1 white-text btn-flat"
            @click="show()">
            Próximo
          </a>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
export default {
    name: "DefineData",
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
        }
    }
}
</script>
<style>
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
