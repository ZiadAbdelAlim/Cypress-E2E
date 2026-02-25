import { homePage } from "../../Pages/homePage"
import { purchasePage } from "../../Pages/purchasePage"
import registerData from "../../fixtures/registerData.json"
const loginObj = new homePage()
const purchaseObj = new purchasePage()
describe('Purchase Flow', () => {
	let uniqueUsername

	//added user registration as demo site DB is not stable
	before(() => {

		uniqueUsername = `Z${Date.now().toString().slice(-5)}`

		loginObj.openURL()
		loginObj.clickSignUp()
		loginObj.enterSignUpUsername(uniqueUsername)
		loginObj.enterSignUpPass(registerData.password)
		cy.on('window:alert', (text) => {
			expect(text).to.contains('Sign up successful')
			cy.wait(3000)
		})
		loginObj.confirmSignUp()
    })

	it('should complete full purchase flow', () => {
			loginObj.openURL()
			loginObj.clickSignIn()
			loginObj.enterUsername(uniqueUsername)
			loginObj.enterPassword(registerData.password)
			loginObj.confirmLogin()
			loginObj.verifyUserLoggedIn()
			loginObj.verifyUserLoggedIn()
			cy.wait(1000)
			purchaseObj.clickLaptops()
			purchaseObj.clickMacbookPro()
			purchaseObj.addToCart()
			purchaseObj.clickCart()
			purchaseObj.placeOrder()
			purchaseObj.addName(registerData.name)
			cy.wait(1000)
			purchaseObj.addCountry(registerData.country)
			purchaseObj.addCity(registerData.city)
			purchaseObj.addCreditCard(registerData.creditCard)
			purchaseObj.addMonth(registerData.month)
			purchaseObj.addYear(registerData.year)
			purchaseObj.clickPurchase()
			purchaseObj.verifyPurchaseSuccess()
		})

	})



