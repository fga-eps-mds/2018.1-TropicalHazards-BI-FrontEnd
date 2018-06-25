<template> 
  <div class="light-bg">
    <Header/>
    <div class="container text-center">
      <h4>
        O <b>OBSERV</b> é uma plataforma online de observatórios de dados científicos com suporte
        à geração de mapas e gráficos.<br>Tudo de maneira colaborativa.
        
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
    <About/>
    <!--<RefBar/>-->
    <Search/>
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
import Search from "@/components/Landing/Search"

export default {
    components: {
        // Navbar,
        Header,
        // Carousel,
        RefBar,
        About,
        Footer,
        Search
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
