<template>
  <div id="app">

    <transition name="router-anim">

      <router-view />

    </transition>

  </div>
</template>

<script>

export default {

    components: {
    }
}
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

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
.navbar {
  background-color: #2b4a6ef1;
}
.page-footer{
  background-color:#1b1b1b;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  position: absolute;
  width: 100%;


}
.footer-copyright{
  background-color:#242424;
}

a {
  color: inherit !important;
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

.sidebar-icon li {
  font-size: 2em;
  margin-top: .5em;
  margin-bottom: .5em;
}

.card-title {
  font-weight: bold !important;
  color: #5252ff;
}

/* .header {
  border-bottom: 1px solid #999;
} */

.custom-container {
  max-width: 100%;
  padding-right: 5%;
  padding-left: 5%;
}

#content {
  padding: 0;

}

#content .header h3 {
  margin: 0;
  padding: .3em;
  position: static;
}

#sidebar {
  height: 100%;
  padding: .5em;
  position: relative;
  color: #333;
}

#projects {
  font-size:10px;
}

#detail {
  font-size:10px;
}

</style>
