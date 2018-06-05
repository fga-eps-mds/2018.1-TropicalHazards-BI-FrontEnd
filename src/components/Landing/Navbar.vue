<template>
  <nav
    id="navbar"
    class="navbar navbar-expand-md navbar-dark dark-bg">
    <router-link
      :to="{name: 'LandingPage'}"
      class="navbar-brand">
      Observ
    </router-link>
    <button
      type="button"
      name="toggler"
      class="navbar-toggler"
      aria-controls="collapseable"
      aria-expanded="false"
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
            :to="{name: 'Auth'}"
            class="nav-link">
            Dashboards
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="{name: 'Auth'}"
            class="nav-link">
            Entrar
          </router-link>
        </li>
      </ul>
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
    width: 100%;
    .navbar-brand {
        height: 100%;
      }
    #collapseable {
      height: 100%;
      @media (max-width: 764px) {
        width: 100vw;
        font-size: .9em;
        a {
          margin-top: .4em;
          margin-bottom: .4em;
          padding-top: 1.1em;
          padding-bottom: 1.1em;
        }
      }
    }
  }
  a {
    padding: 1em .3em;
    margin-left: .2em;
    margin-right: .2em;
    &.nav-link {
      font-size: .8em;
      transition: all .5s linear;
      color: $alt-text-color;
      border-bottom: 1px solid transparent;
      &:hover {
        background-color: #353535;
        border-bottom-color: $alt-text-color;
      }
    }
  }

</style>
