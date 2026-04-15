export class purchasePage {

    weblocators = {
        cartButton: '#cartur',
        homeButton: '#Home',
        name: '#name',
        country: '#country',
        city: '#city',
        creditCard: '#card',
        month: '#month',
        year: '#year',
        emptyCartMessage: '.success',
        totalPrice: '#totalm'
    }

    openURL() {
        cy.visit(Cypress.env('URL'))
    }

    clickPhones() {
        cy.contains('a', 'Phones').click()
    }

    clickLaptops() {
        cy.contains('a', 'Laptops').click()
    }

    clickMonitors() {
        cy.contains('a', 'Monitors').click()
    }

    clickMacbookPro() {
        cy.contains('a', 'MacBook Pro').click()
    }

    addToCart() {
        cy.on('window:alert', (text) => {
            // Accept any alert when adding to cart
            return true
        })

        cy.contains('a', 'Add to cart').should('be.visible').click()
    }

    clickCart() {
        cy.get(this.weblocators.cartButton).click()
    }

    placeOrder() {
        cy.contains('button', 'Place Order').click()
    }

    addName(name) {
        cy.get(this.weblocators.name).should('be.visible').type(name)
    }

    addCountry(country) {
        cy.get(this.weblocators.country).should('be.visible').type(country)
    }

    addCity(city) {
        cy.get(this.weblocators.city).should('be.visible').type(city)
    }

    addCreditCard(creditCard) {
        cy.get(this.weblocators.creditCard).should('be.visible').type(creditCard)
    }

    addMonth(month) {
        cy.get(this.weblocators.month).should('be.visible').type(month)
    }

    addYear(year) {
        cy.get(this.weblocators.year).should('be.visible').type(year)
    }

    clickPurchase() {
        cy.contains('button', 'Purchase').click()
    }

    verifyPurchaseSuccess() {
        cy.contains('Thank you for your purchase!').should('be.visible')
    }

    verifyCartIsNotEmpty() {
        cy.get(this.weblocators.totalPrice).should('be.visible')
    }

    checkoutFieldsVisible() {
        cy.get(this.weblocators.name).should('be.visible')
        cy.get(this.weblocators.country).should('be.visible')
        cy.get(this.weblocators.city).should('be.visible')
        cy.get(this.weblocators.creditCard).should('be.visible')
        cy.get(this.weblocators.month).should('be.visible')
        cy.get(this.weblocators.year).should('be.visible')
    }

    clearCheckoutFields() {
        cy.get(this.weblocators.name).clear()
        cy.get(this.weblocators.country).clear()
        cy.get(this.weblocators.city).clear()
        cy.get(this.weblocators.creditCard).clear()
        cy.get(this.weblocators.month).clear()
        cy.get(this.weblocators.year).clear()
    }

    verifyPurchaseErrorMessage() {
        cy.contains('Please fill out Name and Creditcard.').should('be.visible')
    }

}