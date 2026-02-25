// JavaScript source code
export class homePage {

    weblocators = {

        signUpButton: '#signin2',
        signInButton: '#login2',
        cartButton: '#cartur',
        homeButton: '#Home',
        phones: 'a:has-text("Phones")',
        laptops: 'a:has-text("Laptops")',
        monitors: 'a:has-text("Monitors")',
        signUpUsername: '#sign-username',
        signUpPass: '#sign-password',
        signInUsername: '#loginusername',
        signInPass: '#loginpassword',
        macBookPro: 'a:has-text("MacBook Pro")',
        confirmSignUp:'button:contains("Sign up")',
        cancelbutton: `button:contains("Close")`,
        login: 'button:contains("Log in")'
    

    }

    openURL() {
        cy.visit(Cypress.env('URL'))
    }

    enterSignUpUsername(SName){
        cy.get(this.weblocators.signUpUsername).should('be.visible').type(SName)
    }

    enterSignUpPass(SPass){
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
        cy.get(this.weblocators.phones).click()
    }

    clickLaptops() {
        cy.get(this.weblocators.laptops).click()
    }

    clickMonitors() {
        cy.get(this.weblocators.monitors).click()
    }

    confirmSignUp() {
        cy.get(this.weblocators.confirmSignUp).click()
    }
    CancelSignUp() {
        cy.get(this.weblocators.cancelSignUp).click()
    }

    confirmLogin() {
        cy.get(this.weblocators.login).click()
    }

}