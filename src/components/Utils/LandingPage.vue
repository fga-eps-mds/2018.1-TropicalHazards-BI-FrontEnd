<template>
  <div id="app">
    <div id="navbar">
      <navbar/>
    </div>

    <div id="about">
      <About/>
    </div>

    <div id="cardsContent">
      <CardsContent/>
    </div>
    <landingfooter/>
  </div>
</template>

<script>
import Navbar from "@/components/Utils/Navbar"
import About from "@/components/Utils/About"
import CardsContent from "@/components/Utils/CardsContent"
import Footer from "@/components/Utils/Footer"
import {mapGetters} from "vuex"

export default {
    name: "LandingPage",
    components: {
        Navbar,
        About,
        CardsContent,
        "landingfooter": Footer
    },

    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    }
}
</script>

<style>

</style>
