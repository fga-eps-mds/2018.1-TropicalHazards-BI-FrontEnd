<template>
  <div id="app">
    <router-view />
      <div id="Footer">
      <Footer></Footer>
      </div>
</div>
</template>

<script>
import Footer from '@/components/Utils/Footer'

export default {
  name: 'App',
  components: {
    Footer,
  }
}
</script>

<style>

</style>
