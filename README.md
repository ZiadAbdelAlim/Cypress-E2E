Demoblaze E2E Test Automation Suite Overview

This repository contains an end-to-end (E2E) test automation suite for the Demoblaze demo e-commerce website:

https://www.demoblaze.com

The suite was built using Cypress and follows the Page Object Model (POM) design pattern to ensure maintainability, readability, and scalability.

The automated scenario covers the essential business flow:

User registration

User login

Product selection

Add product to cart

Complete purchase

Test Design and Approach
What Was Considered Essential to Test

For an e-commerce platform, the most critical user journey is the purchasing flow. The following were identified as essential:

Authentication (login functionality and registration)

Product browsing and selection

Adding a product to the cart

Completing the checkout process successfully

3. Cypress Best Practices Applied

Avoided unnecessary cy.wait() calls, some were added as demo website backend is slow and to ensure stability

Used assertions to wait for elements and state changes

Attached alert listeners before triggering actions

Structured tests using before() hooks

Kept business logic separated from page interaction logic

Prerequisites

You must have the following installed:

Node.js (version 16 or higher recommended)

npm (comes with Node.js)

To verify installation:

node -v
npm -v

If not installed, download from:

https://nodejs.org

Setup Instructions
1. Clone the Repository
git clone <repository-link>
cd <repository-folder>
2. Install Dependencies

Run:

npm install

This installs Cypress and all required dependencies.

Running the Tests
Option 1: Run in Interactive Mode (Recommended for Local Testing)
npx cypress open

Then:

Select E2E testing

Choose a browser

Click the test file to execute

Option 2: Run in Headless Mode (CI-Friendly)
npx cypress run

This runs all tests in the terminal without opening the Cypress UI

Tools Used

Cypress

JavaScript (ES6)

Page Object Model structure

JSON fixtures for test data