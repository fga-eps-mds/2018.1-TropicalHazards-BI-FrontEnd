<template>
  <div class="container" id="register-form">
    <b-alert
      :variant="alert.variant"
     
      dismissible
      @dismissed="alert.show=false">
      <p class="text-center">{{ alert.text }}</p>
    </b-alert>
    <form
      action=""
      class="col-12 col-md-6 offset-md-3">
      <h1 class="text-center">Cadastre-se</h1>
      <small v-show="$v.user.username.$invalid && $v.user.username.$dirty">
        {{ usernameErrorMessage }}
      </small>
      <div class="input-group input-group-lg">
        <div class="input-group-prepend">
          <span class="fa fa-user input-group-text" />
        </div>
        <input
          v-model="user.username"
          class="form-control"
          type="text"
          placeholder="Nome de Usuário">
      </div>
      <small v-if="$v.user.email.$invalid && $v.user.email.$dirty">
        {{ emailErrorMessage }}
      </small>
      <div class="input-group input-group-lg">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <b>@</b>
          </span>
        </div>
        <input
          v-model="user.email"
          type="text"
          class="form-control"
          placeholder="Email"
          @input="$v.user.email.$reset">
      </div>
      <small v-if="$v.user.password.$invalid && $v.user.password.$dirty">
        {{ passwordErrorMessage }}
      </small>
      <div class="input-group input-group-lg">
        <div class="input-group-prepend">
          <span class="fa fa-lock input-group-text" />
        </div>
        <input
          v-model="user.password"
          type="password"
          class="form-control"
          placeholder="Senha">
      </div>
      <small v-if="$v.user.passwordConfirmation.$invalid && $v.user.passwordConfirmation.$dirty">
        {{ passwordConfirmationErrorMessage }}
      </small>
      <div class="input-group input-group-lg">
        <div class="input-group-prepend">
          <span class="fa fa-lock input-group-text" />
        </div>
        <input
          v-model="user.passwordConfirmation"
          type="password"
          class="form-control"
          placeholder="Confirme sua senha"
          @input="$v.user.passwordConfirmation.$reset">
      </div>
      <button
        :disabled="buttonEnable"
        class="btn btn-block btn-blue btn-lg"
        @click="registerUser()">
        Cadastrar
      </button>
      <button
        class="btn btn-block btn-lg btn-grey"
        @click="$emit('toggleForm')">
        Já tenho conta
      </button>
    </form>
  </div>
</template> 

<script>
import { required, minLength, maxLength, email, sameAs} from "vuelidate/lib/validators"
export default {
    name: "RegisterForm",
    data(){
        return{
            user: {
                username: "",
                email: "",
                password: "",
                passwordConfirmation: ""
            },
            loginuser: {
                username: "",
                password: ""
            },
            buttonEnable: false,
            alert: {
                variant: "",
                text: "",
                show: false
            },
        }

    },
    validations: {
        user: {
            username: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(50)
            },
            password: {
                required,
                minLength: minLength(8)
            },
            passwordConfirmation: {
                required,
                sameAsPassword: sameAs("password")
            },
            email: {
                required,
                email
            }
        }
    },
    computed: {
        isDisabled(){
            for(var field in this.user){
                if(!field.lenght > 0){
                    return true
                }
            }
        },
        usernameErrorMessage(){
            if(!this.$v.user.username.required){
                return "Insira o nome de usuário"
            }else if(!this.$v.user.username.minLength){
                return "O usuário deve ter no mínimo " + this.$v.user.username.$params.minLength.min + " caracteres"
            }else if(!this.$v.user.username.maxLength){
                return "O usuário deve ter no máximo " + this.$v.user.username.$params.maxLength.max + " caracteres"
            }
        },
        emailErrorMessage(){
            if(!this.$v.user.email.required){
                return "Insira um email"
            }else if(!this.$v.user.email.email){
                return "Por favor insira um email válido"
            }
        },
        passwordErrorMessage(){
            if(!this.$v.user.password.required){
                return "Por favor insira a senha"
            }else if(!this.$v.user.password.minLength){
                return "A senha deve possuir no mínimo 8 caracteres"
            }else if(!this.$v.user.passwordConfirmation.sameAsPassword){
                return "As senhas devem coincidir"
            }
        },
        passwordConfirmationErrorMessage(){
            if(!this.$v.user.passwordConfirmation.required){
                return "Por favor confirme a senha"
            }
        }
    },
    methods: {
        registerUser(){
            this.$v.$touch()
            if(!this.$v.$invalid){
                this.$store.dispatch("register", this.user).then(response => {
                    this.logUser(response)
                    // this.$router.replace("/home")
                },
                error => {
                    this.alert.variant = "danger"
                    this.alert.text = error.body.username
                    this.alert.show = true
                })
            }
        },
        logUser(){
            /* eslint-disable */
            this.$v.$touch()
            if(!this.$v.$invalid){
                this.loginuser.username = this.user.username
                this.loginuser.password = this.user.password
                this.$store.dispatch("login", this.loginuser).then(response => {
                    this.$router.replace("/home")
                },
                error =>{
                    console.log(error)

                })
            }
        },
    }
}
</script>

<style lang="scss" scoped>
  @import '../styles/base.scss';

  form {
    padding: 1.5em;
    padding-top: 0;
    border: 3px solid #efefef;
    border-radius: 5px;
    background-color: $background-color;
  }

  .input-group,
  .btn {
        margin-top: 1.15em;
        margin-bottom: 1.15em;
      }

  .btn-blue {
      color: $alt-text-color;
    }
  small{
    color: $red;
  }



</style>
