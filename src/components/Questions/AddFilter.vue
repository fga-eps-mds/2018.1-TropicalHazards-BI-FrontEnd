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
          v-if="(operator != 'IS-NULL' || operator != 'NOT-NULL')"
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
          @click="addFilter">Ok</b-btn>
      </div>
    </b-popover>
  </div>
</template>

<script>

export default {
    props: {
        fields: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            field: "",
            fieldState: null,
            operator: "",
            operatorState: null,
            value: "",
            valueState: null,
            options: [],
            stringOptions: [
                {text: "É nulo", value: "IS-NULL"},
                {text: "Não é nulo", value: "NOT-NULL"},
                {text: "Começa com", value: "STARTS-WITH"},
                {text: "Contem", value: "CONTAINS"},
                {text: "Não contem", value: "DOES-NOT-CONTAIN"},
                {text: "Termina com", value: "ENDS-WITH"}
            ],
            numOptions: [
                {text: "Igual", value: "="},
                {text: "Diferente de", value: "!="},
                {text: "Menor que", value: "<"},
                {text: "Diferente de", value: ">"},
                {text: "Menor ou igual que", value: "<="},
                {text: "Maior ou igual que", value: ">="},
                {text: "É nulo", value: "is-null"},
                {text: "Não é nulo", value: "not-null"}
            ],
            popoverShow: false,
            filterClause: []
        }
    },
    watch: {
        field (val) {
            if (val) {
                this.fieldState = true
            }
            if(this.field.type === "type/Text"){
                this.options = this.stringOptions
            }else{ // todo: checar fieldType para opções numéricas
                this.options = this.numOptions
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
        addFilter () {
            if (!this.field) { this.fieldState = false }
            if (!this.operator) { this.operatorState = false }
            if (!this.value) { this.valueState = false}
            if (this.field && this.operator && this.value) {
                this.onClose()
                if(this.field.type === "type/Text"){
                    this.filterClause.push(this.operator, ["field-id", this.field.value ], this.value, {"case-sensitive":false})
                }else{
                    this.filterClause.push(this.operator, ["field-id", this.field.value ], Number(this.value))
                }
                this.$emit("createdFilter", this.filterClause)
            }else if(this.operator === "IS-NULL" || this.operator === "NOT-NULL"){
                this.onClose()
                this.filterClause.push(this.operator, ["field-id", this.field.value ])
                this.$emit("createdFilter", this.filterClause)
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
            this.filterClause = []
        }
    }
}
</script>

<!-- popover-advanced-1.vue -->
