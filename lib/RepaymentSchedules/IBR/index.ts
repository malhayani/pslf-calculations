import { RepaymentSchedule } from '../index';
import { MonthPaymentInformation } from '../types';

export class IBRRepaymentSchedule extends RepaymentSchedule {
  private _capitalize: boolean = true;

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

  actualMonthlyPayment(
    payment: number,
    currentMonth: MonthPaymentInformation,
    previousMonth: MonthPaymentInformation,
    first: boolean,
  ) {
    const actualMonthlyPayment = currentMonth.monthlyInterestCharge === 0 ? 0 : payment;
    if (first) return actualMonthlyPayment;
    return Math.min(actualMonthlyPayment, previousMonth.loanPrincipal);
  }

  accruingInterest(
    currentMonth: MonthPaymentInformation,
    previousMonth: MonthPaymentInformation,
    first: boolean,
  ) {
    if (first) {
      let val = 0;
      if (currentMonth.unpaidInterest > 0) val = currentMonth.unpaidInterest;
      else {
        val = super.totalLoanInfo.principal === currentMonth.loanPrincipal
          ? val - super.totalLoanInfo.principal * 0.01
          : currentMonth.unpaidInterest;
      }
      return (val > 0.01 ? val : 0) + super.totalLoanInfo.accruedInterest;
    }
    const val = currentMonth.capitalizeInterest && !previousMonth.hasInterestCapitalized
      ? 0
      : currentMonth.unpaidInterest + previousMonth.accruingInterest!;
    return val > 0.01 ? val : 0;
  }

  loanPrincipal(
    currentMonth: MonthPaymentInformation,
    previousMonth: MonthPaymentInformation,
    first: boolean,
  ) {
    if (first) return super.totalLoanInfo.principal;

    let val = 0;
    if (currentMonth.accruingInterest === 0) {
      val = currentMonth.capitalizeInterest && !previousMonth.hasInterestCapitalized
        ? previousMonth.loanPrincipal
            + previousMonth.accruingInterest!
            + currentMonth.unpaidInterest
        : previousMonth.loanPrincipal + currentMonth.unpaidInterest;
    } else {
      val = currentMonth.capitalizeInterest && previousMonth.hasInterestCapitalized
        ? previousMonth.loanPrincipal + currentMonth.accruingInterest!
        : previousMonth.loanPrincipal;
    }
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
          previousMonth,
          first,
        );
        monthClone.capitalizeInterest = super.capitalizeInterest(
          monthClone,
          first,
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
        monthClone.hasInterestCapitalized = super.hasInterestCapitalized(
          monthClone,
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
