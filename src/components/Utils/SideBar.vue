<template>
  <div class="wrapper">
    <nav id="sidebar">
      <div class="sidebar-header">
        <span class="fa fa-user"/>
        {{ username }}
        <span class="fa fa-bolt"/>
        <form action="">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Busca">
            <div class="input-group-append">
              <button class="btn">
                <span class="fa fa-search"/>
              </button>
            </div>
          </div>
        </form>
      </div>
      <ul class="list-unstyled sidebar-links list-group text-capitalize">
        <li>
          <router-link
            :to="{ name: '' }"
            class="list-group-item">
            Projetos <span class="fa fa-plus"/>
          </router-link>
          <ul class="list-group">
            <li>
              <router-link
                :to="{ name: '' }"
                class="list-group-item">
                ver projetos
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: '' }"
                class="list-group-item">
                meus projetos
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: '' }"
                class="list-group-item">
                criar projeto
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link
            :to="{ name: '' }"
            class="list-group-item">
            dashboards <span class="fa fa-plus"/>
          </router-link>
          <ul class="list-group">
            <li>
              <router-link
                :to="{ name: '' }"
                class="list-group-item">
                ver dashboards
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: '' }"
                class="list-group-item">
                minhas dashboards
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <a href="http://github.com/fga-gpp-mds/2018.1-TropicalHazards-BI">
            <span class="fa fa-github"/> github
          </a>
        </li>
        <li>
          <a href="http://fga-gpp-mds.github.io/2018.1-TropicalHazards-BI">
            <span class="fa fa-repository"/> docs
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>


<script>
import { mapGetters } from "vuex"

export default {
    components: {

    },
    data() {
        return {}
    },

    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },

    methods: {
        Logout() {
            this.$http.post("rest-auth/logout/", this.user, {
                headers: { "content-type": "application/json" }
            }).then(result => {
                this.LogoutSucess(result)
            },
            error => {
                this.LoginFail()
                error.log("erro")
            }
            )
        },

        LogoutSucess() {
            this.$store.dispatch("logout") //trigger da ação de login implementado em store/auth.js
            delete localStorage.token
            this.$router.replace("/")
        },
        loadUserInfo() {
            this.user.id = this.currentUser.id
            this.user.username = this.currentUser.name
            this.user.email = this.currentUser.email
        }
    }
}
</script>

<style lang="scss" scoped>
  @import '../styles/base.scss';

  .wrapper {
    display: flex;
  }

  #sidebar {
    min-width: 250px;
    max-width: 250px;
    height: 10vw;
    background-color: $alt-background-color;
    color: $alt-text-color;
  }
</style>
