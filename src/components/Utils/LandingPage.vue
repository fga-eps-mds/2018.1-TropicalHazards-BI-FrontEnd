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
    <LandingFooter/>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

import Navbar from "@/components/Utils/Navbar"
import About from "@/components/Utils/About"
import CardsContent from "@/components/Utils/CardsContent"
import Footer from "@/components/Utils/Footer"

export default {
    name: "LandingPage",
    components: {
        Navbar,
        About,
        CardsContent,
        "LandingFooter": Footer
    },

    computed: {
        ...mapGetters({
            currentUser: "currentUser"
        })
    }
}
</script>

<style>

</style>
