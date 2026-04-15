// JavaScript source code
export class homePage {

    weblocators = {

        signUpButton: '#signin2',
        signInButton: '#login2',
        cartButton: '#cartur',
        homeButton: '#Home',
        signUpUsername: '#sign-username',
        signUpPass: '#sign-password',
        signInUsername: '#loginusername',
        signInPass: '#loginpassword',
        confirmSignUp: 'button:has-text("Sign up")',
        cancelbutton: `button:has-text("Close")`,
        login: 'button:has-text("Log in")',
        nameOfUser: '#nameofuser',
        phones: 'a:has-text("Phones")',
        laptops: 'a:has-text("Laptops")',
        monitors: 'a:has-text("Monitors")'

    }

    openURL() {
        cy.visit(Cypress.env('URL'))
    }

    enterSignUpUsername(SName) {
        cy.get(this.weblocators.signUpUsername).should('be.visible').type(SName)
    }

    enterSignUpPass(SPass) {
        cy.get(this.weblocators.signUpPass).should('be.visible').type(SPass)
    }

    enterUsername(Name) {
        cy.get(this.weblocators.signInUsername).should('be.visible').type(Name)
    }

    enterPassword(Pass) {
        cy.get(this.weblocators.signInPass).should('be.visible').type(Pass)
    }

    clickSignUp() {
        cy.get(this.weblocators.signUpButton).click()
    }

    clickSignIn() {
        cy.get(this.weblocators.signInButton).click()
    }

    clickCart() {
        cy.get(this.weblocators.cartButton).click()
    }

    clickPhones() {
        cy.contains('a', 'Phones').click()
    }

    clickLaptops() {
        cy.contains('a', 'Laptops').click()
    }

    clickMonitors() {
        cy.contains('a', 'Monitors').click()
    }

    confirmSignUp() {
        cy.contains('button', 'Sign up').click()
    }

    cancelSignUp() {
        cy.contains('button', 'Close').click()
    }

    confirmLogin() {
        cy.contains('button', 'Log in').click()
    }
    verifyUserLoggedIn() {
        cy.get(this.weblocators.nameOfUser).should('be.visible')
    }

    verifyLoginErrorMessage() {
        cy.contains('Wrong password.').should('be.visible')
    }

    verifyUserNotFoundError() {
        cy.contains('User does not exist.').should('be.visible')
    }

    verifySignupErrorMessage() {
        cy.contains('This user already exist.').should('be.visible')
    }

    closeModal() {
        cy.get('.modal-footer button:contains("Close")').click({ force: true })
    }
}