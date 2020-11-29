import { PaymentPlan } from '../index';

export class RefiPaymentPlan extends PaymentPlan {
  private _term: number = 10;

  private _interest: number = 0.04;

  // Creates a 10 item payment list for refi payment plans
  calculatePayments() {
    let refiPayments = new Array(20);
    const refiPayment = super.paymentFunction(
      this._interest,
      -(this._term * 12),
      0 - super.totalLoanInfo.loanBalance,
    );
    refiPayments = refiPayments.fill(refiPayment, 0, 20);
    return refiPayments;
  }
}
