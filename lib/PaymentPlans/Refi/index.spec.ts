import { TotalLoans } from '../../TotalLoans';
import { RefiPaymentPlan } from './index';

describe('Refi Payment Plan Child Class Test Suite', () => {
  // Contructor
  it('Refi payment plan constructor', () => {
    const userInformation = {
      isMarried: true,
      lastYearAgi: 0,
      thisYearAgi: 0,
      nextYearAgi: 0,
      spouseAgi: 0,
      spouseLoans: 0,
      spouseLoanInterestRate: 0,
    };
    const totalLoansInfo = new TotalLoans([]);
    const refiPaymentPlan = new RefiPaymentPlan(
      userInformation,
      totalLoansInfo,
    );
    expect(refiPaymentPlan.userInformation).toMatchObject(userInformation);
    expect(refiPaymentPlan.totalLoanInfo).toMatchObject(totalLoansInfo);
    expect(refiPaymentPlan.paymentPlan).toMatchObject([]);
    expect(refiPaymentPlan.povertyGuideline).toBe(12490);
    expect(refiPaymentPlan.povertyPerPerson).toBe(4420);
    expect(refiPaymentPlan.povertyInflationRate).toBe(0.02);
  });

  // Method
  it('Refi payment plan calculate payments', () => {
    const userInformation = {
      isMarried: true,
      lastYearAgi: 0,
      thisYearAgi: 0,
      nextYearAgi: 0,
      spouseAgi: 0,
      spouseLoans: 0,
      spouseLoanInterestRate: 0,
    };
    const totalLoansInfo = new TotalLoans([]);
    const refiPaymentPlan = new RefiPaymentPlan(
      userInformation,
      totalLoansInfo,
    );
    const mockRefiPayments = new Array(20).fill(0);
    expect(refiPaymentPlan.calculatePayments()).toMatchObject(mockRefiPayments);
  });
});
