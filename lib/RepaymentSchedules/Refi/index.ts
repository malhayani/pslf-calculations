import { RepaymentSchedule } from '../index';
import { MonthPaymentInformation } from '../types';

export class RefiRepaymentSchedule extends RepaymentSchedule {
  private _capitalize: boolean = false;

  private _size: number = 20;

  private _accruing: boolean = true;

  private _interest: number = 0.04;

  get capitalize() {
    return this._capitalize;
  }

  get size() {
    return this._size;
  }

  get accruing() {
    return this._accruing;
  }

  get interest() {
    return this._interest;
  }

  monthlyInterestCharge(
    previousMonth: MonthPaymentInformation,
    first: boolean,
    interest?: number,
  ) {
    if (first) return super.totalLoanInfo.loanBalance * (interest! / 12);
    return previousMonth.loanPrincipal * (interest! / 12);
  }

  actualMonthlyPayment = (
    payment: number,
    month: MonthPaymentInformation,
    previousMonth: MonthPaymentInformation,
    first: boolean,
  ) => {
    if (first) return payment;
    const val = month.monthlyInterestCharge !== 0 ? payment : 0;
    return Math.min(val, previousMonth.loanPrincipal);
  };

  loanPrincipal(
    month: MonthPaymentInformation,
    previousMonth: MonthPaymentInformation,
    first: boolean,
  ) {
    if (first) return super.totalLoanInfo.loanBalance + month.unpaidInterest;
    const val = previousMonth.loanPrincipal + month.unpaidInterest;
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
        monthClone.monthlyInterestCharge = this.monthlyInterestCharge(
          previousMonth,
          first,
          this._interest,
        );
        monthClone.actualMonthlyPayment = this.actualMonthlyPayment(
          super.payments[yIndex],
          monthClone,
          previousMonth,
          first,
        );
        monthClone.unpaidInterest = super.unpaidInterest(monthClone);
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
