<template>
  <div class="container-fluid">
    <header>
      <h2>
        Editar projeto
      </h2>
    </header>
    <div v-if="showError">
      <b-jumbotron
        bg-variant="muted"
        class="text-muted">
        <template
          slot="header">
          Oooops
        </template>
        <template
          slot="lead">
          O projeto não existe ou você não possui permissão para modificar esse projeto...
        </template>
        <p>
          Não se preocupe, você ainda pode criar um projeto e começar sua
          jornada conosco!
        </p>
        <router-link
          :to="{ name: 'CreateProject' }"
          class="btn btn-blue ml-auto">
          <span class="fa fa-plus"/> Novo projeto
        </router-link>
      </b-jumbotron>
    </div>
    <section v-if="!showError">
      <div class="row">
        <div class="col col-md-6 offset-md-3">
          <b-alert
            :variant="alert.status"
            :show="alert.show || ($v.$invalid && $v.$dirty)"
            dismissible
            @dismissed="alert.show=false">
            <p>{{ alert.text }}</p>
            <p v-show="$v.project.name.$dirty">{{ nameErrorMessage }}</p>
            <p v-show="$v.project.description.$dirty">{{ descriptionErrorMessage }}</p>
          </b-alert>
          <form>
            <div class="form-group">
              <label for="p-name">
                Nome do projeto:
              </label>
              <input
                id="p-name"
                v-model.trim="project.name"
                type="text"
                class="form-control"
                placeholder="Ex.: Dengue no DF">
            </div>
            <div class="form-group">
              <label for="p-description">
                Descrição:
              </label>
              <textarea
                id="p-description"
                v-model.trim="project.description"
                class="form-control"
                rows="6"
                placeholder="Descrição que aparecerá no seu projeto"/>
            </div>
            <div class="form-group">
              <p>
                Tags do projeto
              </p>
              <div
                v-for="(tag, index) in tags"
                :tag="tag"
                :index="index"
                :key="tag + index"
                class="form-check form-check-inline">
                <input
                  :id="'inlineCheckbox' + index"
                  :value="tag.slug"
                  class="form-check-input"
                  type="checkbox">
                <label
                  :for="'inlineCheckbox' + index"
                  class="form-check-label">
                  {{ tag.name }}
                </label>
              </div>
            </div>
            <div class="row">
              <button
                class="col btn btn-green btn-block btn-lg"
                @click="editProject()">
                <span class="fa fa-check"/> Salvar
              </button>
              <router-link
                :to="{ name: 'MyProjects' }"
                class="col btn btn-grey btn-block mt-0 btn-lg">
                <span class="fa fa-undo"/> Voltar
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { required, minLength, maxLength } from "vuelidate/lib/validators"
import bJumbotron from "bootstrap-vue/es/components/jumbotron/jumbotron"

export default {
    components: {
        "b-jumbotron": bJumbotron,
    },
    data () {
        return {
            alert: {
                variant: "",
                text: "",
                show: false
            },
            project: {
                id: null,
                user: null,
                name: "",
                description: "",
            },
            showError: false,
            selectedTags: [],
            tags: {
                name: "",
                slug: ""
            },
            user: {
                username: "",
                email: "",
                password: ""
            },

            projects: "",
        }
    },

    validations: {
        project: {
            name: {
                required,
                minLength: minLength(5),
                maxLength: maxLength(100)
            },
            description: {
                required,
                minLength: minLength(8),
                maxLength: maxLength(500)
            }
        }
    },

    computed: {
        ...mapGetters({currentUser: "currentUser"}),
        nameErrorMessage(){
            if(!this.$v.project.name.required){
                return "Insira o nome do projeto \n"
            }else if(!this.$v.project.name.minLength){
                return "O nome do projeto deve ter no mínimo " + this.$v.project.name.$params.minLength.min + " caracteres \n"
            }else if(!this.$v.project.name.maxLength){
                return "O nome do projeto deve ter no máximo " + this.$v.project.name.$params.maxLength.max + " caracteres \n"
            }
        },
        descriptionErrorMessage(){
            if(!this.$v.project.description.required){
                return "Insira a descrição do projeto \n"
            }else if(!this.$v.project.description.minLength){
                return "A descrição do projeto deve ter no mínimo " + this.$v.project.description.$params.minLength.min + " caracteres \n"
            }else if(!this.$v.project.description.maxLength){
                return "A descrição do projeto deve ter no máximo " + this.$v.project.description.$params.maxLength.max + " caracteres \n"
            }
        },
    },
    beforeMount(){
        this.$store.dispatch("loadProjects")
        this.project = this.$store.getters.getProjectById(parseInt(this.$route.params.id))
        if(this.project === undefined){
            this.showError = true
        }else{
            if(this.project.user != this.currentUser.id){
                this.showError = true
            }
        }
    },
    created () {
        this.getTags()
    },

    methods: {
        editProject () {
            delete this.project["tags"]
            this.$v.$touch()
            if(!this.$v.$invalid){
                this.$store.dispatch("editProject", this.project).then(response=>{
                    this.alert.variant = "success"
                    this.alert.text = response
                    this.alert.show = true
                }),err =>{
                    this.alert.variant = "warning"
                    this.alert.text = err
                    this.alert.show = true
                }
            }else{
                this.alert.variant = "warning"
            }
        },
        getTags () {
            this.$http.get("tags/", {
                headers: {
                    "content-type": "application/json"
                }
            }).then(result => {
                this.tags = result.data
            },
            error => {
                error.log(error)
            })
        },

        postSuccess () {
            window.alert("Projeto editado com Sucesso")
            this.$router.replace("/projects/detail/" + this.project.id)
        },

        createFail () {
            window.confirm("Falha na edição do projeto")
        },
    },
}
</script>

<style lang="scss" scoped>
  @import '../styles/base.scss';

  .row {
    margin-left: 0;
  }

  form {
    background-color: #eee;
    color: $text-color;
    padding: 2em;
    border-radius: 5px;
    margin-top: 2em;
    margin-bottom: 2em;

    .btn {
      $btn-margins: 4px;
      margin-left: $btn-margins;
      margin-right: $btn-margins;
    }
  }

  .content {
    padding-left: 0;
    padding-right: 0;
  }

  .sidebar {
    padding-left: 0;
  }

</style>
