<template>
  <div>
    <Navbar/>
    <h1>the peacock lost it's pea...</h1>
    <p>working on it</p>
    <Footer/>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

import Navbar from "@/components/Landing/Navbar"
import Footer from "@/components/Utils/Footer"

export default {
    name: "LandingPage",
    components: {
        Navbar,
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
