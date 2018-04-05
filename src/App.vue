<template>
  <div id="app">

    <div id="navbar">
      <navbar></navbar>
    </div>

    <router-view />
    <div id="Footer">
      <Footer></Footer>
    </div>
</div>
</template>

<script>
import Navbar from '@/components/Utils/Navbar'
import Footer from '@/components/Utils/Footer'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  }
}

</script>

<style>

h1{
  text-align: center;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
}

</style>
