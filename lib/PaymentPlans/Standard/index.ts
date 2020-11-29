import { PaymentPlan } from '../index';

export class StandardPaymentPlan extends PaymentPlan {
  // Creates a 20 item payment list for standard payment plans
  calculatePayments() {
    const standardRepayments = {
      payment: super.paymentFunction(
        super.totalLoanInfo.interest,
        -120,
        0 - super.totalLoanInfo.loanBalance,
      ),
      spousePayment: super.paymentFunction(
        super.userInformation.spouseLoanInterestRate,
        -120,
        0 - super.userInformation.spouseLoans,
      ),
    };
    let standardPayments = new Array(10);
    standardPayments = standardPayments.fill(standardRepayments.payment, 0, 10);
    return standardPayments;
  }
}
