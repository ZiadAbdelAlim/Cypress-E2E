import { BasePage } from './BasePage'

export class HomePage extends BasePage {
  get signUpBtn()      { return cy.get('#signin2') }
  get signInBtn()      { return cy.get('#login2') }
  get usernameField()  { return cy.get('#sign-username') }
  get passwordField()  { return cy.get('#sign-password') }
  get loginUsername()  { return cy.get('#loginusername') }
  get loginPassword()  { return cy.get('#loginpassword') }
  get loggedInUser()   { return cy.get('#nameofuser') }
  get contactEmail()   { return cy.get('#recipient-email') }
  get contactName()    { return cy.get('#recipient-name') }
  get contactMessage() { return cy.get('#message-text') }

  openSignUpModal()  { this.signUpBtn.click() }
  openSignInModal()  { this.signInBtn.click() }
  submitSignUp()     { cy.contains('button', 'Sign up').click() }
  submitSignIn()     { cy.contains('button', 'Log in').click() }
  logout()           { cy.contains('Log out').click() }
  openContactModal() { cy.contains('a', 'Contact').click() }
  submitContact()    { cy.contains('button', 'Send message').click() }

  verifyLoggedIn(username) {
    this.loggedInUser.should('be.visible').and('contain', username)
  }
}
