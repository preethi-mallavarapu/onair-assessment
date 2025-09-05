
# On Air – QA Assessment

Automated **end-to-end test suite** for [saucedemo.com](https://www.saucedemo.com/?utm_source=chatgpt.com) using **Playwright (JavaScript)**.  
This project validates login, logout, cart operations, and checkout flows to ensure quality and prevent critical failures in the customer journey.

----------

## Project Structure

```
`onair-assessment/
│── tests/
│   └── saucedemo.spec.js # Main test suite 
│── package.json # Dependencies and scripts 
│── playwright.config.js # Playwright configuration (Chrome + Firefox) 
│── README.md # Documentation 
│── playwright-report/ # Test reports (generated after execution)` 
```
----------

## Features Covered

-   **Login Tests**
    
    -   `standard_user` → success; lands on `/inventory.html`.
        
    -   `locked_out_user` → error banner:  
        `Sorry, this user has been locked out.`
        
    -   `problem_user` → login succeeds (UI quirks ignored).
        
-   **Logout**
    
    -   From inventory → open burger menu → Logout → redirected to `/`.
        
-   **Add Item to Cart**
    
    -   Add _Sauce Labs Backpack_ → cart badge increments → listed in `/cart.html`.
        
-   **Remove Item from Cart**
    
    -   Remove item from cart page → badge clears → item not listed.
        
-   **Checkout Flow**
    
    -   Checkout 1 item with sample user data → successful order completion with message:  
        `Thank you for your order!` on `/checkout-complete.html`.
        

----------

##  Setup & Installation

1.  Clone or unzip the repository:
    
    `git clone https://github.com/preethi-mallavarapu/onair-assessment.git `
    
    `cd onair-assessment` 
    
2.  Install dependencies:
    
    `npm install` 
    
3.  Install browsers (only needed once):
    
    `npx playwright install` 
    

----------

##  Running Tests

Run all tests (Chrome + Firefox as defined in config):

`npm test` 

Run tests only in **Chrome**:

`npx playwright test --project=chromium` 

Run tests only in **Firefox**:

`npx playwright test --project=firefox` 

Run a **single test** by name:

`npx playwright test -g "checkout 1 item"` 

Run in **headed mode** (see browser UI):

`npx playwright test --headed` 

----------

## Reports

After each run, an HTML report is generated in `playwright-report/`.

Open the report:

`npm run report` 

This launches the HTML report in your browser.
    
----------

##  Sample Commands
```
# Install dependencies 
npm install 

# Run all tests (Chrome + Firefox) 
npm test  

# Run tests in Chrome only 
npx playwright test --project=chromium 

# Open HTML report 
npm run report` 
```
----------

## Author

Prepared by **Preethi** for **On Air – QA Assessment**