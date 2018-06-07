<template>
  <div>
    <Header/>
    <RefBar/>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

import Navbar from "@/components/Landing/Navbar"
import Header from "@/components/Landing/Header"
import RefBar from "@/components/Landing/RefBar"

export default {
    name: "LandingPage",
    components: {
        Navbar,
        Header,
        RefBar
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
