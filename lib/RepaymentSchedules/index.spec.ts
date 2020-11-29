import { TotalLoans } from '../TotalLoans';
import { RepaymentSchedule } from './index';
import { MonthPaymentInformation } from './types';

describe('Repayment Schedule Parent Test Suite', () => {
  // Constructor Method
  it('Repayment schedule constructor', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = new TotalLoans([]);
    const standardPaymentsMock = new Array(10).fill(0);
    const RepaymentScheduleMock = new RepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    expect(RepaymentScheduleMock.payments).toMatchObject(paymentsMock);
    expect(RepaymentScheduleMock.totalLoanInfo).toMatchObject(
      totalLoanInfoMock,
    );
    expect(RepaymentScheduleMock.standardPayments).toMatchObject(
      standardPaymentsMock,
    );
    expect(RepaymentScheduleMock.repaymentSchedule).toMatchObject([]);
  });

  // Getter
  it('Repayment schedule get payments', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = new TotalLoans([]);
    const standardPaymentsMock = new Array(10).fill(0);
    const RepaymentScheduleMock = new RepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const spy = jest
      .spyOn(RepaymentScheduleMock, 'payments', 'get')
      .mockReturnValue([10]);
    expect(RepaymentScheduleMock.payments).toEqual([10]);
    spy.mockRestore();
  });

  // Getter
  it('Repayment schedule get total loan info', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = new TotalLoans([]);
    const standardPaymentsMock = new Array(10).fill(0);
    const RepaymentScheduleMock = new RepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const spy = jest
      .spyOn(RepaymentScheduleMock, 'totalLoanInfo', 'get')
      .mockReturnValue(new TotalLoans([]));
    expect(RepaymentScheduleMock.totalLoanInfo).toEqual(new TotalLoans([]));
    spy.mockRestore();
  });

  // Getter
  it('Repayment schedule get standard payments', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = new TotalLoans([]);
    const standardPaymentsMock = new Array(10).fill(0);
    const RepaymentScheduleMock = new RepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const spy = jest
      .spyOn(RepaymentScheduleMock, 'standardPayments', 'get')
      .mockReturnValue([10]);
    expect(RepaymentScheduleMock.standardPayments).toEqual([10]);
    spy.mockRestore();
  });

  // Getter
  it('Repayment schedule get repayment schedule', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = new TotalLoans([]);
    const standardPaymentsMock = new Array(10).fill(0);
    const RepaymentScheduleMock = new RepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const spy = jest
      .spyOn(RepaymentScheduleMock, 'repaymentSchedule', 'get')
      .mockReturnValue([]);
    expect(RepaymentScheduleMock.repaymentSchedule).toEqual([]);
    spy.mockRestore();
  });

  // Method
  it('Repayment schedule monthly interest charge first month', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = new TotalLoans([]);
    const standardPaymentsMock = new Array(10).fill(0);
    const RepaymentScheduleMock = new RepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { loanPrincipal: 11000 } as MonthPaymentInformation;
    expect(RepaymentScheduleMock.monthlyInterestCharge(obj, true)).toEqual(0);
  });

  // Method
  it('Repayment schedule monthly interest charge not first month', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 10000,
      accruedInterest: 1000,
      interest: 0.25,
      loanBalance: 11000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RepaymentScheduleMock = new RepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { loanPrincipal: 11000 } as MonthPaymentInformation;
    expect(
      RepaymentScheduleMock.monthlyInterestCharge(obj, false).toFixed(2),
    ).toEqual('229.17');
  });

  // Method
  it('Repayment schedule capitalize interest first month', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 10000,
      accruedInterest: 1000,
      interest: 0.25,
      loanBalance: 11000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RepaymentScheduleMock = new RepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { actualMonthlyPayment: 11000 } as MonthPaymentInformation;
    expect(RepaymentScheduleMock.capitalizeInterest(obj, true)).toBeFalsy();
  });

  // Method
  it('Repayment schedule capitalize interest not first month', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 10000,
      accruedInterest: 1000,
      interest: 0.25,
      loanBalance: 11000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RepaymentScheduleMock = new RepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { actualMonthlyPayment: 11000 } as MonthPaymentInformation;
    expect(RepaymentScheduleMock.capitalizeInterest(obj, false)).toBeTruthy();
  });

  // Method
  it('Repayment schedule unpaid interest', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 10000,
      accruedInterest: 1000,
      interest: 0.25,
      loanBalance: 11000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RepaymentScheduleMock = new RepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = {
      actualMonthlyPayment: 1000,
      monthlyInterestCharge: 11000,
    } as MonthPaymentInformation;
    expect(RepaymentScheduleMock.unpaidInterest(obj)).toEqual(10000);
  });

  // Method
  it('Repayment schedule has interest capitalized first month', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 10000,
      accruedInterest: 1000,
      interest: 0.25,
      loanBalance: 11000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RepaymentScheduleMock = new RepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { loanPrincipal: 20000 } as MonthPaymentInformation;
    expect(
      RepaymentScheduleMock.hasInterestCapitalized(obj, true),
    ).toBeTruthy();
  });

  // Method
  it('Repayment schedule has interest capitalized not first month', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 10000,
      accruedInterest: 1000,
      interest: 0.25,
      loanBalance: 11000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RepaymentScheduleMock = new RepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { loanPrincipal: 20000 } as MonthPaymentInformation;
    expect(
      RepaymentScheduleMock.hasInterestCapitalized(obj, false),
    ).toBeTruthy();
  });

  // Method
  it('Repayment schedule has interest capitalized current principal is total principal', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 10000,
      accruedInterest: 1000,
      interest: 0.25,
      loanBalance: 11000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RepaymentScheduleMock = new RepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { loanPrincipal: 10000 } as MonthPaymentInformation;
    expect(
      RepaymentScheduleMock.hasInterestCapitalized(obj, false),
    ).toBeFalsy();
  });

  // Method
  it('Repayment schedule total payments first month', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 10000,
      accruedInterest: 1000,
      interest: 0.25,
      loanBalance: 11000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RepaymentScheduleMock = new RepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { actualMonthlyPayment: 200 } as MonthPaymentInformation;
    const obj2 = { totalPayments: 1000 } as MonthPaymentInformation;
    expect(RepaymentScheduleMock.totalPayments(obj, obj2, true)).toEqual(200);
  });

  // Method
  it('Repayment schedule total payments not first month', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 10000,
      accruedInterest: 1000,
      interest: 0.25,
      loanBalance: 11000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RepaymentScheduleMock = new RepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { actualMonthlyPayment: 200 } as MonthPaymentInformation;
    const obj2 = { totalPayments: 1000 } as MonthPaymentInformation;
    expect(RepaymentScheduleMock.totalPayments(obj, obj2, false)).toEqual(1200);
  });

  it('Repayment schedule init data structure capitalize and accruing', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 10000,
      accruedInterest: 1000,
      interest: 0.25,
      loanBalance: 11000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RepaymentScheduleMock = new RepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const mockRepaymentSchedule = new Array(25);
    for (let c = 0; c < mockRepaymentSchedule.length; c++) {
      mockRepaymentSchedule[c] = [];
      for (let i = 0; i < 12; i++) {
        const obj = {
          payment: c * 12 + (i + 1),
          monthlyInterestCharge: 0,
          actualMonthlyPayment: 0,
          unpaidInterest: 0,
          loanPrincipal: 0,
          totalPayments: 0,
          capitalizeInterest: false,
          hasInterestCapitalized: false,
          accruingInterest: 0,
        };
        mockRepaymentSchedule[c].push(obj);
      }
    }
    expect(
      RepaymentScheduleMock.initRepaymentSchedule(true, 25, true),
    ).toMatchObject(mockRepaymentSchedule);
  });

  it('Repayment schedule init data structure capitalize and not accruing', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 10000,
      accruedInterest: 1000,
      interest: 0.25,
      loanBalance: 11000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RepaymentScheduleMock = new RepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const mockRepaymentSchedule = new Array(25);
    for (let c = 0; c < mockRepaymentSchedule.length; c++) {
      mockRepaymentSchedule[c] = [];
      for (let i = 0; i < 12; i++) {
        const obj = {
          payment: c * 12 + (i + 1),
          monthlyInterestCharge: 0,
          actualMonthlyPayment: 0,
          unpaidInterest: 0,
          loanPrincipal: 0,
          totalPayments: 0,
          capitalizeInterest: false,
          hasInterestCapitalized: false,
        };
        mockRepaymentSchedule[c].push(obj);
      }
    }
    expect(
      RepaymentScheduleMock.initRepaymentSchedule(true, 25, false),
    ).toMatchObject(mockRepaymentSchedule);
  });

  it('Repayment schedule init data structure not capitalize and accruing', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 10000,
      accruedInterest: 1000,
      interest: 0.25,
      loanBalance: 11000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RepaymentScheduleMock = new RepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const mockRepaymentSchedule = new Array(25);
    for (let c = 0; c < mockRepaymentSchedule.length; c++) {
      mockRepaymentSchedule[c] = [];
      for (let i = 0; i < 12; i++) {
        const obj = {
          payment: c * 12 + (i + 1),
          monthlyInterestCharge: 0,
          actualMonthlyPayment: 0,
          unpaidInterest: 0,
          loanPrincipal: 0,
          totalPayments: 0,
          accruingInterest: 0,
        };
        mockRepaymentSchedule[c].push(obj);
      }
    }
    expect(
      RepaymentScheduleMock.initRepaymentSchedule(false, 25, true),
    ).toMatchObject(mockRepaymentSchedule);
  });

  it('Repayment schedule init data structure not capitalize and not accruing', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 10000,
      accruedInterest: 1000,
      interest: 0.25,
      loanBalance: 11000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RepaymentScheduleMock = new RepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const mockRepaymentSchedule = new Array(25);
    for (let c = 0; c < mockRepaymentSchedule.length; c++) {
      mockRepaymentSchedule[c] = [];
      for (let i = 0; i < 12; i++) {
        const obj = {
          payment: c * 12 + (i + 1),
          monthlyInterestCharge: 0,
          actualMonthlyPayment: 0,
          unpaidInterest: 0,
          loanPrincipal: 0,
          totalPayments: 0,
        };
        mockRepaymentSchedule[c].push(obj);
      }
    }
    expect(
      RepaymentScheduleMock.initRepaymentSchedule(false, 25, false),
    ).toMatchObject(mockRepaymentSchedule);
  });
});
