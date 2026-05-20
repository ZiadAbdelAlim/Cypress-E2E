# 🧪 Demoblaze E2E Test Automation Suite

A comprehensive end-to-end (E2E) test automation suite for the [Demoblaze](https://www.demoblaze.com) demo e-commerce website, built with **Cypress** and following the **Page Object Model (POM)** design pattern.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Test Scenarios](#test-scenarios)
- [Test Design & Approach](#test-design--approach)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running the Tests](#running-the-tests)
- [Tools & Technologies](#tools--technologies)

---

## 🎯 Overview

This repository demonstrates best practices in test automation by covering the essential business flow of an e-commerce platform:

✅ User registration  
✅ User login  
✅ Product browsing across all categories  
✅ Product selection  
✅ Add product to cart  
✅ Cart management (remove items, multi-item cart)  
✅ Complete purchase  
✅ Contact form submission  

---

## 📝 Test Scenarios

### Essential Testing Areas

For an e-commerce platform, the most critical aspects tested are:

- **Authentication** - User registration and login (positive & negative flows)
- **Product Browsing** - Browsing Phones, Laptops, and Monitors categories; product detail pages
- **Cart Management** - Adding products, removing items, multi-item cart verification
- **Checkout Process** - Full purchase flow, required-field validation, missing-field alerts
- **Contact Form** - Form submission with and without authentication

---

## 🏗️ Test Design & Approach

### Cypress Best Practices Applied

- ✨ Avoided unnecessary `cy.wait()` calls (minimal waits for stability with slower backends)
- 🎯 Used assertions to wait for elements and state changes
- 🔔 Attached alert listeners before triggering actions
- 📦 Structured tests using `before()` hooks
- 🔄 Separated business logic from page interaction logic
- 📄 Implemented Page Object Model for maintainability

---

## 📦 Prerequisites

Ensure you have the following installed:

| Tool | Version | Check |
|------|---------|-------|
| **Node.js** | 16+ | `node -v` |
| **npm** | Latest | `npm -v` |

### Installation Link
[Download Node.js](https://nodejs.org)

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone <repository-link>
cd <repository-folder>
```

### 2️⃣ Install Dependencies

```bash
npm install
```

This installs Cypress and all required dependencies.

---

## ▶️ Running the Tests

### Option 1: Interactive Mode (Recommended for Local Testing)

```bash
npx cypress open
```

Then:
1. Select **E2E testing**
2. Choose your preferred browser
3. Click the test file to execute

### Option 2: Headless Mode (CI-Friendly)

```bash
npx cypress run
```

Runs all tests in the terminal without opening the Cypress UI.

---

## 🛠️ Tools & Technologies

| Technology | Purpose |
|-----------|---------|
| **Cypress** | E2E Testing Framework |
| **JavaScript (ES6)** | Test Implementation |
| **Page Object Model** | Design Pattern |
| **JSON Fixtures** | Test Data Management |

---

## 📚 Additional Resources

- [Cypress Documentation](https://docs.cypress.io)
- [Page Object Model Guide](https://docs.cypress.io/guides/core-concepts/best-practices)
- [Demoblaze Website](https://www.demoblaze.com)

---

## 🤖 AI Usage Disclosure

AI tools were used during the development of this project:

- **ChatGPT** — guidance on syntax, debugging support, and documentation refinement
- **Claude (Anthropic)** — assisted with test coverage analysis, generating additional test cases (cart management, contact form, product navigation), and expanding page object models

All test design decisions, implementation choices, and project structure were independently reviewed and fully understood.
