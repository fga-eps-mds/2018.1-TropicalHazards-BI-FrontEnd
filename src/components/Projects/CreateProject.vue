<template>
  <div id="background">
    <Navbar class=""/>
    <div class="row">
      <sidebar class="col-md-2 sidebar"/>
      <div class="col-md-10 container-fluid">
        <header>
          <h2>
            Novo projeto
          </h2>
        </header>
        <div class="row">
          <div class="col col-md-6 offset-md-3">
            <form>
              <div class="form-group">
                <label for="p-name">
                  Nome do projeto:
                </label>
                <input
                  id="p-name"
                  v-model.trim="$v.project.name.$model"
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
                  v-model.trim="$v.project.description.$model"
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
                  @click="PostProject()">
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
    <!-- <custom-footer/> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { required, minLength, maxLength } from "vuelidate/lib/validators"

import SideBar from "@/components/Utils/SideBar"
import Footer from "@/components/Utils/Footer"
import Navbar from "@/components/Utils/Navbar"

export default {

    components: {
        Navbar,
        "sidebar": SideBar,
        "custom-footer": Footer
    },
    data () {

        return {
            importData: {},
            headers: [],
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

    beforeMount () {
        this.loadUserInfo()
        this.loadProject()
    },

    created () {
        this.getTags()
    },

    methods: {
        loadUserInfo () {
            this.user.id = this.currentUser.id
            this.user.username = this.currentUser.name
            this.user.email = this.currentUser.email
        },

        loadProject () {
            this.project.user = this.currentUser.id
        },


        PostProject () {
            this.project.tags = this.selectedTags
            this.$http.post("projects/",this.project, {
                headers: {
                    "Authorization": "JWT " + localStorage.token,
                    "content-type": "application/json",
                }
            }
            ).then(result => {
                this.projeto = result.data
                this.postSucess(result)
            },
            error => {
                error.log(error)
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

        postSucess () {
            window.alert("Projeto criado com Sucesso")
            this.$router.replace("/home")
        },

        CreateFail () {
            window.confirm("Falha na criação do projeto")
        },
    },
}
</script>

<style lang="scss" scoped>
  @import '../styles/base.scss';

  .row {
    margin-left: .031em;
  }

  form {
    background-color: $background-color;
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

  .sidebar {
    padding-left: 0;
  }

</style>
