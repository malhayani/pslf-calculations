import { PSLFCalculator } from '.';
import {
  IncomePlanInformation,
  FilingStatus,
  LoanTypes,
  UserInformation,
} from './types';

describe('PSLFCalculator tests', () => {
  const mockUserInformation = {
    isMarried: true,
    lastYearAgi: 10000,
    thisYearAgi: 100000,
    nextYearAgi: 125000,
    spouseAgi: 100000,
    spouseLoans: 25000,
    spouseLoanInterestRate: 2.5,
  };
  const mockLoanInformation = [
    {
      type: LoanTypes.subsidized,
      principal: 1000,
      accruedInterest: 400,
      interest: 2.0,
      totalLoanBalance: 5000,
    },
  ];
  const mockIncomePlan = (new Array(25) as IncomePlanInformation[]).fill({
    year: 1,
    familySize: 2,
    agi: 10000,
    spouseAgi: 20000,
  });
  it('Should successfully instantiate PSLFCalculator object', () => {
    const pslfCalculator = new PSLFCalculator(
      mockUserInformation,
      mockLoanInformation,
      mockIncomePlan,
      FilingStatus.jointly,
    );
    const standardPaymentPlan = pslfCalculator.standardPaymentPlan();
    expect(standardPaymentPlan).toBe(standardPaymentPlan);

    const refiPaymentPlan = pslfCalculator.refiPaymentPlan();
    expect(refiPaymentPlan).toBe(refiPaymentPlan);

    const payePaymentPlan = pslfCalculator.payePaymentPlan();
    expect(payePaymentPlan).toBe(payePaymentPlan);

    const repayePaymentPlan = pslfCalculator.repayePaymentPlan();
    expect(repayePaymentPlan).toBe(repayePaymentPlan);

    const ibrPaymentPlan = pslfCalculator.ibrPaymentPlan();
    expect(ibrPaymentPlan).toBe(ibrPaymentPlan);

    const icrPaymentPlan = pslfCalculator.icrPaymentPlan();
    expect(icrPaymentPlan).toBe(icrPaymentPlan);

    const standardRepaymentSchedule = pslfCalculator.standardRepaymentSchedule();
    expect(standardRepaymentSchedule).toBe(standardRepaymentSchedule);

    const refiRepaymentSchedule = pslfCalculator.refiRepaymentSchedule();
    expect(refiRepaymentSchedule).toBe(refiRepaymentSchedule);

    const payeRepaymentSchedule = pslfCalculator.payeRepaymentSchedule();
    expect(payeRepaymentSchedule).toBe(payeRepaymentSchedule);

    const repayeRepaymentSchedule = pslfCalculator.repayeRepaymentSchedule();
    expect(repayeRepaymentSchedule).toBe(repayeRepaymentSchedule);

    const ibrRepaymentSchedule = pslfCalculator.ibrRepaymentSchedule();
    expect(ibrRepaymentSchedule).toBe(ibrRepaymentSchedule);

    const icrRepaymentSchedule = pslfCalculator.icrRepaymentSchedule();
    expect(icrRepaymentSchedule).toBe(icrRepaymentSchedule);
  });

  it('Should fail to instantiate PSLFCalculator object', () => {
    expect(
      () => new PSLFCalculator(
        {} as UserInformation,
        mockLoanInformation,
        mockIncomePlan,
        FilingStatus.jointly,
      ),
    ).toThrow(Error);
  });
});
