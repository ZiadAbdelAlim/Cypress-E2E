import { BasePage } from './BasePage'

export class CheckoutPage extends BasePage {
  get cartBtn()      { return cy.get('#cartur') }
  get nameField()    { return cy.get('#name') }
  get countryField() { return cy.get('#country') }
  get cityField()    { return cy.get('#city') }
  get cardField()    { return cy.get('#card') }
  get monthField()   { return cy.get('#month') }
  get yearField()    { return cy.get('#year') }
  get totalPrice()   { return cy.get('#totalm') }

  goToPhones()        { cy.contains('a', 'Phones').click() }
  goToLaptops()       { cy.contains('a', 'Laptops').click() }
  goToMonitors()      { cy.contains('a', 'Monitors').click() }
  openCart()          { this.cartBtn.click() }
  selectProduct(name) { cy.contains('a', name).click() }
  addToCart()         { cy.contains('a', 'Add to cart').click() }
  placeOrder()        { cy.contains('button', 'Place Order').click() }
  submitPurchase()    { cy.contains('button', 'Purchase').click() }
  deleteFromCart()    { cy.contains('a', 'Delete').first().click() }

  fillCheckout({ name, country, city, card, month, year } = {}) {
    if (name)    this.nameField.type(name)
    if (country) this.countryField.type(country)
    if (city)    this.cityField.type(city)
    if (card)    this.cardField.type(card)
    if (month)   this.monthField.type(month)
    if (year)    this.yearField.type(year)
  }

  verifyOrderConfirmed() {
    cy.contains('Thank you for your purchase!').should('be.visible')
  }
}
