import { shallow } from "@vue/test-utils"
import Footer from "@/components/Utils/Footer"

describe("Footer.vue", () => {
    it("should be a vue instance", () => {
        const wrapper = shallow(Footer)

        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    // TODO: test all links after refactoration
})
