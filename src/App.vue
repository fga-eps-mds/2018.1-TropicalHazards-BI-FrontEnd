<template>
  <div id="app">
    <transition name="router-anim">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Footer from "@/components/Utils/Footer"

export default {
    components: {
        Footer,
    }
}
</script>

<style lang="scss">
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
@import "components/styles/base.scss";

.page {
  position: fixed;
  width: inherit;
}

.router-anim-enter-active {
  animation: coming 0.5s;
  animation-delay: .4s;
  opacity: 0;
}

.roter-anim-leave-active {
  animation: going 0.5s;
  transition: all 0.3s ease-in-out;
}

@keyframes going {
  from{
    transform: translateX(0);
  }
  to {
    transform: translateX(-50px);
    opacity: 0;
  }
}
@keyframes coming {
  from{
    transform: translateX(-50px);
    opacity: 0;

  }
  to {
    transform: translateX(0px);
    opacity: 1;
  }
}


h1,
h2,
h3,
h4,
h5,
h6 {
  padding: .5em;
  margin: 0 !important;
}

.row {
  max-width: 100%;
}

</style>
