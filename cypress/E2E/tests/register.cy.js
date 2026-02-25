import { homePage } from "../../Pages/homePage"
const registerObj = new homePage()
import registerData from "../../fixtures/registerData.json"
describe('test automation', () => {

	it('registerflow', () => {

		registerObj.openURL()
		registerObj.clickSignUp()
		registerObj.enterSignUpUsername(registerData.username)
		registerObj.enterSignUpPass(registerData.password)
		registerObj.confirmSignUp()

	})

})