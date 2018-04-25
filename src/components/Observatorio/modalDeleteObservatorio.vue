<template>
  <div
    id="delete-proj"
    class="modal grey lighten-4">
    <div class="modal-content container center-align">
      <div class="row">
        <h4>
          Deletar Observatorio ?
        </h4>
        <div class="col s6">
          <button
            type="submit"
            class="model-close col s12 btn-large red lighten-1 waves-effect waves-green">
            <span class="fa fa-trash">Sim</span>
          </button>
        </div>
        <div class="col s6">
          <button
            type="submit"
            class="model-close col s12 btn-large blue lighten-1 waves-effect waves-green"
            v-on:
            @click="modalScript()">
            <span class="fa fa-cancel">Não</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {

    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },
    beforeMount(){
        this.loadUserInfo()
        this.modalScript ()
    },
    methods: {
        modalScript () {
            (document).ready(function(){
                (".modal").modal()
            });
            (document).ready(function(){
                ("select").formSelect()
            })
        }

    }
}
</script>
