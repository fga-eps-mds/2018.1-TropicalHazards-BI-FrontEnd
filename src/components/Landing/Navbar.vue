<template>
  <nav id="navbar">
    <div class="navbar navbar-expand-md navbar-dark dark-bg">
      <router-link
        :to="{name: 'LandingPage'}"
        class="navbar-brand mr-auto">
        Observ
      </router-link>
      <button
        type="button"
        name="toggler"
        class="navbar-toggler"
        data-toggle="collapse"
        data-target="#collapseable">
        <span class="fa fa-bars"/>
      </button>
      <div
        id="collapseable"
        class="collapse navbar-collapse dark-bg">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link
              :to="{name: 'auth'}"
              class="nav-link">
              Dashboards
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{name: 'auth'}"
              class="nav-link">
              Entrar
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex"

export default {
    data () {
        return {
            user: {
                username: "",
                email: "",
                id: ""
            },
        }
    },

    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },

    methods: {
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
  .navbar {
    height: 8vh;
  .navbar-brand {
      height: 100%;
    }
    #collapseable .collapse a {
      @media (min-width: 764px) {
        width: 100vw;
      }
    }
  }
  a {
    padding: 1em .3em;
    margin-left: .1em;
    margin-right: .1em;
    &.nav-link {
      font-size: .8em;
      transition: all .03s linear;
      color: $alt-text-color;
      border-bottom: 1px solid transparent;
      &:hover {
        background-color: #353535;
        border-bottom-color: $alt-text-color;
      }
    }
  }

</style>
