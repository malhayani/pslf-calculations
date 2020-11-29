import { TotalLoans } from './TotalLoans';
import {
  LoanInformation,
  UserInformation,
  AgiYearInformation,
  FilingStatus,
  Rates,
} from './types';
import {
  validateUserInformation,
  validateIncomePlan,
  validateFilingStatus,
  validateLoanInformation,
} from './utils';
import { StandardPaymentPlan } from './PaymentPlans/Standard';
import { RefiPaymentPlan } from './PaymentPlans/Refi';
import { IncomeBasedPaymentPlan } from './PaymentPlans/IncomeBased';
import { StandardRepaymentSchedule } from './RepaymentSchedules/Standard';
import { RefiRepaymentSchedule } from './RepaymentSchedules/Refi';
import { PayeRepaymentSchedule } from './RepaymentSchedules/Paye';
import { RepayeRepaymentSchedule } from './RepaymentSchedules/Repaye';
import { IBRRepaymentSchedule } from './RepaymentSchedules/IBR';
import { ICRRepaymentSchedule } from './RepaymentSchedules/ICR';

export class PSLFCalculator {
  private _userInformation: UserInformation;

  private _incomePlan: AgiYearInformation[];

  private _filingStatus: FilingStatus;

  private _totalLoans: TotalLoans;

  private _standardPayments: number[];

  constructor(
    userInformation: UserInformation,
    loanInformation: LoanInformation[],
    incomePlan: AgiYearInformation[],
    filingStatus: FilingStatus,
  ) {
    try {
      this._userInformation = validateUserInformation(userInformation);
      this._incomePlan = validateIncomePlan(
        incomePlan,
        userInformation.isMarried,
      );
      this._filingStatus = validateFilingStatus(filingStatus);
      this._totalLoans = new TotalLoans(
        validateLoanInformation(loanInformation),
      );
      this._standardPayments = this.standardPaymentPlan();
    } catch (err) {
      throw new Error(err);
    }
  }

  standardPaymentPlan = () => {
    const standardPayments = new StandardPaymentPlan(
      this._userInformation,
      this._totalLoans,
    );
    return standardPayments.calculatePayments();
  };

  refiPaymentPlan = () => {
    const refiPayments = new RefiPaymentPlan(
      this._userInformation,
      this._totalLoans,
    );
    return refiPayments.calculatePayments();
  };

  payePaymentPlan = () => {
    const payePayments = new IncomeBasedPaymentPlan(
      this._userInformation,
      this._totalLoans,
      this._filingStatus,
      Rates.PAYE,
      true,
      this._incomePlan,
      this._standardPayments,
    );
    return payePayments.calculatePayments();
  };

  repayePaymentPlan = () => {
    const repayePayments = new IncomeBasedPaymentPlan(
      this._userInformation,
      this._totalLoans,
      FilingStatus.jointly,
      Rates.REPAYE,
      false,
      this._incomePlan,
      this._standardPayments,
    );
    return repayePayments.calculatePayments();
  };

  ibrPaymentPlan = () => {
    const ibrPayments = new IncomeBasedPaymentPlan(
      this._userInformation,
      this._totalLoans,
      this._filingStatus,
      Rates.IBR,
      true,
      this._incomePlan,
      this._standardPayments,
    );
    return ibrPayments.calculatePayments();
  };

  icrPaymentPlan = () => {
    const icrPayments = new IncomeBasedPaymentPlan(
      this._userInformation,
      this._totalLoans,
      this._filingStatus,
      Rates.ICR,
      false,
      this._incomePlan,
      this._standardPayments,
    );
    return icrPayments.calculatePayments();
  };

  standardRepaymentSchedule = () => {
    const repayementSchedule = new StandardRepaymentSchedule(
      this._standardPayments,
      this._totalLoans,
      this._standardPayments,
    );
    return repayementSchedule.calculateRepaymentSchedule();
  };

  refiRepaymentSchedule = () => {
    const paymentPlan = this.refiPaymentPlan();
    const repayementSchedule = new RefiRepaymentSchedule(
      paymentPlan,
      this._totalLoans,
      this._standardPayments,
    );
    return repayementSchedule.calculateRepaymentSchedule();
  };

  payeRepaymentSchedule = () => {
    const paymentPlan = this.payePaymentPlan();
    const repayementSchedule = new PayeRepaymentSchedule(
      paymentPlan,
      this._totalLoans,
      this._standardPayments,
    );
    return repayementSchedule.calculateRepaymentSchedule();
  };

  repayeRepaymentSchedule = () => {
    const paymentPlan = this.repayePaymentPlan();
    const repayementSchedule = new RepayeRepaymentSchedule(
      paymentPlan,
      this._totalLoans,
      this._standardPayments,
    );
    return repayementSchedule.calculateRepaymentSchedule();
  };

  ibrRepaymentSchedule = () => {
    const paymentPlan = this.ibrPaymentPlan();
    const repayementSchedule = new IBRRepaymentSchedule(
      paymentPlan,
      this._totalLoans,
      this._standardPayments,
    );
    return repayementSchedule.calculateRepaymentSchedule();
  };

  icrRepaymentSchedule = () => {
    const paymentPlan = this.icrPaymentPlan();
    const repayementSchedule = new ICRRepaymentSchedule(
      paymentPlan,
      this._totalLoans,
      this._standardPayments,
    );
    return repayementSchedule.calculateRepaymentSchedule();
  };
}
