import { TotalLoans } from '../../TotalLoans';
import { StandardPaymentPlan } from './index';

describe('Standard Payment Plan Child Class Test Suite', () => {
  // Method
  it('Standard payment plan calculate payments', () => {
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
    const standardPaymentPlan = new StandardPaymentPlan(
      userInformation,
      totalLoansInfo,
    );

    const mockStandardPayments = new Array(10).fill(0);
    expect(standardPaymentPlan.calculatePayments()).toMatchObject(
      mockStandardPayments,
    );
  });
});
