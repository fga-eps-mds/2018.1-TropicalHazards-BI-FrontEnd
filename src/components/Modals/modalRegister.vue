
<template>
  <transition name="modal-fade">
    <div
      v-show="show"
      class="modal-mask"
      @click="closed">
      <div
        class="modal-container"
        @click.stop>
        <div class="row">
          <button
            type="button"
            class="btn-close"
            aria-label="Close modal"
            style="float: right"
            @click="closed">
            x
          </button>
          <h4 style="color:black">
            <span
              style="color:black"
              class="fa fa-eye">
              OBSERV
            </span>
          </h4>
          <h4 style="text-align:center; color:black;">Registrar</h4>

          <p style="color:black; text-align:center; line-height:20px;">
            Como visitante você tem acesso a funcionalidade de pesquisa de observatórios
            e pode navegar entre estes observatórios.</p>
          <section class="modal-form">
            <form>
              <div class="input-field col s12">
                <input
                  v-required
                  v-model="user.username"
                  type="text"
                  placeholder="Username">
              </div>
              <div class="input-field col s12">
                <input
                  v-model="user.email"
                  type="email"
                  placeholder="Email" >
              </div>
              <div class="input-field col s12">
                <input
                  v-model="user.password"
                  type="password"
                  placeholder="Password">
              </div>
              <button
                id="entrar"
                v-on:
                click="registerUser()"
                type="submit"
                class="col s12 btn-large blue lighten-1 waves-effect waves-green">
                <span
                  class="fa fa-sign-in">
                  Registrar
                </span>
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

import {mapGetters} from "vuex"
import JwtDecode from "jwt-decode"

export default {


    data () {
        return {
            user: {
                username: "",
                email: "",
                password: ""
            },
            token: "",
            name: "",
            error: false,
            isModalVisibleRegister: false,
        }
    },
    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },
    created () {
        this.CheckLogin()
    },
    update () {
        this.CheckLogin()
    },

    methods: {
    // redireciona o user caso esteja logado
        CheckLogin () {

            if (this.currentUser) {
                this.$router.replace("/")
            }
        },
        Login () {
            this.$http.post("rest-auth/login/", this.user, { headers: { "content-type": "application/json" } }).then(result => {
                this.token = JwtDecode(result.data.token)
                this.name = this.token.isStaff
                this.LoginSucess(result)
            },
            error => {
                this.LoginFail()
                error.log()
            })
        },
        LoginSucess (response) {
            if (!response.data.token) {
                this.loginFail()
                return
            }
            this.error = false
            localStorage.token = response.data.token
            this.$store.dispatch("login") // trigger da ação de login implementado em store/auth.js
            this.$router.replace("/")
        },
        LoginFail () {
            this.error = "Falha no Login!"
            this.$store.dispatch("logout") // trigger da ação de logout
            delete localStorage.token
        },
        closed () {
            this.$emit("closed")
        },

        registerUser(){
            this.$http.post("users/", this.user, { headers: { "content-type": "application/json" } }).then(result => {
                this.name = result.data
                window.alert("Usuario registrado com sucesso!")
            },
            error => {
                error.log()
                window.alert("Erro")
            })
        },
    }
}
</script>
<style>
* {
    box-sizing: border-box;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
}

.modal-container {
    width: 50%;
    margin: 40px auto 0;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;

  }
#registrar{
  margin-top: 10px;
  border-radius: 10px;
}
#entrar{
  margin-bottom: 10px;
  border-radius: 10px;
}

.modal-form{
  padding: 0;
}
.brand-logo{
  color:black;
}

::placeholder { /* Most modern browsers support this now. */
   color:    #132a71;
}
@media (min-width: 993px) {

}
</style>
