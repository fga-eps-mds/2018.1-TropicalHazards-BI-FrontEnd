<template>
  <div class="container">
    <div class="row">
      <form
        action=""
        class="col-12 col-md-6 offset-md-3">
        <h1>Cadastre-se</h1>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="fa fa-user input-group-text" />
          </div>
          <input
            v-model="user.username"
            type="text"
            class="form-control"
            placeholder="Nome de Usuário">
        </div>
        <div class="input-group">
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
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="fa fa-lock input-group-text" />
          </div>
          <input
            v-model="user.password"
            type="password"
            class="form-control"
            placeholder="Senha">
        </div>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="fa fa-lock input-group-text" />
          </div>
          <input
            type="password"
            class="form-control"
            placeholder="Confirme sua senha">
        </div>
        <button
          class="btn btn-block btn-blue"
          @click="registerUser()">
          Entrar
        </button>
        <button
          class="btn btn-block btn-default"
          @click="$emit('toggleForm')">
          Já tenho conta
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            user: {
                username: "",
                email: "",
                password: ""
            }
        }
    }

}
</script>

<style lang="scss" scoped>
  @import '../styles/base.scss';
  .btn-blue {
    color: $alt-text-color;
  }
  .input-group {
    span {
      text-align: center;
      width: 36px;
    }
  }
</style>
