<template>
  <form
    class="col-12 offset-md-3 col-md-6">
    <h1 class="text-center">
      Login
    </h1>
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
      class="btn btn-block btn-lg"
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
export default {
    data(){
        return{
            user: {
                username: "",
                password: ""
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

</style>
