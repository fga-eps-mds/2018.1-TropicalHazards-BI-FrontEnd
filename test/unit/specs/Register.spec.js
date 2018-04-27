import Vue from "vue"
import { shallow } from "@vue/test-utils"
import Register from "@/components/Authentication/Register.vue"

describe("tests of Register.vue", () => {
    const wrapper = shallow(Register)

    it("should be a Vue instance", () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it("verifies the presence of form fields", () => {
        expect(wrapper.contains("input[type='text']")).toBeTruthy()
        expect(wrapper.contains("input[type='password']")).toBeTruthy()
        expect(wrapper.contains("input[type='email']")).toBeTruthy()
        expect(wrapper.contains("a.btn-large")).toBeTruthy()
    })

    it("should have blank properties by default", () => {
        const Constructor = Vue.extend(Register)
        const comp = new Constructor().$mount()

        expect(comp.user.username).toEqual("")
        expect(comp.user.password).toEqual("")
        expect(comp.user.email).toEqual("")
    })

    it("", () => {

    })
})
