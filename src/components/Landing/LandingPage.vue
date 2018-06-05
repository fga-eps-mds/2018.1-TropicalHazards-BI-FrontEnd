<template>
  <div>
    <!-- <Navbar/> -->
    <Header/>
    <h1>the peacock lost it's pea...</h1>
    <p>working on it</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

import Navbar from "@/components/Landing/Navbar"
import Header from "@/components/Landing/Header"

export default {
    name: "LandingPage",
    components: {
        Navbar,
        Header
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
