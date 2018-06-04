<template>
  <div>
    <navbar/>
    <h1>the peacock lost it's pea...</h1>
    <p>working on it</p>
    <LandingFooter/>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

import LandingNavbar from "@/components/Landing/Navbar"
import Footer from "@/components/Utils/Footer"

export default {
    name: "LandingPage",
    components: {
        LandingNavbar,
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
