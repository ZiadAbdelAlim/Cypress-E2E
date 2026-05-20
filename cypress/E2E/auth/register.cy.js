import { HomePage } from '../../Pages/HomePage'
import { TestData } from '../../helpers/testData'

const home = new HomePage()

describe('Registration', () => {
  describe('Positive', () => {
    it('registers a new user and confirms success alert', () => {
      const username = TestData.randomUsername()
      home.visit()
      cy.window().then((win) => cy.stub(win, 'alert').as('alert'))
      home.openSignUpModal()
      home.usernameField.type(username)
      home.passwordField.type(TestData.password)
      home.submitSignUp()
      cy.get('@alert').should('have.been.calledWith', 'Sign up successful.')
    })
  })

  describe('Negative', () => {
    let existingUsername

    before(() => {
      existingUsername = TestData.randomUsername()
      cy.register(existingUsername)
    })

    beforeEach(() => {
      home.visit()
      cy.window().then((win) => cy.stub(win, 'alert').as('alert'))
      home.openSignUpModal()
      home.usernameField.should('be.visible')
    })

    it('shows "This user already exist." alert for duplicate username', () => {
      home.usernameField.type(existingUsername)
      home.passwordField.type(TestData.password)
      home.submitSignUp()
      cy.get('@alert').should('have.been.calledWith', 'This user already exist.')
    })

    it('shows alert when username is empty', () => {
      home.passwordField.type(TestData.password)
      home.submitSignUp()
      cy.get('@alert').should('have.been.called')
    })

    it('shows alert when password is empty', () => {
      home.usernameField.type(TestData.randomUsername())
      home.submitSignUp()
      cy.get('@alert').should('have.been.called')
    })
  })
})
