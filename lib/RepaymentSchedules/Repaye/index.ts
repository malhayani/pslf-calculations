import { RepaymentSchedule } from '../index';
import { MonthPaymentInformation } from '../types';

export class RepayeRepaymentSchedule extends RepaymentSchedule {
  private _capitalize: boolean = false;

  private _size: number = 25;

  private _accruing: boolean = true;

  get capitalize() {
    return this._capitalize;
  }

  get size() {
    return this._size;
  }

  get accruing() {
    return this._accruing;
  }

  actualMonthlyPayment(payment: number, currentMonth: MonthPaymentInformation) {
    return currentMonth.monthlyInterestCharge === 0 ? 0 : payment;
  }

  accruingInterest(
    currentMonth: MonthPaymentInformation,
    previousMonth: MonthPaymentInformation,
    first: boolean,
  ) {
    if (first) return super.totalLoanInfo.accruedInterest;
    const val = currentMonth.unpaidInterest > 0
      ? currentMonth.unpaidInterest * 0.5 + previousMonth.accruingInterest!
      : currentMonth.unpaidInterest + previousMonth.accruingInterest!;
    return Math.max(0, val);
  }

  loanPrincipal(
    currentMonth: MonthPaymentInformation,
    previousMonth: MonthPaymentInformation,
    first: boolean,
  ) {
    if (first) return super.totalLoanInfo.principal;

    const val = currentMonth.accruingInterest === 0
      ? previousMonth.loanPrincipal + currentMonth.unpaidInterest
      : previousMonth.loanPrincipal;
    return val > 0.01 ? val : 0;
  }

  calculateRepaymentSchedule() {
    const repaymentSchedule = super.initRepaymentSchedule(
      this._capitalize,
      this._size,
      this._accruing,
    );
    let previousMonth = {} as MonthPaymentInformation;

    repaymentSchedule.forEach((year, yIndex) => {
      year.forEach((month: MonthPaymentInformation, mIndex: number) => {
        const first = yIndex === 0 && mIndex === 0;
        const monthClone = { ...month };
        monthClone.monthlyInterestCharge = super.monthlyInterestCharge(
          previousMonth,
          first,
        );
        monthClone.actualMonthlyPayment = this.actualMonthlyPayment(
          super.payments[yIndex],
          monthClone,
        );
        monthClone.unpaidInterest = super.unpaidInterest(monthClone);
        monthClone.accruingInterest = this.accruingInterest(
          monthClone,
          previousMonth,
          first,
        );
        monthClone.loanPrincipal = this.loanPrincipal(
          monthClone,
          previousMonth,
          first,
        );
        monthClone.totalPayments = super.totalPayments(
          monthClone,
          previousMonth,
          first,
        );
        previousMonth = monthClone;
      });
    });
    return repaymentSchedule;
  }
}
