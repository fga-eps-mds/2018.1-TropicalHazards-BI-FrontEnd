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
    <!-- <b-card title="Returned values:" v-if="fieldReturn && operatorReturn">
      <p class="card-text" style="max-width:20rem">
        Name: <strong>{{ fieldReturn }}</strong><br>
        Color: <strong>{{ operatorReturn }}</strong>
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
      @show="onShow">
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
          :state="fieldState"
          horizontal
          class="mb-1"
          label="Campo"
          label-for="pop1"
          description=""
          invalid-feedback="Campo obrigatório">
          <b-form-select
            id="pop1"
            :state="fieldState"
            v-model="field"
            :options="fields"
            size="sm"/>
        </b-form-group>
        <b-form-group
          :state="operatorState"
          horizontal
          class="mb-1"
          label="Operador"
          label-for="pop2"
          description="Escolha um operador"
          invalid-feedback="Campo obrigatório">
          <b-form-select
            id="pop2"
            :state="operatorState"
            v-model="operator"
            :options="options"
            size="sm"/>
        </b-form-group>
        <b-form-group
          :state="valueState"
          horizontal
          class="mb-1"
          label="Valor"
          label-for="pop3"
          description="Escolha um valor"
          invalid-feedback="Campo obrigatório">
          <b-form-input
            id="pop3"
            :state="valueState"
            v-model="value"
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
import {mapGetters} from "vuex"

export default {
    data () {
        return {
            field: "",
            fieldState: null,
            operator: "",
            operatorState: null,
            value: "",
            valueState: null,
            options: [
                {text: "Igual", value: "="},
                {text: "Diferente de", value: "!="},
                {text: "Menor que", value: "<"},
                {text: "Diferente de", value: ">"},
                {text: "Menor ou igual que", value: "<="},
                {text: "Maior ou igual que", value: ">="},
                {text: "É nulo", value: "is-null"},
                {text: "Não é nulo", value: "not-null"}],
            // {text: "Entre", value: "between"}]
            popoverShow: false,
            filterClause: []
        }
    },
    computed :{
        ...mapGetters({
            fields: "getCurrentProjectFields"
        })
    },
    watch: {
        field (val) {
            if (val) {
                this.fieldState = true
            }
        },
        operator (val) {
            if (val) {
                this.operatorState = true
            }
        },
        value (val){
            if (val){
                this.valueState = true
            }
        }
    },
    methods: {
        onClose () {
            this.popoverShow = false
        },
        onOk () {
            if (!this.field) { this.fieldState = false }
            if (!this.operator) { this.operatorState = false }
            if (!this.value) { this.valueState = false}
            if (this.field && this.operator && this.value) {
                this.onClose()
                this.filterClause.push(this.operator, ["field-id", this.field], this.value)
                console.log(this.filterClause)
            }
        },
        onShow () {
            /* This is called just before the popover is shown */
            /* Reset our popover "form" variables */
            this.field = ""
            this.operator = ""
            this.fieldState = null
            this.operatorState = null
            this.fieldReturn = ""
            this.operatorReturn = ""
            this.$store.dispatch("loadCurrentProjectFields", 4)
        },
        // onShown () {
        //     /* Called just after the popover has been shown */
        //     /* Transfer focus to the first input */
        //     this.focusRef(this.$refs.field)
        // },
        // onHidden () {
        //     /* Called just after the popover has finished hiding */
        //     /* Bring focus back to the button */
        //     this.focusRef(this.$refs.button)
        // },
        // focusRef (ref) {
        //     /* Some references may be a component, functional component, or plain element */
        //     /* This handles that check before focusing, assuming a focus() method exists */
        //     /* We do this in a double nextTick to ensure components have updated & popover positioned first */
        //     this.$nextTick(() => {
        //         this.$nextTick(() => { (ref.$el || ref).focus() })
        //     })
        // }
    }
}
</script>

<!-- popover-advanced-1.vue -->
