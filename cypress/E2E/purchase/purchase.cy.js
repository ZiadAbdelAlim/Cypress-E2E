import { HomePage } from '../../Pages/HomePage'
import { CheckoutPage } from '../../Pages/CheckoutPage'
import { TestData } from '../../helpers/testData'

const home = new HomePage()
const checkout = new CheckoutPage()

describe('Purchase', () => {
  let username

  before(() => {
    username = TestData.randomUsername()
    cy.register(username)
  })

  beforeEach(() => {
    cy.loginAs(username)
  })

  describe('Positive', () => {
    it('completes a full purchase flow and confirms order', () => {
      checkout.goToLaptops()
      checkout.selectProduct('MacBook Pro')
      checkout.addToCart()
      checkout.openCart()
      checkout.placeOrder()
      checkout.totalPrice.should('be.visible')
      checkout.fillCheckout(TestData.checkout)
      checkout.submitPurchase()
      checkout.verifyOrderConfirmed()
    })

    it('cart total is greater than zero after adding a product', () => {
      checkout.goToLaptops()
      checkout.selectProduct('MacBook Pro')
      checkout.addToCart()
      checkout.openCart()
      checkout.placeOrder()
      checkout.totalPrice.should(($label) => {
        expect(parseFloat($label.text().replace(/[^\d.]/g, ''))).to.be.greaterThan(0)
      })
    })

    it('completes purchase with only the required fields (name and card)', () => {
      checkout.goToLaptops()
      checkout.selectProduct('MacBook Pro')
      checkout.addToCart()
      checkout.openCart()
      checkout.placeOrder()
      checkout.fillCheckout({
        name: TestData.checkout.name,
        card: TestData.checkout.card,
        month: TestData.checkout.month,
        year: TestData.checkout.year,
      })
      checkout.submitPurchase()
      checkout.verifyOrderConfirmed()
    })
  })

  describe('Negative', () => {
    beforeEach(() => {
      checkout.goToLaptops()
      checkout.selectProduct('MacBook Pro')
      checkout.addToCart()
      checkout.openCart()
      checkout.placeOrder()
      cy.window().then((win) => cy.stub(win, 'alert').as('alert'))
    })

    it('shows alert when name field is missing', () => {
      checkout.fillCheckout({
        card: TestData.checkout.card,
        month: TestData.checkout.month,
        year: TestData.checkout.year,
      })
      checkout.submitPurchase()
      cy.get('@alert').should('have.been.calledWith', 'Please fill out Name and Creditcard.')
    })

    it('shows alert when credit card field is missing', () => {
      checkout.fillCheckout({
        name: TestData.checkout.name,
        month: TestData.checkout.month,
        year: TestData.checkout.year,
      })
      checkout.submitPurchase()
      cy.get('@alert').should('have.been.calledWith', 'Please fill out Name and Creditcard.')
    })

    it('shows alert when both name and credit card are missing', () => {
      checkout.fillCheckout({
        month: TestData.checkout.month,
        year: TestData.checkout.year,
      })
      checkout.submitPurchase()
      cy.get('@alert').should('have.been.calledWith', 'Please fill out Name and Creditcard.')
    })
  })
})
