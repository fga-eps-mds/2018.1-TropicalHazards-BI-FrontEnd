<template>
  <div>
    <Header/>
    <Carousel/>
    <RefBar/>
    <About/>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

import Navbar from "@/components/Landing/Navbar"
import Header from "@/components/Landing/Header"
import Carousel from "@/components/Landing/Carousel"
import RefBar from "@/components/Landing/RefBar"
import About from "@/components/Landing/About"

export default {
    name: "LandingPage",
    components: {
        Navbar,
        Header,
        Carousel,
        RefBar,
        About
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
