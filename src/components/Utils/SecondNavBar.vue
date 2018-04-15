<template>
<nav>
    <div class="nav-wrapper grey ">
      <a href="#/" class="brand-logo">
      <span class="fa fa-eye"></span> OBSERV
      </a>

      <ul v-if="currentUser" id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="#/">Inicio</a></li>
        <li><a href="#/home">Dashboard</a></li>
        <li ><a href="#/logout">Logout</a></li>
      </ul>

      <ul v-if="!currentUser" id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="#/home">Inicio</a></li>
        <li><a href="#/home">Dashboard</a></li>
        <li><a href="#/login">Login</a></li>
      </ul>
    </div>
  </nav>

</template>


<script>

import {mapGetters} from 'vuex'

export default {

   computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  }
}
</script>

<style>

</style>
