import { homePage } from "../../Pages/homePage"
const loginObj = new homePage()
import registerData from "../../fixtures/registerData.json"
describe('test automation', () => {

	it('loginflow', () => {

		loginObj.openURL()
		loginObj.clickSignIn()
		loginObj.enterUsername(registerData.username)
		loginObj.enterPassword(registerData.password)
		loginObj.confirmLogin()
	})

})