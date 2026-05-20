import { CheckoutPage } from '../../Pages/CheckoutPage'

const checkout = new CheckoutPage()

describe('Product Browsing', () => {
  beforeEach(() => {
    checkout.visit()
  })

  it('displays products in the Phones category', () => {
    checkout.goToPhones()
    cy.get('.card-title').should('have.length.at.least', 1)
  })

  it('displays products in the Laptops category', () => {
    checkout.goToLaptops()
    cy.get('.card-title').should('have.length.at.least', 1)
  })

  it('displays products in the Monitors category', () => {
    checkout.goToMonitors()
    cy.get('.card-title').should('have.length.at.least', 1)
  })

  it('navigates to product detail page and shows Add to cart button', () => {
    checkout.goToLaptops()
    checkout.selectProduct('MacBook Pro')
    cy.contains('MacBook Pro').should('be.visible')
    cy.contains('a', 'Add to cart').should('be.visible')
  })

  it('navigates to a phone product detail page', () => {
    checkout.goToPhones()
    checkout.selectProduct('Samsung galaxy s6')
    cy.contains('Samsung galaxy s6').should('be.visible')
    cy.contains('a', 'Add to cart').should('be.visible')
  })
})
