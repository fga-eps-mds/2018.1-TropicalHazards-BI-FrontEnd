<template>
  <div id="container">
    <div class="my-3">
      <!-- our triggering (target) element -->
      <b-btn
        id="exPopoverReactive1"
        ref="button"
        :disabled="popoverShow"
        variant="primary">
        Adicionar Filtro
      </b-btn>
    </div>

    <!-- output from the popover interaction -->
    <!-- <b-card title="Returned values:" v-if="input1Return && input2Return">
      <p class="card-text" style="max-width:20rem">
        Name: <strong>{{ input1Return }}</strong><br>
        Color: <strong>{{ input2Return }}</strong>
      </p>
    </b-card> -->

    <!-- Our popover title and content render container -->
    <!-- We use placement 'auto' so popover fits in the best spot on viewport -->
    <!-- We specify the same container as the trigger button, so that popover is close to button -->
    <b-popover
      ref="popover"
      :show.sync="popoverShow"
      target="exPopoverReactive1"
      triggers="click"
      placement="auto"
      container="container"
      @show="onShow"
      @shown="onShown"
      @hidden="onHidden">
      <template slot="title">
        <b-btn
          class="close"
          aria-label="Close"
          @click="onClose">
          <span
            class="d-inline-block"
            aria-hidden="true">&times;</span>
        </b-btn>
        Novo Filtro
      </template>
      <div>
        <b-form-group
          :state="input1state"
          horizontal
          class="mb-1"
          label="Campo"
          label-for="pop1"
          description=""
          invalid-feedback="Campo obrigatório">
          <b-form-select
            id="pop1"
            :state="input2state"
            v-model="input2"
            :options="options"
            size="sm"/>
        </b-form-group>
        <b-form-group
          :state="input2state"
          horizontal
          class="mb-1"
          label="Operador"
          label-for="pop2"
          description="Escolha um operador"
          invalid-feedback="Campo obrigatório">
          <b-form-select
            id="pop2"
            :state="input2state"
            v-model="input2"
            :options="options"
            size="sm"/>
        </b-form-group>
        <b-btn
          size="sm"
          variant="danger"
          @click="onClose">Cancel</b-btn>
        <b-btn
          size="sm"
          variant="primary"
          @click="onOk">Ok</b-btn>
      </div>
    </b-popover>
  </div>
</template>

<script>
export default {
    data () {
        return {
            input1: "",
            input1state: null,
            input2: "",
            input2state: null,
            options: [
                {text: "- Choose 1 -", value: ""},
                {text: "Igual", value: "="},
                {text: "Diferente de", value: "!="},
                {text: "Menor que", value: "<"},
                {text: "Diferente de", value: ">"},
                {text: "Menor ou igual que", value: "<="},
                {text: "Maior ou igual que", value: ">="},
                {text: "É nulo", value: "is-null"},
                {text: "Não é nulo", value: "not-null"},
                {text: "Entre", value: "between"}],
            popoverShow: false
        }
    },
    watch: {
        input1 (val) {
            if (val) {
                this.input1state = true
            }
        },
        input2 (val) {
            if (val) {
                this.input2state = true
            }
        }
    },
    methods: {
        onClose () {
            this.popoverShow = false
        },
        onOk () {
            if (!this.input1) { this.input1state = false }
            if (!this.input2) { this.input2state = false }
            if (this.input1 && this.input2) {
                this.onClose()
                /* "Return" our popover "form" results */
            }
        },
        onShow () {
            /* This is called just before the popover is shown */
            /* Reset our popover "form" variables */
            this.input1 = ""
            this.input2 = ""
            this.input1state = null
            this.input2state = null
            this.input1Return = ""
            this.input2Return = ""
            this.$store.dispatch("loadCurrentProjectFields", 4)
        },
        onShown () {
            /* Called just after the popover has been shown */
            /* Transfer focus to the first input */
            this.focusRef(this.$refs.input1)
        },
        onHidden () {
            /* Called just after the popover has finished hiding */
            /* Bring focus back to the button */
            this.focusRef(this.$refs.button)
        },
        focusRef (ref) {
            /* Some references may be a component, functional component, or plain element */
            /* This handles that check before focusing, assuming a focus() method exists */
            /* We do this in a double nextTick to ensure components have updated & popover positioned first */
            this.$nextTick(() => {
                this.$nextTick(() => { (ref.$el || ref).focus() })
            })
        }
    }
}
</script>

<!-- popover-advanced-1.vue -->
