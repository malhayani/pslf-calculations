import { RepaymentSchedule } from '../index';
import { MonthPaymentInformation } from '../types';

export class StandardRepaymentSchedule extends RepaymentSchedule {
  private _capitalize: boolean = false;

  private _size: number = 10;

  private _accruing: boolean = false;

  get capitalize() {
    return this._capitalize;
  }

  get size() {
    return this._size;
  }

  get accruing() {
    return this._accruing;
  }

  monthlyInterestCharge(
    previousMonth: MonthPaymentInformation,
    first: boolean,
    interest?: number,
  ) {
    if (first) return super.totalLoanInfo.loanBalance * (interest! / 12);
    return previousMonth.loanPrincipal * (interest! / 12);
  }

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
          super.totalLoanInfo.interest,
        );
        monthClone.actualMonthlyPayment = super.payments[yIndex];
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
