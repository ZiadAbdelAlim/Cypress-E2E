import { homePage } from "../../Pages/homePage"
const registerObj = new homePage()
import registerData from "../../fixtures/registerData.json"
describe('test automation', () => {

	let uniqueUsername
	it('registerflow', () => {

		// Generate unique username for each test run
		uniqueUsername = `Z${Date.now().toString().slice(-5)}`

		registerObj.openURL()

		registerObj.clickSignUp()
		registerObj.enterSignUpUsername(uniqueUsername)
		registerObj.enterSignUpPass(registerData.password)

		cy.on('window:alert', (alertText) => {
			// Accept any signup alert
			return true
		})

		registerObj.confirmSignUp()
	})

})