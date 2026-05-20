import { HomePage } from '../../Pages/HomePage'

const home = new HomePage()

describe('Contact Form', () => {
  beforeEach(() => {
    home.visit()
    cy.window().then((win) => cy.stub(win, 'alert').as('alert'))
    home.openContactModal()
    home.contactEmail.should('be.visible')
  })

  it('submits contact form and shows success alert', () => {
    home.contactEmail.type('qa@test.com')
    home.contactName.type('QA Tester')
    home.contactMessage.type('Automated test message.')
    home.submitContact()
    cy.get('@alert').should('have.been.calledWith', 'Thanks for the message!!')
  })

  it('can submit contact form without being logged in', () => {
    home.contactEmail.type('guest@test.com')
    home.contactName.type('Guest User')
    home.contactMessage.type('Message from unauthenticated user.')
    home.submitContact()
    cy.get('@alert').should('have.been.called')
  })
})
