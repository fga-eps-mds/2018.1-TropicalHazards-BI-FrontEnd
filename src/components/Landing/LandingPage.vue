<template>
  <div class="light-bg">
    <Header/>
    <div class="container text-center">
      <h4>
        O <b>OBSERV</b> é um observatório de dados com interpretação de dados,
        geração de indicadores e gráficos.
        <br>
        <hr>
        <small>
          Nosso propósito é te ajudar na visualização
          dos indicadores e dados da sua pesquisa ou projeto.
        </small>
      </h4>
    </div>
    <!-- add carousel when getter function is complete -->
    <!-- <Carousel/>  -->
    <RefBar/>
    <About/>
    <Footer/>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

// import Navbar from "@/components/Landing/Navbar"
import Header from "@/components/Landing/Header"
// import Carousel from "@/components/Landing/Carousel"
import RefBar from "@/components/Landing/RefBar"
import About from "@/components/Landing/About"
import Footer from "@/components/Utils/Footer"

export default {
    components: {
        // Navbar,
        Header,
        // Carousel,
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

<style lang="scss" scoped>
  @import '../styles/base.scss';

  h4 {
    padding: 4em 2em;

    b {
      color: $highlight-text-color;
      font-weight: bold;
    }
  }
</style>
