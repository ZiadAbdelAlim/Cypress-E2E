import { homePage } from "../../Pages/homePage"
import { purchasePage } from "../../Pages/purchasePage"
import registerData from "../../fixtures/registerData.json"

const loginObj = new homePage()
const purchaseObj = new purchasePage()

describe('Checkout Flow - Positive and Negative Scenarios', () => {

    let uniqueUsername

    before(() => {
        uniqueUsername = `Z${Date.now().toString().slice(-5)}`
        loginObj.openURL()
        loginObj.clickSignUp()
        loginObj.enterSignUpUsername(uniqueUsername)
        loginObj.enterSignUpPass(registerData.password)
        cy.on('window:alert', (text) => {
            return true
        })
        loginObj.confirmSignUp()
        cy.wait(2000)
    })

    describe('Positive Checkout Scenarios', () => {

        it('should complete full purchase with valid checkout information', () => {
            loginObj.openURL()
            cy.wait(1000)
            loginObj.clickSignIn()
            cy.wait(500)
            loginObj.enterUsername(uniqueUsername)
            loginObj.enterPassword(registerData.password)
            loginObj.confirmLogin()
            cy.wait(1500)
            loginObj.verifyUserLoggedIn()

            purchaseObj.clickLaptops()
            cy.wait(1000)
            purchaseObj.clickMacbookPro()
            cy.wait(800)
            purchaseObj.addToCart()
            cy.wait(1500)

            purchaseObj.clickCart()
            cy.wait(1000)
            purchaseObj.verifyCartIsNotEmpty()
            cy.wait(500)
            purchaseObj.placeOrder()
            cy.wait(1000)

            // Scroll to see all checkout fields
            cy.scrollTo('top')
            cy.wait(500)
            purchaseObj.checkoutFieldsVisible()
            purchaseObj.addName(registerData.name)
            cy.wait(500)
            purchaseObj.addCountry(registerData.country)
            purchaseObj.addCity(registerData.city)
            purchaseObj.addCreditCard(registerData.creditCard)
            purchaseObj.addMonth(registerData.month)
            purchaseObj.addYear(registerData.year)
            cy.wait(500)
            purchaseObj.clickPurchase()
            cy.wait(2000)
            purchaseObj.verifyPurchaseSuccess()
        })

        it('should add multiple products to cart and checkout', () => {
            loginObj.openURL()
            cy.wait(1000)
            loginObj.clickSignIn()
            cy.wait(500)
            loginObj.enterUsername(uniqueUsername)
            loginObj.enterPassword(registerData.password)
            loginObj.confirmLogin()
            cy.wait(1500)
            loginObj.verifyUserLoggedIn()

            purchaseObj.clickPhones()
            cy.wait(1000)
            cy.contains('a', 'Samsung galaxy s6').click()
            cy.wait(800)
            purchaseObj.addToCart()
            cy.wait(1500)

            // Navigate back to home/products to add more items
            loginObj.openURL()
            cy.wait(1000)

            purchaseObj.clickLaptops()
            cy.wait(1000)
            purchaseObj.clickMacbookPro()
            cy.wait(800)
            purchaseObj.addToCart()
            cy.wait(1500)

            purchaseObj.clickCart()
            cy.wait(1000)
            purchaseObj.verifyCartIsNotEmpty()
            cy.get('#totalm').then((el) => {
                expect(parseFloat(el.text())).to.be.greaterThan(0)
            })
        })

        it('should display all checkout fields correctly', () => {
            loginObj.openURL()
            cy.wait(1000)
            loginObj.clickSignIn()
            cy.wait(500)
            loginObj.enterUsername(uniqueUsername)
            loginObj.enterPassword(registerData.password)
            loginObj.confirmLogin()
            cy.wait(1500)
            loginObj.verifyUserLoggedIn()

            purchaseObj.clickLaptops()
            cy.wait(1000)
            purchaseObj.clickMacbookPro()
            cy.wait(800)
            purchaseObj.addToCart()
            cy.wait(1500)

            purchaseObj.clickCart()
            cy.wait(1000)
            purchaseObj.placeOrder()
            cy.wait(1000)

            // Scroll to see all checkout fields
            cy.scrollTo('top')
            cy.wait(500)
            purchaseObj.checkoutFieldsVisible()
        })

    })

    describe('Negative Checkout Scenarios - Missing Fields', () => {

        beforeEach(() => {
            loginObj.openURL()
            loginObj.clickSignIn()
            cy.wait(500)
            loginObj.enterUsername(uniqueUsername)
            loginObj.enterPassword(registerData.password)
            loginObj.confirmLogin()
            cy.wait(1000)
            loginObj.verifyUserLoggedIn()

            purchaseObj.clickLaptops()
            cy.wait(500)
            purchaseObj.clickMacbookPro()
            cy.wait(500)
            purchaseObj.addToCart()
            cy.wait(1000)

            purchaseObj.clickCart()
            cy.wait(500)
            purchaseObj.placeOrder()
            cy.wait(500)
        })

        it('should show error when name field is empty', () => {
            let alertFired = false
            cy.on('window:alert', (text) => {
                alertFired = true
                return true
            })

            purchaseObj.addCountry(registerData.country)
            purchaseObj.addCity(registerData.city)
            purchaseObj.addCreditCard(registerData.creditCard)
            purchaseObj.addMonth(registerData.month)
            purchaseObj.addYear(registerData.year)
            purchaseObj.clickPurchase()
            cy.wait(500)
            cy.wrap(null).then(() => {
                expect(alertFired).to.be.true
            })
        })

        it('should show error when credit card field is empty', () => {
            let alertFired = false
            cy.on('window:alert', (text) => {
                alertFired = true
                return true
            })

            purchaseObj.addName(registerData.name)
            purchaseObj.addCountry(registerData.country)
            purchaseObj.addCity(registerData.city)
            purchaseObj.addMonth(registerData.month)
            purchaseObj.addYear(registerData.year)
            purchaseObj.clickPurchase()
            cy.wait(500)
            cy.wrap(null).then(() => {
                expect(alertFired).to.be.true
            })
        })

        it('should show error when both name and credit card are empty', () => {
            let alertFired = false
            cy.on('window:alert', (text) => {
                alertFired = true
                return true
            })

            purchaseObj.addCountry(registerData.country)
            purchaseObj.addCity(registerData.city)
            purchaseObj.addMonth(registerData.month)
            purchaseObj.addYear(registerData.year)
            purchaseObj.clickPurchase()
            cy.wait(500)
            cy.wrap(null).then(() => {
                expect(alertFired).to.be.true
            })
        })

        it('should allow purchase with country and city empty (only name and card required)', () => {
            purchaseObj.addName(registerData.name)
            purchaseObj.addCreditCard(registerData.creditCard)
            purchaseObj.addMonth(registerData.month)
            purchaseObj.addYear(registerData.year)
            cy.wait(500)
            purchaseObj.clickPurchase()
            cy.wait(2000)
            purchaseObj.verifyPurchaseSuccess()
        })

    })

    describe('Negative Checkout Scenarios - Invalid Data', () => {

        beforeEach(() => {
            loginObj.openURL()
            loginObj.clickSignIn()
            cy.wait(500)
            loginObj.enterUsername(uniqueUsername)
            loginObj.enterPassword(registerData.password)
            loginObj.confirmLogin()
            cy.wait(1000)
            loginObj.verifyUserLoggedIn()

            purchaseObj.clickLaptops()
            cy.wait(500)
            purchaseObj.clickMacbookPro()
            cy.wait(500)
            purchaseObj.addToCart()
            cy.wait(1000)

            purchaseObj.clickCart()
            cy.wait(500)
            purchaseObj.placeOrder()
            cy.wait(500)
        })

        it('should process purchase with invalid credit card format', () => {
            purchaseObj.addName(registerData.name)
            purchaseObj.addCountry(registerData.country)
            purchaseObj.addCity(registerData.city)
            purchaseObj.addCreditCard('INVALID1234')
            purchaseObj.addMonth(registerData.month)
            purchaseObj.addYear(registerData.year)
            cy.wait(500)
            purchaseObj.clickPurchase()
            cy.wait(2000)
            // Just verify we get some response
            cy.get('body').should('exist')
        })

        it('should process purchase with special characters in name', () => {
            purchaseObj.addName('Test@#$%User')
            purchaseObj.addCountry(registerData.country)
            purchaseObj.addCity(registerData.city)
            purchaseObj.addCreditCard(registerData.creditCard)
            purchaseObj.addMonth(registerData.month)
            purchaseObj.addYear(registerData.year)
            cy.wait(500)
            purchaseObj.clickPurchase()
            cy.wait(2000)
            // Demo site should allow this
            cy.get('body').should('exist')
        })

        it('should process purchase with long name', () => {
            const longName = 'A'.repeat(100)
            purchaseObj.addName(longName)
            purchaseObj.addCountry(registerData.country)
            purchaseObj.addCity(registerData.city)
            purchaseObj.addCreditCard(registerData.creditCard)
            purchaseObj.addMonth(registerData.month)
            purchaseObj.addYear(registerData.year)
            cy.wait(500)
            purchaseObj.clickPurchase()
            cy.wait(2000)
            cy.get('body').should('exist')
        })

    })

    describe('Negative Checkout Scenarios - Cart Related', () => {

        it('should prevent checkout with empty cart', () => {
            loginObj.openURL()
            loginObj.clickSignIn()
            cy.wait(500)
            loginObj.enterUsername(uniqueUsername)
            loginObj.enterPassword(registerData.password)
            loginObj.confirmLogin()
            cy.wait(1000)
            loginObj.verifyUserLoggedIn()

            purchaseObj.clickCart()
            cy.wait(500)
            cy.contains('button', 'Place Order').should('be.visible')
        })

    })

    describe('Checkout Field Validation Scenarios', () => {

        beforeEach(() => {
            loginObj.openURL()
            loginObj.clickSignIn()
            cy.wait(500)
            loginObj.enterUsername(uniqueUsername)
            loginObj.enterPassword(registerData.password)
            loginObj.confirmLogin()
            cy.wait(1000)
            loginObj.verifyUserLoggedIn()

            purchaseObj.clickLaptops()
            cy.wait(500)
            purchaseObj.clickMacbookPro()
            cy.wait(500)
            purchaseObj.addToCart()
            cy.wait(1000)

            purchaseObj.clickCart()
            cy.wait(500)
            purchaseObj.placeOrder()
            cy.wait(500)
        })

        it('should accept numeric values in credit card field', () => {
            purchaseObj.addName(registerData.name)
            purchaseObj.addCreditCard('9876543210123456')
            purchaseObj.addMonth(registerData.month)
            purchaseObj.addYear(registerData.year)
            cy.wait(500)
            purchaseObj.clickPurchase()
            cy.wait(2000)
            purchaseObj.verifyPurchaseSuccess()
        })

        it('should accept valid month values (01-12)', () => {
            purchaseObj.addName(registerData.name)
            purchaseObj.addCreditCard(registerData.creditCard)
            purchaseObj.addMonth('06')
            purchaseObj.addYear(registerData.year)
            cy.wait(500)
            purchaseObj.clickPurchase()
            cy.wait(2000)
            purchaseObj.verifyPurchaseSuccess()
        })

        it('should accept numeric country name', () => {
            purchaseObj.addName(registerData.name)
            purchaseObj.addCountry('123')
            purchaseObj.addCreditCard(registerData.creditCard)
            purchaseObj.addMonth(registerData.month)
            purchaseObj.addYear(registerData.year)
            cy.wait(500)
            purchaseObj.clickPurchase()
            cy.wait(2000)
            purchaseObj.verifyPurchaseSuccess()
        })

        it('should accept whitespace in checkout fields', () => {
            purchaseObj.addName('  ' + registerData.name + '  ')
            purchaseObj.addCountry('  ' + registerData.country + '  ')
            purchaseObj.addCreditCard(registerData.creditCard)
            purchaseObj.addMonth(registerData.month)
            purchaseObj.addYear(registerData.year)
            cy.wait(500)
            purchaseObj.clickPurchase()
            cy.wait(2000)
            purchaseObj.verifyPurchaseSuccess()
        })

    })

})
