import Vue from "vue"
import About from "@/components/Utils/About"

describe('About.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(About)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.container h2').textContent)
      .toEqual('Sobre')
  })
})
