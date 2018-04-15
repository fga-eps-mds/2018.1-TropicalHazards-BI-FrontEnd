  <template>
    <!-- Modal Structure -->
  <div id="login" class="modal grey lighten-4">
    <div class="modal-content container center-align">
      <div class="row">
        <img src="https://via.placeholder.com/50x50" class="img-responsive">
        <h4>
          Fazer login
        </h4>
        <p style="color:black">
          Como visitante você tem acesso a funcionalidade de pesquisa de observatórios
          e pode navegar entre estes observatórios.
        </p>
        <section class="modal-form">
          <form>
            <div class="input-field col s12">
             <input type="text" v-model="user.username" placeholder="Username" />
            <label for="password">Username</label>
            </div>
            <div class="input-field col s12">
            <input type="password" v-model="user.password" placeholder="Password" />
              <label for="password">Senha</label>
            </div>
            <button v-on:click="Login()" type="submit" class="col s12 btn-large blue lighten-1 waves-effect waves-green">
              <span class="fa fa-sign-in"></span> Entrar
            </button>
          </form>
        </section>
        <a href="#">Esqueci minha senha</a>
      </div>
    </div>
</div>

</template>

<script>

import {mapGetters} from 'vuex'
import JwtDecode from 'jwt-decode'

export default {
  data(){
    name: 'Login'
    return {
      user: {
        username: "",
        password: ""
      },
      token: "",
      name: "",
      error: false
    }
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  created () {
    this.CheckLogin()
  },
  update () {
    this.CheckLogin()
  },
  methods: {
    // redireciona o user caso esteja logado
    CheckLogin(){
      console.log(this.currentUser)
      if(this.currentUser) {
        this.$router.replace('/')
      }
    },
    Login(){
      this.$http.post("http://localhost:8000/rest-auth/login/", this.user, { headers: { "content-type": "application/json" } }).then(result => {
      this.token = JwtDecode(result.data.token)
      this.name = this.token.isStaff
      this.LoginSucess(result)
      },
      error => {
          this.LoginFail()
          console.error(error)
      });
    },
    LoginSucess(response){
      if(!response.data.token){
        this.loginFail()
        return
      }
      this.error = false
      localStorage.token = response.data.token
      this.$store.dispatch('login')//trigger da ação de login implementado em store/auth.js
      this.$router.replace('/home')
    },
    LoginFail(){
      this.error = 'Falha no Login!'
      this.$store.dispatch('logout')//trigger da ação de logout
      delete localStorage.token
    }
  }
}

</script>

<style>
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
</style>


