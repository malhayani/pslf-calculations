import { TotalLoans } from '../TotalLoans';
import { UserInformation } from '../types';

export class PaymentPlan {
  private _userInformation: UserInformation;

  private _totalLoanInfo: TotalLoans;

  private _paymentPlan: number[] = [];

  private _povertyGuideline: number = 12490;

  private _povertyPerPerson: number = 4420;

  private _povertyInflationRate: number = 0.02;

  constructor(userInformation: UserInformation, totalLoanInfo: TotalLoans) {
    this._userInformation = userInformation;
    this._totalLoanInfo = totalLoanInfo;
  }

  get userInformation(): UserInformation {
    return this._userInformation;
  }

  get totalLoanInfo(): TotalLoans {
    return this._totalLoanInfo;
  }

  get paymentPlan(): number[] {
    return this._paymentPlan;
  }

  get povertyGuideline(): number {
    return this._povertyGuideline;
  }

  get povertyPerPerson(): number {
    return this._povertyPerPerson;
  }

  get povertyInflationRate(): number {
    return this._povertyInflationRate;
  }

  // Translated Excel Payment Function
  paymentFunction(avgInt: number, duration: number, balance: number) {
    const val = Math.abs(
      (balance * (avgInt / 12)) / (1 - (1 + avgInt / 12) ** duration),
    );
    return val || 0.0;
  }
}
