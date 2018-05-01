import { shallow } from "@vue/test-utils"
import LandingPage from "@/components/Utils/LandingPage"

describe("LandingPage.vue", () => {
    it("should be a vue instance", () => {
        const wrapper = shallow(LandingPage)

        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    // TODO: test all links after refactoration
})
