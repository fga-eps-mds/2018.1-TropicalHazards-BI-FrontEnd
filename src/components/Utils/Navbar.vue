<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="text-center navbar-brand">
      <router-link
        :to="{ name: 'LandingPage' }">
        Observ
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "../styles/base.scss";

nav {
  padding-top: 0;
  padding-bottom: 0;

  .navbar-brand {
    width: 150px;
    margin-right: auto;
    margin-left: auto;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
}

</style>
