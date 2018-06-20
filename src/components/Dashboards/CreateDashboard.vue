<template>
  <div class="container-fluid">
    <header>
      <h2>
        Novo Dashboard
      </h2>
    </header>
    <div class="row">
      <div class="col col-md-6 offset-md-3">
        <b-alert
          :variant="alert.status"
          :show="alert.show || ($v.$invalid && $v.$dirty)"
          dismissible
          @dismissed="alert.show=false">
          <p>
            {{ alert.text }}
          </p>
          <p v-show="$v.dashboard.name.$dirty">
            {{ nameErrorMessage }}
          </p>
          <p v-show="$v.dashboard.description.$dirty">
            {{ descriptionErrorMessage }}
          </p>
        </b-alert>
        <form>
          <div class="form-group">
            <label for="p-name">
              Nome do dashboard:
            </label>
            <input
              id="p-name"
              v-model.trim="dashboard.name"
              type="text"
              class="form-control"
              placeholder="Observatório de dengue">
          </div>
          <div class="form-group">
            <label for="d-description">
              Descrição:
            </label>
            <textarea
              id="d-description"
              v-model.trim="dashboard.description"
              class="form-control"
              rows="6"
              placeholder="Propósito da dashboard"/>
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

    data () {

        return {
            alert: {
                variant: "",
                text: "",
                show: false
            },
            project: {
                id: "",
                user: "",
                name: "",
                description: ""
            },
            dashboard: {
                project: "",
                name: "",
                user: "",
            },

            user: {
                username: "",
                email: "",
                password: ""
            },

            // projetos: "",
            dashboardList: [],
        }
    },

    validations: {
        dashboard: {
            name: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(100)
            },
            description: {
                maxLength: maxLength(400)
            }
        }
    },

    computed: {
        ...mapGetters({ currentUser: "currentUser" }),

        nameErrorMessage () {
            if(!this.$v.dashboard.name.required) {
                return "Insira o nome do projeto \n"
            }
            else if(!this.$v.dashboard.name.minLength) {
                return "O nome do projeto deve ter no mínimo " + this.$v.dashboard.name.$params.minLength.min + " caracteres \n"
            }
            else if(!this.$v.dashboard.name.maxLength) {
                return "O nome do projeto deve ter no máximo " + this.$v.dashboard.name.$params.maxLength.max + " caracteres \n"
            }
        },

        descriptionErrorMessage () {
            if(!this.$v.dashboard.description.required) {
                return "Insira a descrição do projeto \n"
            }
            else if(!this.$v.dashboard.description.minLength) {
                return "A descrição do projeto deve ter no mínimo " + this.$v.dashboard.description.$params.minLength.min + " caracteres \n"
            }
            else if(!this.$v.dashboard.description.maxLength) {
                return "A descrição do projeto deve ter no máximo " + this.$v.dashboard.description.$params.maxLength.max + " caracteres \n"
            }
        },
    },

    beforeMount() {
        this.loadUserInfo()
        this.getProjectDetail()
    },

    methods: {
        loadUserInfo () {
            this.user.id = this.currentUser.id
            this.user.username = this.currentUser.name
            this.user.email = this.currentUser.email
        },
        getProjectDetail () {
            this.$http.get("projects/" + this.$route.params.id + "/", {
                headers: {
                    "Authorization": "JWT " + localStorage.token
                }
            }).then(result => {
                this.project = result.data
                this.dashboard.project = this.project.id
            },
            error => {
                error.log(error)
            })
        },
        postDashboard () {
            this.dashboard.project = this.project.id
            this.dashboard.user = this.user.id
            this.$http.post("dashboards/", this.dashboard, {
                headers: {
                    "Authorization": "JWT " + localStorage.token,
                    "content-type": "application/json",
                }
            }).then(result => {
                this.dashboardList = result.data
                this.postSucess(result)
            },
            error => {
                error.log(error)
                this.createFail()
            })
        },

        postSucess () {
            window.alert("Observatório criado com Sucesso")
            this.$router.replace("/home")
        },

        createFail () {
            window.confirm("Falha na criação do observatório")
        },
    },
}
</script>

<style lang="scss" scoped>

</style>

