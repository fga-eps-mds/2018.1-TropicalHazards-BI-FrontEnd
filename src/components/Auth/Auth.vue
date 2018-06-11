<template>
  <div>
    <Navbar/>
    <div class="page-bg">
      <div class="filter">
        <div class="container">
          <transition name="router-anim">
            <login-form
              v-if="toggle"
              @toggleForm="toggleForm"/>
            <register-form
              v-if="!toggle"
              @toggleForm="toggleForm"/>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/Auth/LoginForm"
import RegisterForm from "@/components/Auth/RegisterForm"
import Navbar from "@/components/Utils/Navbar"

export default {
    components: {
        "login-form": LoginForm,
        "register-form": RegisterForm,
        Navbar
    },
    data() {
        return {
            toggle: true
        }
    },
    methods: {
        toggleForm() {
            this.toggle = !this.toggle
        }
    }
}
</script>

<style lang="scss" scoped>
  .page-bg {
    background: url('../../assets/auth-bg2.jpg') repeat center center;
    // background: url('../../assets/auth-bg.png') repeat center center;
    background-size: contain;

    .filter {
      background-color: rgba(255, 255, 255, .7);
      padding-top: 4em;
      padding-bottom: 4em;
      height: 100%;

      @media (min-width: 690px) {
        padding-top: 6em;
        padding-bottom: 6em;
      }
    }
  }
</style>
