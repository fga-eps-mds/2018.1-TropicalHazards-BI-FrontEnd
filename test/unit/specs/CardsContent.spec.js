import { shallow } from "@vue/test-utils"
import CardsContent from "@/components/Utils/CardsContent"

describe("CardsContent.vue", () => {
    it("should render correct contents", () => {
        const wrapper = shallow(CardsContent)

        expect(wrapper.find("#stats")).toBeTruthy()
    })
})
