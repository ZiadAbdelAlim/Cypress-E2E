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
		registerObj.confirmSignUp()
		
		cy.on('window:alert', (text) => {expect(text).to.contains('Sign up successful')

		registerObj.openURL()


		})
	})

})