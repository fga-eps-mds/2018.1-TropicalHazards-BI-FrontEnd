<template>
<div id="delete-proj" class="modal grey lighten-4">
  <div class="modal-content container center-align">
    <div class="row">
      <h4>
        Deletar {{project.name}} ?
      </h4>
        <div class="col s6">
          <button v-on:click="deleteProject()" type="submit" class="modal-close col s12 btn-large red lighten-1 waves-effect waves-green">
            <span class="fa fa-trash"></span> Sim
          </button>
        </div>
        <div class="col s6">
          <button v-on:click="modalScript()" type="submit" class="modal-close col s12 btn-large blue lighten-1 waves-effect waves-green">
            <span class="fa fa-cancel"></span> Não
          </button>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'modalDeleteProject',

  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  data(){
    return{
      project: ""
    }
  },
    methods: {

    getProjectDetail (){
        this.$http.get('http://localhost:8000/projects/' + this.$route.params.id + '/',  { headers: {"Authorization": "JWT " + localStorage.token } }).then(result => {
        this.project = result.data;
        },
        error => {
            console.error(error);
        });

    },
    deleteProject (){
        this.$http.delete('http://localhost:8000/projects/' + this.$route.params.id + '/',  { headers: {"Authorization": "JWT " + localStorage.token } }).then(result => {
        window.confirm("projeto deletado")
        this.$router.replace('/home')

        },
        error => {
            window.alert("Erro ao deletar o projeto")
            console.error(error);
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
      this.loadUserInfo()
      this.modalScript ()
 }
}
</script>
