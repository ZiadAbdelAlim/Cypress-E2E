import { TestData } from '../helpers/testData'

// demoblaze persists users asynchronously after returning 200 on /signup —
// poll the login endpoint until the user is actually queryable before returning
Cypress.Commands.add('waitUntilUserPersisted', (username, password, attempts = 20) => {
  cy.request({
    method: 'POST',
    url: 'https://api.demoblaze.com/login',
    // demoblaze login endpoint expects the password base64-encoded (btoa)
    body: JSON.stringify({ username, password: btoa(password) }),
    headers: { 'Content-Type': 'application/json' },
    failOnStatusCode: false,
    log: false,
  }).then((resp) => {
    if (!resp.body.errorMessage) return
    expect(attempts, `User "${username}" not persisted after 10s`).to.be.greaterThan(0)
    cy.wait(500, { log: false })
    cy.waitUntilUserPersisted(username, password, attempts - 1)
  })
})

Cypress.Commands.add('register', (username, password = TestData.password) => {
  cy.visit('/')
  cy.intercept('POST', '**/signup').as('signupReq')
  cy.get('#signin2').click()
  cy.get('#sign-username').should('be.visible').type(username)
  cy.get('#sign-password').should('be.visible').type(password)
  cy.contains('button', 'Sign up').click()
  cy.wait('@signupReq')
  cy.waitUntilUserPersisted(username, password)
})

Cypress.Commands.add('loginAs', (username, password = TestData.password) => {
  cy.visit('/')
  cy.intercept('POST', '**/login').as('loginReq')
  cy.get('#login2').click()
  cy.get('#loginusername').should('be.visible').type(username)
  cy.get('#loginpassword').should('be.visible').type(password)
  cy.contains('button', 'Log in').click()
  cy.wait('@loginReq')
  cy.get('#nameofuser').should('be.visible')
})
