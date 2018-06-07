<template>
  <div class="container">
    <form
      action=""
      class="col-12 col-md-6 offset-md-3">
      <h1 class="text-center">Cadastre-se</h1>
      <!-- <small v-if="!$v.user.username.required">Campo obrigatório</small> -->
      <small v-if="!$v.user.username.minLength">
        Usuário pequeno demais
      </small>
      <small v-if="!$v.user.username.maxLength">
        Usuário grande demais
      </small>
      <div class="input-group input-group-lg">
        <div class="input-group-prepend">
          <span class="fa fa-user input-group-text" />
        </div>
        <input
          v-model="user.username"
          v-on:input="$v.user.username.$touch"
          v-bind:class="{error: $v.user.username.$error, valid: $v.user.username.$dirty && !$v.user.username.$invalid}"
          type="text"
          class="form-control"
          placeholder="Nome de Usuário">
      </div>
      <small v-if="!$v.user.email.email">
        email inválido
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
          placeholder="Email">
      </div>
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
      <div class="input-group input-group-lg">
        <div class="input-group-prepend">
          <span class="fa fa-lock input-group-text" />
        </div>
        <input
          type="password"
          class="form-control"
          placeholder="Confirme sua senha">
      </div>
      <button
        class="btn btn-block btn-blue btn-lg"
        @click="registerUser()">
        Entrar
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
import { required, minLength, maxLength, email} from "vuelidate/lib/validators"
export default {
    data(){
        return{
            user: {
                username: "",
                email: "",
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
          },
          email: {
            email
          }
        }
    },
    methods: {
        registerUser(){
            this.$store.dispatch("register", this.user)
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
  }

  .input-group,
  .btn {
        margin-top: 1.15em;
        margin-bottom: 1.15em;
      }

  .btn-blue {
      color: $alt-text-color;
    }



</style>
