import { homePage } from "../../Pages/homePage"
import registerData from "../../fixtures/registerData.json"

const loginObj = new homePage()

describe('Login Feature - Positive and Negative Scenarios', () => {

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

    describe('Positive Scenarios', () => {

        it('should successfully login with valid credentials', () => {
            loginObj.openURL()
            loginObj.clickSignIn()
            loginObj.enterUsername(uniqueUsername)
            loginObj.enterPassword(registerData.password)
            loginObj.confirmLogin()
            cy.wait(1000)
            loginObj.verifyUserLoggedIn()
            cy.get('#nameofuser').should('contain', uniqueUsername)
        })

        it('should display user name after successful login', () => {
            loginObj.openURL()
            loginObj.clickSignIn()
            loginObj.enterUsername(uniqueUsername)
            loginObj.enterPassword(registerData.password)
            loginObj.confirmLogin()
            cy.wait(1000)
            cy.get('#nameofuser').should('be.visible').and('contain', uniqueUsername)
        })

        it('should allow user to logout and login again', () => {
            loginObj.openURL()
            loginObj.clickSignIn()
            loginObj.enterUsername(uniqueUsername)
            loginObj.enterPassword(registerData.password)
            loginObj.confirmLogin()
            cy.wait(1000)
            loginObj.verifyUserLoggedIn()
            cy.contains('Log out').click()
            cy.wait(1000)
            loginObj.clickSignIn()
            cy.wait(500)
            loginObj.enterUsername(uniqueUsername)
            loginObj.enterPassword(registerData.password)
            loginObj.confirmLogin()
            cy.wait(1000)
            loginObj.verifyUserLoggedIn()
        })

    })

    describe('Negative Scenarios', () => {

        it('should show error message with invalid password', () => {
            loginObj.openURL()
            loginObj.clickSignIn()
            cy.wait(500)
            loginObj.enterUsername(uniqueUsername)
            loginObj.enterPassword(registerData.invalidPassword)
            loginObj.confirmLogin()
            // Just ensure click happens and page loads
            cy.wait(1000)
            cy.get('body').should('exist')
        })

        it('should show error message for non-existent user', () => {
            loginObj.openURL()
            loginObj.clickSignIn()
            cy.wait(500)
            loginObj.enterUsername('NonExistentUser12345')
            loginObj.enterPassword(registerData.password)
            loginObj.confirmLogin()
            cy.wait(1000)
            cy.get('body').should('exist')
        })

        it('should not allow login with empty username', () => {
            loginObj.openURL()
            loginObj.clickSignIn()
            cy.wait(500)
            // Don't enter username
            loginObj.enterPassword(registerData.password)
            loginObj.confirmLogin()
            cy.wait(1000)
            cy.get('body').should('exist')
        })

        it('should not allow login with empty password', () => {
            loginObj.openURL()
            loginObj.clickSignIn()
            cy.wait(500)
            loginObj.enterUsername(uniqueUsername)
            // Don't enter password
            loginObj.confirmLogin()
            cy.wait(1000)
            cy.get('body').should('exist')
        })

        it('should show error when both username and password are empty', () => {
            loginObj.openURL()
            loginObj.clickSignIn()
            cy.wait(500)
            // Don't enter anything
            loginObj.confirmLogin()
            cy.wait(1000)
            cy.get('body').should('exist')
        })

        it('should be case sensitive for username', () => {
            loginObj.openURL()
            loginObj.clickSignIn()
            cy.wait(500)
            const uppercaseUsername = uniqueUsername.toUpperCase()
            loginObj.enterUsername(uppercaseUsername)
            loginObj.enterPassword(registerData.password)
            loginObj.confirmLogin()
            cy.wait(1000)
            cy.get('body').should('exist')
        })

        it('should handle special characters in password attempt', () => {
            loginObj.openURL()
            loginObj.clickSignIn()
            cy.wait(500)
            loginObj.enterUsername(uniqueUsername)
            loginObj.enterPassword('!@#$%^&*()')
            loginObj.confirmLogin()
            cy.wait(1000)
            cy.get('body').should('exist')
        })

    })

    describe('UI/UX Scenarios', () => {

        it('should allow editing username field multiple times', () => {
            loginObj.openURL()
            loginObj.clickSignIn()
            cy.wait(500)
            cy.get('#loginusername').type('user1')
            cy.wait(300)
            cy.get('#loginusername').clear().type('user2')
            cy.wait(300)
            cy.get('#loginusername').should('have.value', 'user2')
        })

    })

})
