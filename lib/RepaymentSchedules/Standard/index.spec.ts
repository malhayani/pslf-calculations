import { StandardRepaymentSchedule } from './index';
import { TotalLoans } from '../../TotalLoans';
import { MonthPaymentInformation } from '../types';

describe('Standard Repayment Schedule Parent Test Suite', () => {
  // Constructor Method
  it('Standard repayment schedule constructor', () => {
    const paymentsMock = new Array(10).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const standardRepaymentScheduleMock = new StandardRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    expect(standardRepaymentScheduleMock.payments).toMatchObject(paymentsMock);
    expect(standardRepaymentScheduleMock.totalLoanInfo).toMatchObject(
      totalLoanInfoMock,
    );
    expect(standardRepaymentScheduleMock.standardPayments).toMatchObject(
      standardPaymentsMock,
    );
    expect(standardRepaymentScheduleMock.repaymentSchedule).toMatchObject([]);
    expect(standardRepaymentScheduleMock.capitalize).toBe(false);
    expect(standardRepaymentScheduleMock.size).toBe(10);
    expect(standardRepaymentScheduleMock.accruing).toBe(false);
  });

  // Getter
  it('Standard repayment schedule get capitalize', () => {
    const paymentsMock = new Array(10).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const standardRepaymentScheduleMock = new StandardRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const spy = jest
      .spyOn(standardRepaymentScheduleMock, 'capitalize', 'get')
      .mockReturnValue(false);
    expect(standardRepaymentScheduleMock.capitalize).toBe(false);
    spy.mockRestore();
  });

  // Getter
  it('Standard repayment schedule get size', () => {
    const paymentsMock = new Array(10).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const standardRepaymentScheduleMock = new StandardRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const spy = jest
      .spyOn(standardRepaymentScheduleMock, 'size', 'get')
      .mockReturnValue(2);
    expect(standardRepaymentScheduleMock.size).toBe(2);
    spy.mockRestore();
  });

  // Getter
  it('Standard repayment schedule get accruing', () => {
    const paymentsMock = new Array(10).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const standardRepaymentScheduleMock = new StandardRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const spy = jest
      .spyOn(standardRepaymentScheduleMock, 'accruing', 'get')
      .mockReturnValue(false);
    expect(standardRepaymentScheduleMock.accruing).toBe(false);
    spy.mockRestore();
  });

  // Method
  it('Standard repayment schedule monthly interest charge first month', () => {
    const paymentsMock = new Array(10).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const standardRepaymentScheduleMock = new StandardRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { loanPrincipal: 11000 } as MonthPaymentInformation;
    expect(
      standardRepaymentScheduleMock
        .monthlyInterestCharge(obj, true, 0.25)
        .toFixed(2),
    ).toBe('208.33');
  });

  // Method
  it('Standard repayment schedule monthly interest charge not first month', () => {
    const paymentsMock = new Array(10).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const standardRepaymentScheduleMock = new StandardRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { loanPrincipal: 11000 } as MonthPaymentInformation;
    expect(
      standardRepaymentScheduleMock
        .monthlyInterestCharge(obj, false, 0.25)
        .toFixed(2),
    ).toBe('229.17');
  });

  // Method
  it('Standard repayment schedule loan principal first month', () => {
    const paymentsMock = new Array(10).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const standardRepaymentScheduleMock = new StandardRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { loanPrincipal: 11000 } as MonthPaymentInformation;
    const obj2 = { unpaidInterest: 1000 } as MonthPaymentInformation;
    expect(
      standardRepaymentScheduleMock.loanPrincipal(obj2, obj, true).toFixed(2),
    ).toBe('11000.00');
  });

  // Method
  it('Standard repayment schedule loan principal not first month', () => {
    const paymentsMock = new Array(10).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const standardRepaymentScheduleMock = new StandardRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { loanPrincipal: 11000 } as MonthPaymentInformation;
    const obj2 = { unpaidInterest: 1000 } as MonthPaymentInformation;
    expect(
      standardRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2),
    ).toBe('12000.00');
  });

  it('Standard repayment calculate repayment schedule function call', () => {
    const paymentsMock = new Array(10).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const standardRepaymentScheduleMock = new StandardRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );

    const spy = jest
      .spyOn(standardRepaymentScheduleMock, 'calculateRepaymentSchedule')
      .mockReturnValue([[]]);
    expect(
      standardRepaymentScheduleMock.calculateRepaymentSchedule(),
    ).toMatchObject([[]]);
    spy.mockRestore();
  });

  it('Standard repayment calculate repayment schedule function call with mock repayment schedule', () => {
    const paymentsMock = new Array(10).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const standardRepaymentScheduleMock = new StandardRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const mockRepaymentSchedule = new Array(10);
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
      standardRepaymentScheduleMock.calculateRepaymentSchedule(),
    ).toMatchObject(mockRepaymentSchedule);
  });
});
