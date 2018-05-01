import Vue from "vue"
import Vuelidate from "vuelidate"
import { shallow } from "@vue/test-utils"
import Register from "@/components/Authentication/Register.vue"

Vue.use(Vuelidate)

describe("tests of Register.vue", () => {
    let wrapper

    const setData = wrapper => wrapper.setData({
        user: {
            username: "rick-martin",
            email: "rick&martin@example.com",
            password: "supersecret"
        }
    })

    beforeEach(() => {
        wrapper = shallow(Register)
    })

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
        expect(wrapper.vm.user.username).toEqual("")
        expect(wrapper.vm.user.email).toEqual("")
        expect(wrapper.vm.user.password).toEqual("")
    })

    it("should have initial validation as invalid", () => {
        expect(wrapper.vm.$v.$invalid).toBeTruthy()
    })

    it("should be valid if all fields are correctly filled", () => {
        setData(wrapper)
        expect(wrapper.vm.$v.$invalid).toBeFalsy()
    })
})
