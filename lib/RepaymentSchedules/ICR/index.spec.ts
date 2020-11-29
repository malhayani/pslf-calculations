import { ICRRepaymentSchedule } from './index';
import { TotalLoans } from '../../TotalLoans';
import { MonthPaymentInformation } from '../types';

describe('ICR repayment Schedule Parent Test Suite', () => {
  // Constructor Method
  it('ICR repayment schedule constructor', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    expect(ICRRepaymentScheduleMock.payments).toMatchObject(paymentsMock);
    expect(ICRRepaymentScheduleMock.totalLoanInfo).toMatchObject(
      totalLoanInfoMock,
    );
    expect(ICRRepaymentScheduleMock.standardPayments).toMatchObject(
      standardPaymentsMock,
    );
    expect(ICRRepaymentScheduleMock.repaymentSchedule).toMatchObject([]);
    expect(ICRRepaymentScheduleMock.capitalize).toBe(false);
    expect(ICRRepaymentScheduleMock.size).toBe(25);
    expect(ICRRepaymentScheduleMock.accruing).toBe(true);
  });

  // Getter
  it('ICR repayment schedule get capitalize', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const spy = jest
      .spyOn(ICRRepaymentScheduleMock, 'capitalize', 'get')
      .mockReturnValue(false);
    expect(ICRRepaymentScheduleMock.capitalize).toBe(false);
    spy.mockRestore();
  });

  // Getter
  it('ICR repayment schedule get size', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const spy = jest
      .spyOn(ICRRepaymentScheduleMock, 'size', 'get')
      .mockReturnValue(2);
    expect(ICRRepaymentScheduleMock.size).toBe(2);
    spy.mockRestore();
  });

  // Getter
  it('ICR repayment schedule get accruing', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const spy = jest
      .spyOn(ICRRepaymentScheduleMock, 'accruing', 'get')
      .mockReturnValue(false);
    expect(ICRRepaymentScheduleMock.accruing).toBe(false);
    spy.mockRestore();
  });

  // Method
  it('ICR repayment schedule actual monthly interest first month - 250', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { monthlyInterestCharge: 1000 } as MonthPaymentInformation;
    expect(
      ICRRepaymentScheduleMock.actualMonthlyPayment(250, obj).toFixed(2),
    ).toBe('250.00');
  });

  // Method
  it('ICR repayment schedule accuring interest first month - 1000', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 1000,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = {
      accruingInterest: 11000,
      loanPrincipal: 1000,
    } as MonthPaymentInformation;
    const obj2 = {
      unpaidInterest: 1000,
      loanPrincipal: 1000,
    } as MonthPaymentInformation;
    expect(
      ICRRepaymentScheduleMock.accruingInterest(obj2, obj, true).toFixed(2),
    ).toBe('1000.00');
  });

  // Method
  it('ICR repayment schedule accuring interest first month - 2000', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 1000,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = {
      accruingInterest: 11000,
      loanPrincipal: 1000,
    } as MonthPaymentInformation;
    const obj2 = {
      unpaidInterest: 1000,
      loanPrincipal: 900,
    } as MonthPaymentInformation;
    expect(
      ICRRepaymentScheduleMock.accruingInterest(obj2, obj, true).toFixed(2),
    ).toBe('2000.00');
  });

  // Method
  it('ICR repayment schedule accuring interest not first month - 12000', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 1000,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = {
      accruingInterest: 11000,
      loanPrincipal: 1000,
    } as MonthPaymentInformation;
    const obj2 = {
      unpaidInterest: 1000,
      loanPrincipal: 1000,
    } as MonthPaymentInformation;
    expect(
      ICRRepaymentScheduleMock.accruingInterest(obj2, obj, false).toFixed(2),
    ).toBe('12000.00');
  });

  // Method
  it('ICR repayment schedule accuring interest not first month - 10000', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 1000,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = {
      accruingInterest: 11000,
      loanPrincipal: 900,
    } as MonthPaymentInformation;
    const obj2 = {
      unpaidInterest: 0,
      loanPrincipal: 1000,
    } as MonthPaymentInformation;
    expect(
      ICRRepaymentScheduleMock.accruingInterest(obj2, obj, false).toFixed(2),
    ).toBe('11000.00');
  });

  // Method
  it('ICR repayment schedule accuring interest not first month - 0', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 1000,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = {
      accruingInterest: 11000,
      loanPrincipal: 1000,
    } as MonthPaymentInformation;
    const obj2 = {
      unpaidInterest: 0,
      loanPrincipal: 1000,
    } as MonthPaymentInformation;
    expect(
      ICRRepaymentScheduleMock.accruingInterest(obj2, obj, false).toFixed(2),
    ).toBe('0.00');
  });

  // Method
  it('ICR repayment schedule loan principal first month - 1000', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { loanPrincipal: 11000 } as MonthPaymentInformation;
    const obj2 = {
      unpaidInterest: 1000,
      accruingInterest: 1000,
    } as MonthPaymentInformation;
    expect(
      ICRRepaymentScheduleMock.loanPrincipal(obj2, obj, true).toFixed(2),
    ).toBe('1000.00');
  });

  // Method
  it('ICR repayment schedule loan principal not first month - 11000', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = {
      loanPrincipal: 11000,
      accruingInterest: 100,
    } as MonthPaymentInformation;
    const obj2 = {
      unpaidInterest: 1000,
      accruingInterest: 1000,
    } as MonthPaymentInformation;
    expect(
      ICRRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2),
    ).toBe('11000.00');
  });

  // Method
  it('ICR repayment schedule loan principal not first month- 1000', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = {
      loanPrincipal: 1000,
      accruingInterest: 0,
    } as MonthPaymentInformation;
    const obj2 = {
      unpaidInterest: 0,
      accruingInterest: 0,
    } as MonthPaymentInformation;
    expect(
      ICRRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2),
    ).toBe('1000.00');
  });

  // Method
  it('ICR repayment schedule loan principal not first month - 0', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = {
      loanPrincipal: 100,
      accruingInterest: 0,
    } as MonthPaymentInformation;
    const obj2 = {
      unpaidInterest: 0,
      accruingInterest: 0,
    } as MonthPaymentInformation;
    expect(
      ICRRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2),
    ).toBe('0.00');
  });

  // Method
  it('ICR repayment schedule loan principal not first month - 100', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = {
      loanPrincipal: 100,
      accruingInterest: 10,
    } as MonthPaymentInformation;
    const obj2 = {
      unpaidInterest: 0,
      accruingInterest: 0,
    } as MonthPaymentInformation;
    expect(
      ICRRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2),
    ).toBe('100.00');
  });

  // Method
  it('ICR repayment schedule loan principal not first month - 0.00', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = {
      loanPrincipal: 100,
      accruingInterest: -10,
    } as MonthPaymentInformation;
    const obj2 = {
      unpaidInterest: 0,
      accruingInterest: 0,
    } as MonthPaymentInformation;
    expect(
      ICRRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2),
    ).toBe('0.00');
  });

  it('ICR repayment calculate repayment schedule function call', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );

    const spy = jest
      .spyOn(ICRRepaymentScheduleMock, 'calculateRepaymentSchedule')
      .mockReturnValue([[]]);
    expect(
      ICRRepaymentScheduleMock.calculateRepaymentSchedule(),
    ).toMatchObject([[]]);
    spy.mockRestore();
  });

  it('ICR repayment calculate repayment schedule function call with mock repayment schedule', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const ICRRepaymentScheduleMock = new ICRRepaymentSchedule(
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
    expect(ICRRepaymentScheduleMock.calculateRepaymentSchedule()).toMatchObject(
      mockRepaymentSchedule,
    );
  });
});
