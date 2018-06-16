<template>
  <nav
    id="navbar"
    class="navbar navbar-expand-md dark-bg">
    <router-link
      :to="{name: 'LandingPage'}"
      class="navbar-brand dark-bg">
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
      class="collapse navbar-collapse">
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
    data() {
        return {
            user: {
                username: "",
                email: "",
                id: ""
            }
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
  @import "../styles/base.scss";

  .navbar {
    width: 100%;
    padding: 0em 1em;
    background-color: rgba(0, 0, 0, 0.5);
    border-bottom: #444 solid transparent;

    .navbar-brand {
      height: 100%;
      padding: .3em;
      color: rgba(1, 6, 49, 0.808);
      font-weight: bold;
      font-family: $heading-font-family;
    }

    button {
      color: $text-color;
      border: none;
    }

    #collapseable {
      @media (max-width: 764px) {
        width: 100vw;
        font-size: 0.9em;

        a {
          margin-top: 0.4em;
          margin-bottom: 0.4em;
          padding-top: 1.1em;
          padding-bottom: 1.1em;
        }
      }
    }
  }

  a {
    padding: 1.5em 2em;
    margin-left: 0.2em;
    margin-right: 0.2em;

    &.nav-link {
      font-size: 0.8em;
      transition: all 0.025s ease-in-out;
      color: $alt-text-color;
      border-bottom: 2px solid transparent;

      &:hover {
        background-color: rgba(61, 101, 187, 0.5);
        border-bottom-color: $alt-text-color;
        color: #fff !important;
      }
    }
  }
</style>
