import { TotalLoans } from '../TotalLoans';
import { MonthPaymentInformation } from './types';

export class RepaymentSchedule {
  private _payments: number[];

  private _totalLoanInfo: TotalLoans;

  private _standardPayments: number[];

  private _repaymentSchedule: [];

  constructor(
    payments: number[],
    totalLoanInfo: TotalLoans,
    standardPayments: number[],
  ) {
    this._payments = payments;
    this._totalLoanInfo = totalLoanInfo;
    this._standardPayments = standardPayments;
    this._repaymentSchedule = [];
  }

  get payments(): number[] {
    return this._payments;
  }

  get totalLoanInfo(): TotalLoans {
    return this._totalLoanInfo;
  }

  get standardPayments(): number[] {
    return this._standardPayments;
  }

  get repaymentSchedule(): [] {
    return this._repaymentSchedule;
  }

  /* Loan Calculation Functions */
  monthlyInterestCharge(
    previousMonth: MonthPaymentInformation,
    first: boolean,
  ) {
    if (first) {
      return (
        (this._totalLoanInfo.principal * this._totalLoanInfo.interest) / 12
      );
    }

    const payment = (previousMonth.loanPrincipal * this._totalLoanInfo.interest) / 12;
    return Math.max(payment, 0);
  }

  capitalizeInterest(currentMonth: MonthPaymentInformation, first: boolean) {
    if (first) return false;
    return currentMonth.actualMonthlyPayment >= this._standardPayments[0];
  }

  unpaidInterest(currentMonth: MonthPaymentInformation) {
    return (
      currentMonth.monthlyInterestCharge - currentMonth.actualMonthlyPayment
    );
  }

  hasInterestCapitalized(
    currentMonth: MonthPaymentInformation,
    first: boolean,
  ) {
    if (first) return currentMonth.loanPrincipal - this._totalLoanInfo.principal !== 0;
    return currentMonth.loanPrincipal !== this._totalLoanInfo.principal;
  }

  totalPayments(
    currentMonth: MonthPaymentInformation,
    previousMonth: MonthPaymentInformation,
    first: boolean,
  ) {
    if (first) return currentMonth.actualMonthlyPayment;
    return currentMonth.actualMonthlyPayment + previousMonth.totalPayments;
  }

  // Creates initial data structure for repayment schedule
  initRepaymentSchedule(
    capitalize: boolean,
    length: number,
    accruing: boolean,
  ): [MonthPaymentInformation[]] {
    const data = new Array(length);
    for (let c = 0; c < data.length; c++) {
      data[c] = [];
      for (let i = 0; i < 12; i++) {
        const obj: MonthPaymentInformation = {
          payment: c * 12 + (i + 1),
          monthlyInterestCharge: 0,
          actualMonthlyPayment: 0,
          unpaidInterest: 0,
          loanPrincipal: 0,
          totalPayments: 0,
        };
        if (capitalize) {
          obj.capitalizeInterest = false;
          obj.hasInterestCapitalized = false;
        }
        if (accruing) {
          obj.accruingInterest = 0;
        }
        data[c].push(obj);
      }
    }
    return data as [MonthPaymentInformation[]];
  }
}
