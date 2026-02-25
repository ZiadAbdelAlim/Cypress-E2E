export class purchasePage {

    weblocators = {
        cartButton: '#cartur',
        homeButton: '#Home',
        name: '#name',
        country: '#country',
        city: '#city',
        creditCard: '#card',
        month: '#month',
        year: '#year'
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
            expect(text).to.equal('Product added.')
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

}