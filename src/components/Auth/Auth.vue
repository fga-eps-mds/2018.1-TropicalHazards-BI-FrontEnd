<template>
  <div class="container container-custom">
    <login-form
      v-if="toggle"
      @toggleForm="toggleForm"/>
    <register-form v-if="!toggle"/>
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
