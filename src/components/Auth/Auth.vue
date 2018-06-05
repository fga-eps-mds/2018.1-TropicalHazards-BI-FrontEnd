<template>
  <div class="container container-custom">
    <transition name="router-anim">
      <login-form
        v-if="toggle"
        @toggleForm="toggleForm"/>
      <register-form
        v-if="!toggle"
        @toggleForm="toggleForm"/>
    </transition>
  </div>
</template>

<script>
import LoginForm from "@/components/Auth/LoginForm"
import RegisterForm from "@/components/Auth/RegisterForm"

export default {
    components: {
        "login-form": LoginForm,
        "register-form": RegisterForm
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

<style>

</style>
