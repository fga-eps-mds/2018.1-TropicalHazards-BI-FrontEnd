<template>
<div id="delete-proj" class="modal grey lighten-4">
  <div class="modal-content container center-align">
    <div class="row">
      <h4>
        Deletar Projeto ?
      </h4>
        <div class="col s6">
          <button type="submit" class="model-close col s12 btn-large red lighten-1 waves-effect waves-green">
            <span class="fa fa-trash"></span> Sim
          </button>
        </div>
        <div class="col s6">
          <button v-on:click="modalScript()" type="submit" class="model-close col s12 btn-large blue lighten-1 waves-effect waves-green">
            <span class="fa fa-cancel"></span> Não
          </button>
        </div>
    </div>
  </div>
</div>
</template>

<script>
/* eslint-disable */

import {mapGetters} from 'vuex'
export default {
  name: 'modalDeleteProject',

  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
    methods: {

    getProjectDetail (){
        this.$http.get('projects/4/',
                       { headers: { 'Authorization': 'JWT ' + localStorage.token } }).then(result => {
        this.projeto = result.data
        },error => {
        });
    },
    deleteProject (){
        this.$http.delete('project/' + this.currentUser.id + '/',
                       { headers: { 'Authorization': 'JWT ' + localStorage.token } }).then(result => {
                         this.DeleteSucess(result)
        },error => {
          this.updateFail()
        });
    },

    modalScript () {
        $(document).ready(function(){
        $('.modal').modal();
      });


      $(document).ready(function(){
        $('select').formSelect();
      });
    }

  },
      beforeMount(){
      this.getProject()
      this.loadUserInfo()
      this.modalScript ()
 }
}
</script>
