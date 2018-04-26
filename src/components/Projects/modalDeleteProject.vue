<template>
  <div
    id="delete-proj"
    class="modal grey lighten-4">
    <div class="modal-content container center-align">
      <div class="row">
        <h4>
          Deletar {{ project.name }} ?
        </h4>
        <div class="col s6">
          <button
            type="submit"
            class="modal-close col s12 btn-large red lighten-1 waves-effect waves-green"
            v-on:
            @click="deleteProject()">
            <span class="fa fa-trash">Sim</span>
          </button>
        </div>
        <div class="col s6">
          <button
            type="submit"
            class="modal-close col s12 btn-large blue lighten-1 waves-effect waves-green"
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
import {mapGetters} from "vuex"

export default {



    data(){
        return{
            project: ""
        }
    },
    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },

    beforeMount(){
        this.loadUserInfo()
        this.modalScript ()
    },
    methods: {

        getProjectDetail (){
            this.$http.get("projects/" + this.$route.params.id + "/",  { headers: {"Authorization": "JWT " + localStorage.token } }).then(result => {
                this.project = result.data
            },
            error => {
                error.log(error)
            })

        },
        deleteProject (){
            if(this.currentUser.id == this.project.user){
                this.$http.delete("projects/" + this.$route.params.id + "/",  { headers: {"Authorization": "JWT " + localStorage.token } })
                window.confirm("projeto deletado")
                this.$router.replace("/home")
            }

            window.alert("Erro ao deletar o projeto")

        },

        modalScript () {
            (document).ready(function(){
                (".modal").modal()
            });
            (document).ready(function(){
                ("select").formSelect()
            })
        }

    },
}
</script>
