<template>
  <div>
    <Navbar/>
    <div class="page-bg">
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
    height: 90vh;
    background-color: magenta;
  }
</style>
