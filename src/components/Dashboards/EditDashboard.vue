<template>
  <div class="container-fluid">
    <header>
      <h2>
        Editar Dashboard
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
              @click="editDashboard()">
              <span class="fa fa-check"/> Salvar
            </button>
            <router-link
              :to="{ name: 'MyDashboards' }"
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
import {mapGetters} from "vuex"
import { required, minLength, maxLength } from "vuelidate/lib/validators"

export default {
    props: {
        dashboard: {
            type: Object,
            required: true
        },
    },
    data () {

        return {
            alert: {
                variant: "",
                text: "",
                show: false
            },
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
            if(!this.$v.dashboard.description.maxLength) {
                return "A descrição do projeto deve ter no máximo " + this.$v.dashboard.description.$params.maxLength.max + " caracteres \n"
            }
        },
    },
    methods: {
        editDashboard () {
            this.$v.$touch()
            if(!this.$v.$invalid){
                this.$store.dispatch("editDashboard", this.dashboard).then(response=>{
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
    }
}
</script>

<style lang="scss" scoped>
  @import '../styles/base.scss';

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
</style>

