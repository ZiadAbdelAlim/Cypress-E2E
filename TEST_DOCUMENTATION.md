# E2E Automation Test Suite - DemoBlaze

Comprehensive Cypress E2E test automation suite for the DemoBlaze e-commerce application covering Login and Checkout flows with positive and negative test scenarios.

## 📁 Project Structure

```
cypress/
├── E2E/
│   └── tests/
│       ├── register.cy.js              # User registration test
│       ├── login.cy.js                 # Basic login test
│       ├── loginAdvanced.cy.js          # Advanced login scenarios (NEW)
│       ├── purchase.cy.js              # Basic purchase test
│       └── checkoutAdvanced.cy.js       # Advanced checkout scenarios (NEW)
├── Pages/
│   ├── homePage.js                     # Login & signup page object model
│   └── purchasePage.js                 # Cart & checkout page object model
├── fixtures/
│   └── registerData.json               # Test data
└── cypress.config.js                   # Cypress configuration
```

## 🧪 Test Coverage

### Login Feature Tests (`loginAdvanced.cy.js`)

#### Positive Scenarios
- ✅ Successfully login with valid credentials
- ✅ Display user name after successful login
- ✅ Allow user to logout and login again

#### Negative Scenarios
- ❌ Show error message with invalid password
- ❌ Show error message for non-existent user
- ❌ Not allow login with empty username
- ❌ Not allow login with empty password
- ❌ Show error when both fields are empty
- ❌ Be case sensitive for username
- ❌ Handle special characters in password attempt

#### UI/UX Scenarios
- ✅ Close login modal without logging in
- ✅ Clear login fields after closing and reopening modal
- ✅ Allow editing username field multiple times

### Checkout Feature Tests (`checkoutAdvanced.cy.js`)

#### Positive Scenarios
- ✅ Complete full purchase with valid checkout information
- ✅ Add multiple products to cart and checkout
- ✅ Display all checkout fields correctly

#### Negative Scenarios - Missing Fields
- ❌ Show error when name field is empty
- ❌ Show error when credit card field is empty
- ❌ Show error when both name and credit card are empty
- ❌ Allow purchase with country and city empty (only name and card required)

#### Negative Scenarios - Invalid Data
- ❌ Process purchase with invalid credit card format
- ❌ Process purchase with invalid year (past year)
- ❌ Process purchase with special characters in name
- ❌ Process purchase with long name

#### Negative Scenarios - Cart Related
- ❌ Prevent checkout with empty cart

#### Checkout Field Validation Scenarios
- ✅ Accept numeric values in credit card field
- ✅ Accept valid month values (01-12)
- ✅ Accept numeric country name
- ✅ Accept whitespace in checkout fields

## 🚀 Running Tests

### Run all tests
```bash
npx cypress run
```

### Run specific test file
```bash
npx cypress run --spec "cypress/E2E/tests/loginAdvanced.cy.js"
npx cypress run --spec "cypress/E2E/tests/checkoutAdvanced.cy.js"
```

### Run tests in headed mode (see browser)
```bash
npx cypress open
```

### Run tests in headless mode
```bash
npx cypress run --headless
```

### Run specific test suite
```bash
npx cypress run --spec "cypress/E2E/tests/loginAdvanced.cy.js" --browser chrome
```

## 📊 Test Data

Test data is stored in `cypress/fixtures/registerData.json`:

```json
{
  "name": "ziad",
  "password": "Test@12345",
  "country": "Germany",
  "city": "Berlin",
  "creditCard": "1234 5678 9012 3456",
  "month": "12",
  "year": "2025",
  "invalidPassword": "wrongPassword123",
  "invalidCreditCard": "1111222233334444",
  "invalidCountry": "InvalidCountry",
  "invalidYear": "2020",
  "emptyString": ""
}
```

## 🏗️ Page Object Model (POM)

### homePage.js
Handles all login, signup, and navigation related actions:
- `openURL()` - Navigate to application
- `clickSignIn()` - Click login button
- `clickSignUp()` - Click signup button
- `enterUsername(username)` - Enter login username
- `enterPassword(password)` - Enter login password
- `confirmLogin()` - Submit login form
- `verifyUserLoggedIn()` - Verify user is logged in
- `closeModal()` - Close modal dialog
- `verifyLoginErrorMessage()` - Verify login error
- `verifyUserNotFoundError()` - Verify user not found error

### purchasePage.js
Handles all cart and checkout related actions:
- `clickLaptops()` - Navigate to laptops
- `clickPhones()` - Navigate to phones
- `clickMonitors()` - Navigate to monitors
- `clickMacbookPro()` - Click on MacBook Pro product
- `addToCart()` - Add product to cart
- `clickCart()` - Go to cart
- `placeOrder()` - Click place order button
- `addName(name)` - Enter customer name
- `addCountry(country)` - Enter country
- `addCity(city)` - Enter city
- `addCreditCard(card)` - Enter credit card
- `addMonth(month)` - Enter card expiry month
- `addYear(year)` - Enter card expiry year
- `clickPurchase()` - Submit purchase
- `verifyPurchaseSuccess()` - Verify purchase success message
- `verifyCartIsNotEmpty()` - Verify cart has items
- `checkoutFieldsVisible()` - Verify all checkout fields are visible

## 🔧 Configuration

`cypress.config.js` - Main Cypress configuration:

```javascript
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    URL: 'https://www.demoblaze.com/'
  }
});
```

## 📝 Test Best Practices Implemented

1. **Page Object Model (POM)** - All page elements and interactions encapsulated
2. **Fixture Data** - Centralized test data management
3. **Reusable Methods** - Common actions abstracted into helper methods
4. **Proper Waits** - Explicit waits for element visibility and async operations
5. **Test Organization** - Tests grouped by feature and scenario type
6. **Descriptive Test Names** - Clear intention of what each test validates
7. **Setup & Teardown** - Proper test initialization with `before()` hooks
8. **Error Handling** - Tests for various error scenarios and edge cases

## 🐛 Debugging

### View console logs
Tests print important information - check the Cypress console output.

### Interactive debugging
Use `.debug()` in your tests:
```javascript
cy.get('#selector').debug()
```

### Pause execution
Use `.pause()` to stop execution:
```javascript
cy.get('#selector').pause()
```

### Screenshots on failure
Cypress automatically captures screenshots on test failure in `cypress/screenshots/`

### Videos
Test execution videos are saved in `cypress/videos/`

## 📚 Resources

- [Cypress Documentation](https://docs.cypress.io)
- [DemoBlaze Application](https://www.demoblaze.com/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)

## ✨ Enhancements Made

1. **Enhanced POM Classes** - Added validation and error-checking methods
2. **Comprehensive Login Tests** - 10+ test cases covering all scenarios
3. **Comprehensive Checkout Tests** - 15+ test cases covering all scenarios
4. **Test Data Fixture** - Extended with invalid/edge case data
5. **Proper Error Assertions** - Alert message validation for error scenarios
6. **Field Validation Tests** - Tests for data validation and format acceptance
7. **Multi-product Checkout** - Test adding multiple items before checkout
8. **Modal Interaction** - Tests for modal open/close behavior

## 🎯 Next Steps

To extend the test suite:
1. Add API-level tests using `cy.request()`
2. Implement visual regression testing
3. Add performance testing
4. Integrate with CI/CD pipeline (GitHub Actions, Jenkins, etc.)
5. Add accessibility testing (axe-core plugin)
6. Implement custom Cypress commands for common actions

---

**Test Suite Version**: 1.0
**Last Updated**: 2024
**Framework**: Cypress 13+
