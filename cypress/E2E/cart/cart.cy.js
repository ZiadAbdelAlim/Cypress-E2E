import { CheckoutPage } from '../../Pages/CheckoutPage'
import { TestData } from '../../helpers/testData'

const checkout = new CheckoutPage()

describe('Cart Management', () => {
  let username

  before(() => {
    username = TestData.randomUsername()
    cy.register(username)
  })

  beforeEach(() => {
    cy.loginAs(username)
  })

  it('removes a product from cart and cart becomes empty', () => {
    checkout.goToLaptops()
    checkout.selectProduct('MacBook Pro')
    checkout.addToCart()
    checkout.openCart()
    checkout.deleteFromCart()
    cy.contains('a', 'Delete').should('not.exist')
  })

  it('adds two products and cart shows multiple items', () => {
    checkout.goToLaptops()
    checkout.selectProduct('MacBook Pro')
    checkout.addToCart()
    checkout.visit()
    checkout.goToPhones()
    checkout.selectProduct('Samsung galaxy s6')
    checkout.addToCart()
    checkout.openCart()
    cy.get('#tbodyid').find('tr').should('have.length.at.least', 2)
  })

  it('cart total is sum of all added products', () => {
    checkout.goToLaptops()
    checkout.selectProduct('MacBook Pro')
    checkout.addToCart()
    checkout.openCart()
    checkout.placeOrder()
    checkout.totalPrice.should(($el) => {
      expect(parseFloat($el.text().replace(/[^\d.]/g, ''))).to.be.greaterThan(0)
    })
  })
})
