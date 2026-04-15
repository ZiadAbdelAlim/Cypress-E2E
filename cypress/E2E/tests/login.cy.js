import { homePage } from "../../Pages/homePage"
const loginObj = new homePage()
import registerData from "../../fixtures/registerData.json"
describe('login Flow', () => {


    let uniqueUsername

    before(() => {

        uniqueUsername = `Z${Date.now().toString().slice(-5)}`

        loginObj.openURL()

        loginObj.clickSignUp()
        loginObj.enterSignUpUsername(uniqueUsername)
        loginObj.enterSignUpPass(registerData.password)

        cy.on('window:alert', (alertText) => {
            // Accept any alert that contains 'successful' or just return true to dismiss
            return true
        })
        loginObj.confirmSignUp()
        cy.wait(2000)
    })

   
    it('loginflow', () => {

       
		loginObj.openURL()
		loginObj.clickSignIn()
		loginObj.enterUsername(uniqueUsername)
		loginObj.enterPassword(registerData.password)
        loginObj.confirmLogin()

        loginObj.verifyUserLoggedIn()
	})

})