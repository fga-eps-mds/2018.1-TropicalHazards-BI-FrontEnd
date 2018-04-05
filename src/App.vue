<template>
  <div id="app">
      <div id="navbar">
    <navbar></navbar>
      </div>

      <div id="banner">
        <banner></banner>
      </div>

      <div id="cardsContent">
        <CardsContent> </CardsContent>
      </div>

      <div id="LocationMap">
        <LocationMap></LocationMap>
      </div>

      <div id="Footer">
        <Footer></Footer>
      </div>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Utils/Navbar'
import Banner from './components/Utils/Banner'
import CardsContent from './components/Utils/CardsContent'
import LocationMap from './components/Utils/LocationMap'
import Footer from './components/Utils/Footer'
export default {
  name: 'App',
  components: {
    Navbar,
    Banner,
    CardsContent,
    LocationMap,
    Footer
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
