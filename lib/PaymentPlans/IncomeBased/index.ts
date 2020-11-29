import { TotalLoans } from '../../TotalLoans';
import { PaymentPlan } from '../index';
import { IncomePlanInformation, UserInformation, FilingStatus } from '../../types';

export class IncomeBasedPaymentPlan extends PaymentPlan {
  private _filingStatus: FilingStatus;

  private _multiplier: number;

  private _compareToStandard: boolean;

  private _incomePlan: IncomePlanInformation[];

  private _standardPayments: number[];

  constructor(
    userInformation: UserInformation,
    totalLoanInfo: TotalLoans,
    filingStatus: FilingStatus,
    multiplier: number,
    compareToStandard: boolean,
    incomePlan: IncomePlanInformation[],
    standardPayments: number[],
  ) {
    super(userInformation, totalLoanInfo);
    this._filingStatus = filingStatus;
    this._multiplier = multiplier;
    this._compareToStandard = compareToStandard;
    this._incomePlan = incomePlan;
    this._standardPayments = standardPayments;
  }

  // Creates a 25 item payment plan for paye/repaye/ibr/icr payment plans
  calculatePayments() {
    const paymentPlan = this._incomePlan.map((year) => {
      const incomeCalc = this._filingStatus === FilingStatus.jointly
        ? year.agi + year.spouseAgi
        : year.agi;
      const povertyCalc = super.povertyGuideline + (year.familySize - 1) * super.povertyPerPerson;
      const principalCalc = this._filingStatus === FilingStatus.jointly
        ? super.totalLoanInfo.principal
        / (super.totalLoanInfo.principal + super.userInformation.spouseLoans)
        : 1;
      let payment = ((this._multiplier * (incomeCalc - 1.5 * povertyCalc)) / 12)
        * principalCalc;
      payment = payment > 0 ? payment : 0;
      if (this._compareToStandard) {
        payment = payment > this._standardPayments[0]
          ? this._standardPayments[0]
          : payment;
      }
      return parseFloat(payment.toFixed(7));
    });
    return paymentPlan;
  }
}
