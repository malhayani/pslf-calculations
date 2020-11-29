import { IncomeBasedPaymentPlan } from './index';
import { TotalLoans } from '../../TotalLoans';
import { FilingStatus } from '../../types';

describe('Refi Payment Plan Child Class Test Suite', () => {
  const mockUserInformation = {
    isMarried: true,
    lastYearAgi: 0,
    thisYearAgi: 0,
    nextYearAgi: 0,
    spouseAgi: 0,
    spouseLoans: 0,
    spouseLoanInterestRate: 0,
  };

  // Contructor
  it('Income based payment plan constructor', () => {
    const userInformation = mockUserInformation;
    const totalLoansInfo = new TotalLoans([]);
    const mockIncomePlan = new Array(25).fill({
      agi: 0,
      spouseAgi: 0,
      familySize: 2,
    });
    const mockStandardPayments = new Array(10).fill(0);
    const incomeBasedPaymentPlan = new IncomeBasedPaymentPlan(
      userInformation,
      totalLoansInfo,
      FilingStatus.jointly,
      0.1,
      false,
      mockIncomePlan,
      mockStandardPayments,
    );
    expect(incomeBasedPaymentPlan.userInformation).toMatchObject(
      userInformation,
    );
    expect(incomeBasedPaymentPlan.totalLoanInfo).toMatchObject(totalLoansInfo);
    expect(incomeBasedPaymentPlan.paymentPlan).toMatchObject([]);
    expect(incomeBasedPaymentPlan.povertyGuideline).toBe(12490);
    expect(incomeBasedPaymentPlan.povertyPerPerson).toBe(4420);
    expect(incomeBasedPaymentPlan.povertyInflationRate).toBe(0.02);
  });

  // Method
  it('Income based payment plan calculate payments', () => {
    const userInformation = mockUserInformation;
    const totalLoansInfo = new TotalLoans([]);
    const mockIncomePlan = new Array(25).fill({
      agi: 0,
      spouseAgi: 0,
      familySize: 2,
    });
    const mockStandardPayments = new Array(10).fill(0);
    const incomeBasedPaymentPlan = new IncomeBasedPaymentPlan(
      userInformation,
      totalLoansInfo,
      FilingStatus.jointly,
      0.1,
      false,
      mockIncomePlan,
      mockStandardPayments,
    );
    const mockIncomeBasedPayments = new Array(25).fill(0);
    expect(incomeBasedPaymentPlan.calculatePayments()).toMatchObject(
      mockIncomeBasedPayments,
    );
  });

  // Method
  it('Income based payment plan calculate payments, payments less than standard payments', () => {
    const userInformation = mockUserInformation;
    const totalLoansInfo = new TotalLoans([]);
    const mockIncomePlan = new Array(25).fill({
      agi: 100000,
      spouseAgi: 200000,
      familySize: 2,
    });
    const mockStandardPayments = new Array(10).fill(1000);
    const incomeBasedPaymentPlan = new IncomeBasedPaymentPlan(
      userInformation,
      totalLoansInfo,
      FilingStatus.separately,
      0.1,
      true,
      mockIncomePlan,
      mockStandardPayments,
    );
    const mockIncomeBasedPayments = new Array(25).fill(621.9583333);
    expect(incomeBasedPaymentPlan.calculatePayments()).toMatchObject(
      mockIncomeBasedPayments,
    );
  });

  // Method
  it('Income based payment plan calculate payments, payments greater than standard payments', () => {
    const userInformation = mockUserInformation;
    const totalLoansInfo = new TotalLoans([]);
    const mockIncomePlan = new Array(25).fill({
      agi: 100000,
      spouseAgi: 200000,
      familySize: 2,
    });
    const mockStandardPayments = new Array(10).fill(200);
    const incomeBasedPaymentPlan = new IncomeBasedPaymentPlan(
      userInformation,
      totalLoansInfo,
      FilingStatus.separately,
      0.1,
      true,
      mockIncomePlan,
      mockStandardPayments,
    );
    const mockIncomeBasedPayments = new Array(25).fill(200);
    expect(incomeBasedPaymentPlan.calculatePayments()).toMatchObject(
      mockIncomeBasedPayments,
    );
  });
});
