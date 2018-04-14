<template>
 <div id="app">
      <div id="navbar">
        <navbar></navbar>
      </div>

      <div id="about">
        <About></About>
      </div>
       <router-view />

      <div id="cardsContent">
        <CardsContent> </CardsContent>
      </div>

      <div id="LocationMap">
        <LocationMap></LocationMap>
      </div>
  </div>
</template>

<script>
import Navbar from '@/components/Utils/Navbar'
import About from '@/components/Utils/About'
import CardsContent from '@/components/Utils/CardsContent'
export default {
  name: 'LandingPage',
  components: {
    Navbar,
    About,
    CardsContent
  }
}
</script>

<style>

</style>
