# PSLF Calculations
This package contains functions that support the calculation of payment plans and repayment plans for the Public Student Loan Forgiveness program.

### Functions

Create PSLF Calculator:
```typescript 
// Represents user metadata
type UserInformation = {
    // If married then true, else false
    isMarried: boolean;
    // Adjusted gross income from LAST year
    lastYearAgi: number;
    // Adjusted gross income for THIS year
    thisYearAgi: number;
    // Expected Adjusted gross income for NEXT year
    nextYearAgi: number;
    // If married, spouse's adjusted gross income for LAST year, else 0
    spouseAgi: number;
    // If married, total value of spouse loans
    spouseLoans: number;
    // If married, average interest rate of spouse loans
    spouseLoanInterestRate: number;
};

// Represents loan information for the user
type LoanInformation = {
    // Type of loan - i.e. subsidized / unsubsidized
    type: string;
    // Principal value of loan
    principal: number;
    // Amount of interest that has accrued on loan
    accruedInterest: number;
    // Interest rate of loan
    interest: number;
    // Current total value of loan
    totalLoanBalance: number;
};

// Represents a forward looking income plan
type IncomePlanInformation = {
    // Number that represents the year for that income plan
    year: number;
    // Number that represents user family size. Minimum is 1.
    familySize: number;
    // Number that represents the expected adjusted gross income for that year
    agi: number;
    // If married, number that represents spouse's expected gross income for that year, else 0.
    spouseAgi: number;
};

// Represents the users tax filing status. If married and filing jointly, then set to jointly, otherwise use seperately.
enum FilingStatus {
    jointly: 'jointly',
    separately: 'seperately'
}

// Example User Information Object
const userInformation: UserInformation = {
    isMarried: true,
    lastYearAgi: 43000,
    thisYearAgi: 48000,
    nextYearAgi: 100000,
    spouseAgi: 82000,
    spouseLoans: 22000,
    spouseLoanInterestRate: 2.25
};

// Example Loan Information Array
const loanInformation: LoanInformation[] = [
    {
        type: 'Subsidized',
        principal: 18000,
        accruedInterest: 4500,
        interest: 4.1,
        totalLoanBalance: 22500
    },
    {
        type: 'Subsidized',
        principal: 4000,
        accruedInterest: 325,
        interest: 4.1,
        totalLoanBalance: 4325
    }
];

// Example Income Plan Array
const incomePlan: IncomePlanInformation[] = [
    {
        year: 2020,
        familySize: 2,
        agi: 43000,
        spouseAgi: 82000
    },
    {
        year: 2021,
        familySize: 2,
        agi: 48000,
        spouseAgi: 85000
    },
    {
        year: 2022,
        familySize: 3, // user had a child
        agi: 100000,
        spouseAgi: 87000
    },
    ... // array must have at least 25 years of data
];

const pslfCalculator = new PSLFCalculator(
    userInformation, 
    // Array of loans 
    loanInformation,
    // Array of income plans per year. MUST contain 25 years worth of data
    incomePlan, 
    // Tax filing status
    filingStatus
);
```

Payment Plans:
```typescript 
// Returns an array of numbers representing payments for each of the payment plans
// i.e. [1000, 1100, 1200, ...] 

// Get Standard Payment Plan
const standardPaymentPlan = pslfCalculator.standardPaymentPlan();

// Get REFI Payment Plan
const refiPaymentPlan = pslfCalculator.refiPaymentPlan();

// Get PAYE Payment Plan
const payePaymentPlan = pslfCalculator.payePaymentPlan();

// Get REPAYE Payment Plan
const repayePaymentPlan = pslfCalculator.repayePaymentPlan();

// Get IBR Payment Plan
const ibrPaymentPlan = pslfCalculator.ibrPaymentPlan();

// Get ICR Payment Plan
const icrPaymentPlan = pslfCalculator.icrPaymentPlan();
```

Repayment Schedules:
```typescript 
// Returns an array of arrays of numbers representing required monthly payments for each of the payment plans. Each array represents a year, and contains the 12 monthly payments that need to be made throughout the year. The first value in each sub-array represents the January payment.
/* 
    [
        [1000, 1100, 1200, ... (contains 12 payments)],
        [1000, 1100, 1200, ... (contains 12 payments)],
        [1000, 1100, 1200, ... (contains 12 payments)],
        ...
    ]
*/

// Get Standard Repayment Schedule
const standardRepaymentSchedule = pslfCalculator.standardRepaymentSchedule();

// Get REFI Repayment Schedule
const refiRepaymentSchedule = pslfCalculator.refiRepaymentSchedule();

// Get PAYE Repayment Schedule
const payeRepaymentSchedule = pslfCalculator.payeRepaymentSchedule();

// Get REPAYE Repayment Schedule
const repayeRepaymentSchedule = pslfCalculator.repayeRepaymentSchedule();

// Get IBR Repayment Schedule
const ibrRepaymentSchedule = pslfCalculator.ibrRepaymentSchedule();

// Get ICR Repayment Schedule
const icrRepaymentSchedule = pslfCalculator.icrRepaymentSchedule();

```