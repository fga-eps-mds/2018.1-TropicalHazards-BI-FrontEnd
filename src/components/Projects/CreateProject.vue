<template>
  <div class="container-fluid">
    <header>
      <h2>
        Novo projeto
      </h2>
    </header>
    <div class="row">
      <div class="col col-md-6 offset-md-3">
        <b-alert
          :variant="alert.status"
          :show="alert.show"
          dismissible
          @dismissed="alert.show=false">
          {{ alert.text }}
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
              @click="postProject()">
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
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { required, minLength, maxLength } from "vuelidate/lib/validators"

export default {

    components: {
        // Navbar,
        // "sidebar": SideBar,
        // "custom-footer": Footer
    },
    data () {

        return {
            alert: {
                variant: "",
                text: "",
                show: false
            },
            project: {
                user: "",
                name: "",
                description: "",
                tags: []
            },
            selectedTags: [],
            tags: {
                name: "",
                slug: ""
            },
            projects: "",
        }
    },

    validations: {
        project: {
            name: {
                required,
                minLength: minLength(3),
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
        ...mapGetters({ currentUser: "currentUser" })
    },
    created () {
        this.getTags()
    },
    methods: {
        postProject () {
            this.project.tags = this.selectedTags,
            this.project.user = this.currentUser.id
            this.$store.dispatch("createProject", this.project).then(response=>{
                this.alert.variant = "success"
                this.alert.text = "Projeto criado com sucesso"
                this.alert.show = true
            }, err =>{
                this.alert.variant = "warning"
                this.alert.text = err
                this.alert.show = true
            })
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
            window.alert("Projeto criado com Sucesso")
            this.$router.replace("/home")
        },

        createFail () {
            window.confirm("Falha na criação do projeto")
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
