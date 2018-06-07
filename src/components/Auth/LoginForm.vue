<template>
  <form
    class="col-12 offset-md-3 col-md-6">
    <h1 class="text-center">
      Login
    </h1>
    <small
      v-if="$v.user.username.$invalid && $v.$dirty"
      class="error">
      Digite um usuário
    </small>
    <div class="input-group input-group-lg">
      <div class="input-group-prepend">
        <span class="fa fa-user input-group-text" />
      </div>
      <input
        v-model="user.username"
        type="text"
        class="form-control"
        placeholder="Nome de Usuário">
    </div>
    <small v-if="$v.user.password.$invalid && $v.$dirty">
      Digite uma senha
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
    <button
      class="btn btn-block btn-lg btn-blue"
      @click="logUser()">
      Entrar
    </button>
    <button
      class="btn btn-block btn-lg btn-grey"
      @click="$emit('toggleForm')">
      Não tenho conta
    </button>
    <a
      href=""
      class="btn-disabled">
      Esqueci minha senha
    </a>
  </form>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators"

export default {
    data(){
        return{
            user: {
                username: "",
                password: ""
            }
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
                required
            }
        }
    },
    methods: {
        logUser(){
            this.$v.user.username.$touch()
            this.$v.user.password.$touch()
            if(!this.$v.$invalid){
                this.$store.dispatch("login", this.user)
            }
        }
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

    .input-group, .btn {
      margin-top: 1.15em;
      margin-bottom: 1.15em;
    }
  }

  .btn-blue {
    color: $alt-text-color;
  }

  small{
    color: $red;
  }
</style>
