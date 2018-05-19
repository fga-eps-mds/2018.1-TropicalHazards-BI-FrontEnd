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
      <section class="modal-form row">
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
            <tr>
              <td>1</td>
              <td>
                Casos
              </td>
              <td>
                <div class="input-field">
                  <select>
                    <option value="" disabled selected>Selecione o tipo</option>
                    <option value="1">Booleano</option>
                    <option value="2">Inteiro</option>
                    <option value="3">Decimal</option>
                  </select>
                </div>
              </td>
              <td>
                ---
              </td>
              <td>
                650
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <div class="progress">
        <div
          class="determinate"
          style="width: 75%" />
      </div>
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
            class="modal-action modal-close waves-effect waves-light blue lighten-1 white-text btn-flat">
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
            importData: {},
            headers: [],
            file: null
        }
    },
}
</script>
