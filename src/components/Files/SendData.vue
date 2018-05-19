<template>
  <modal
    :width="800"
    :height="500"
    name="send-data"
    @before-open="beforeOpen">
    <v-dialog
      @before-opened="dialogEvent('before-open')"
      @before-closed="dialogEvent('before-close')"
      @opened="dialogEvent('opened')"
      @closed="dialogEvent('closed')"/>
    <div class="modal-content container center-align">
      <h4>Inserir Dados</h4>
      <p>Resumo</p>
      <section class="modal-form row">
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
            <tr>
              <td>1</td>
              <td>
                Casos
              </td>
              <td>
                Sim
              </td>
              <td>
                Inteiro
              </td>
              <td>
                ---
              </td>
              <td>
                650
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                Renda familiar
              </td>
              <td>
                Sim
              </td>
              <td>
                Decimal
              </td>
              <td>
                ---
                <!-- essa coluna faz sentido apenas para o booleano,
                    para mapear qual valor vai ser true e false -->
              </td>
              <td>
                R$ 2000,00
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
    <div class="modal-footer">
      <div class="row center-align">
        <div class="col s12 m4">
          <a href="#!" class="modal-action modal-close waves-effect waves-light grey disabled white-text btn-flat">
            Voltar
          </a>
        </div>
        <div class="col s12 offset-m4 m4">
          <a href="#!" class="modal-action modal-close waves-effect waves-light blue lighten-1 white-text btn-flat">
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

</style>
