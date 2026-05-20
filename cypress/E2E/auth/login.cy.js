import { HomePage } from '../../Pages/HomePage'
import { TestData } from '../../helpers/testData'

const home = new HomePage()

describe('Login', () => {
  describe('Positive', () => {
    let username

    before(() => {
      username = TestData.randomUsername()
      cy.register(username)
    })

    it('logs in with valid credentials and shows username in navbar', () => {
      cy.loginAs(username)
      home.verifyLoggedIn(username)
    })

    it('allows logout then re-login', () => {
      cy.loginAs(username)
      home.verifyLoggedIn(username)
      home.logout()
      home.signInBtn.should('be.visible')
      cy.loginAs(username)
      home.verifyLoggedIn(username)
    })
  })

  describe('Negative', () => {
    let existingUser

    before(() => {
      existingUser = TestData.randomUsername()
      cy.register(existingUser)
    })

    beforeEach(() => {
      home.visit()
      cy.window().then((win) => cy.stub(win, 'alert').as('alert'))
      home.openSignInModal()
      home.loginUsername.should('be.visible')
    })

    it('shows "Wrong password." alert for invalid password', () => {
      home.loginUsername.type(existingUser)
      home.loginPassword.type(TestData.invalidPassword)
      home.submitSignIn()
      cy.get('@alert').should('have.been.calledWith', 'Wrong password.')
    })

    it('shows "User does not exist." alert for unknown username', () => {
      home.loginUsername.type('ghost_user_xyz_00')
      home.loginPassword.type(TestData.password)
      home.submitSignIn()
      cy.get('@alert').should('have.been.calledWith', 'User does not exist.')
    })

    it('shows alert when both fields are empty', () => {
      home.submitSignIn()
      cy.get('@alert').should('have.been.called')
    })
  })
})
