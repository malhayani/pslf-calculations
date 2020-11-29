import { LoanInformation, LoanAttributes } from '../types';

export class TotalLoans {
  private _principal: number;

  private _accruedInterest: number;

  private _loanBalance: number;

  private _interest: number;

  constructor(loans: LoanInformation[]) {
    this._principal = this.totalValue(loans, LoanAttributes.principal);
    this._accruedInterest = this.totalValue(
      loans,
      LoanAttributes.accruedInterest,
    );
    this._loanBalance = this.totalValue(loans, LoanAttributes.totalLoanBalance);
    this._interest = this.averageInterestRate(loans);
  }

  get principal(): number {
    return this._principal;
  }

  get accruedInterest(): number {
    return this._accruedInterest;
  }

  get loanBalance(): number {
    return this._loanBalance;
  }

  get interest(): number {
    return this._interest;
  }

  /* Sum all the values of the specified attribute in an array of objects */
  totalValue(loans: LoanInformation[], attr: keyof LoanInformation) {
    const loansClone = [...loans];
    const arr = loansClone.map((x) => x[attr]);
    return parseFloat(
      arr
        .reduce(
          (a, b) => parseFloat(a.toString()) + parseFloat(b.toString()),
          0,
        )
        .toString(),
    );
  }

  /* Returns average interest rate for all loans */
  averageInterestRate(loans: LoanInformation[]) {
    const loansClone = [...loans];
    const arr = loansClone.map(
      (loan) => loan[LoanAttributes.principal] * loan[LoanAttributes.interest],
    );
    const val = arr.reduce((a, b) => a + b, 0);
    // prevents the denominator from ever being 0
    const denom = this.totalValue(loansClone, LoanAttributes.principal) || 1;
    return val / denom;
  }
}
