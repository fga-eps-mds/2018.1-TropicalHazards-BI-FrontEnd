<template>
  <div>
    <Header/>
    <Carousel/>
    <RefBar/>
    <About/>
    <Footer/>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

import Navbar from "@/components/Landing/Navbar"
import Header from "@/components/Landing/Header"
import Carousel from "@/components/Landing/Carousel"
import RefBar from "@/components/Landing/RefBar"
import About from "@/components/Landing/About"
import Footer from "@/components/Utils/Footer"

export default {
    components: {
        Navbar,
        Header,
        Carousel,
        RefBar,
        About,
        Footer
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
