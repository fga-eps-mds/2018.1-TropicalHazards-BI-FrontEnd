<template>
  <div id="app">
    <router-view />
    <Footer></Footer>
  </div>
</div>
</template>

<script>
import Navbar from '@/components/Utils/Navbar'
import Footer from '@/components/Utils/Footer'
import LocationMap from '@/components/Utils/LocationMap'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    LocationMap,
  }
}
</script>

<style>

</style>
