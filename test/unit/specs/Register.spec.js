import Vue from 'vue'
import { shallow } from "@vue/test-utils"
import Register from '@/components/Authentication/Register.vue'

describe('Register.vue', () => {
  it('verifies the presence of form fields', () => {
    const wrapper = shallow(Register)
    expect(wrapper.contains('input[type="text"]')).to.be.true
    expect(wrapper.contains('input[type="password"]')).to.be.true
    expect(wrapper.contains('input[type="email"]')).to.be.true
    expect(wrapper.contains('a.btn-large')).to.be.true
  })
})
