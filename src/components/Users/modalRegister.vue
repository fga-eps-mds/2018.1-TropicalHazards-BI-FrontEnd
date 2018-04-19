
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog">
        <div class="row">
                <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close modal"
              style="float: right">
             x
            </button>
            <h4 style="color:black">
            <span style="color:black" class="fa fa-eye"></span> OBSERV</h4>
            <h4 style="text-align:center">Fazer login</h4>

         <p style="color:black; text-align:center; line-height:20px;">
          Como visitante você tem acesso a funcionalidade de pesquisa de observatórios
          e pode navegar entre estes observatórios.
        </p>
              <section class="modal-form">

              <form>
            <div class="input-field col s12">
            <input type="text" v-model="user.username" placeholder="Username" />
            </div>
            <div class="input-field col s12">
            <input type="password" v-model="user.password" placeholder="Password" />
            </div>
            <button v-on:click="Login()" type="submit" class="btn-large blue lighten-1">
              <span class="fa fa-sign-in"></span> Entrar
            </button>
          </form>
        </section>
        <button v-on:click="Login()" type="submit" class=" btn-large green lighten-1">
              <span class="fa fa-sign-in"></span> Registrar
            </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
/* eslint-disable */
  data(){
    name: 'Register'
    return {
      user: {
        username: "",
        email: "",
        password: ""
      },
      response: "",
    }
  },
  methods: {
    // metodo pra registrar usuário
    Register(){
      this.$http.post("http://localhost:8000/users/", this.user, { headers: { "content-type": "application/json" } }).then(result => {
      this.user = result.data;
      this.response = response.data;
      },
      error => {
          console.error(error);
      });

    }
  }
}
</script>
<style>
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

  .modal {
    background: #FFFFFF;
    /* box-shadow: 2px 2px 20px 1px; */
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    position: fixed;
  }

  .modal-header,
  .modal-footer {
    padding-top: 15px;
    display: flex;
  }

.modal-form{
  padding: 0;
}
.brand-logo{
  color:black;
}
body {
  font-family: 'Oxygen', Arial, Helvetica, sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  letter-spacing: .101em;
  font-family: 'Titillium Web', Arial, Helvetica, sans-serif;

}

hr {
  border-style: dashed;
  border-color: #888888;
  margin-bottom: .5em;
}

.modal h4 {
  color: #42a5f5;
}

#login,
#new-proj {
  padding-top: 0 !important;
  max-height: 90% !important;
}
::placeholder { /* Most modern browsers support this now. */
   color:    #132a71;
}

</style>
