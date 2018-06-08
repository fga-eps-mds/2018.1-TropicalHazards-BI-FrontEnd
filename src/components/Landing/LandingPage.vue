<template>
  <div>
    <!-- <Navbar/> -->
    <Header/>
    <Carousel/>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

import Navbar from "@/components/Landing/Navbar"
import Header from "@/components/Landing/Header"
import Carousel from "@/components/Landing/Carousel"

export default {
    name: "LandingPage",
    components: {
        Navbar,
        Header,
        Carousel
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
