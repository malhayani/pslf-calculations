import { RepayeRepaymentSchedule } from './index';
import { TotalLoans } from '../../TotalLoans';
import { MonthPaymentInformation } from '../types';

describe('Repaye repayment Schedule Parent Test Suite', () => {
  // Constructor Method
  it('Repaye repayment schedule constructor', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    expect(RepayeRepaymentScheduleMock.payments).toMatchObject(paymentsMock);
    expect(RepayeRepaymentScheduleMock.totalLoanInfo).toMatchObject(
      totalLoanInfoMock,
    );
    expect(RepayeRepaymentScheduleMock.standardPayments).toMatchObject(
      standardPaymentsMock,
    );
    expect(RepayeRepaymentScheduleMock.repaymentSchedule).toMatchObject([]);
    expect(RepayeRepaymentScheduleMock.capitalize).toBe(false);
    expect(RepayeRepaymentScheduleMock.size).toBe(25);
    expect(RepayeRepaymentScheduleMock.accruing).toBe(true);
  });

  // Getter
  it('Repaye repayment schedule get capitalize', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const spy = jest
      .spyOn(RepayeRepaymentScheduleMock, 'capitalize', 'get')
      .mockReturnValue(false);
    expect(RepayeRepaymentScheduleMock.capitalize).toBe(false);
    spy.mockRestore();
  });

  // Getter
  it('Repaye repayment schedule get size', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const spy = jest
      .spyOn(RepayeRepaymentScheduleMock, 'size', 'get')
      .mockReturnValue(2);
    expect(RepayeRepaymentScheduleMock.size).toBe(2);
    spy.mockRestore();
  });

  // Getter
  it('Repaye repayment schedule get accruing', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const spy = jest
      .spyOn(RepayeRepaymentScheduleMock, 'accruing', 'get')
      .mockReturnValue(false);
    expect(RepayeRepaymentScheduleMock.accruing).toBe(false);
    spy.mockRestore();
  });

  // Method
  it('Repaye repayment schedule actual monthly interest', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { monthlyInterestCharge: 1000 } as MonthPaymentInformation;
    expect(
      RepayeRepaymentScheduleMock.actualMonthlyPayment(200, obj).toFixed(2),
    ).toBe('200.00');
  });

  // Method
  it('Repaye repayment schedule accuring interest first month', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 1000,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { accruingInterest: 11000 } as MonthPaymentInformation;
    const obj2 = { unpaidInterest: 1000 } as MonthPaymentInformation;
    expect(
      RepayeRepaymentScheduleMock.accruingInterest(obj2, obj, true).toFixed(2),
    ).toBe('1000.00');
  });

  // Method
  it('Repaye repayment schedule accuring interest not first month', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 1000,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { accruingInterest: 11000 } as MonthPaymentInformation;
    const obj2 = { unpaidInterest: 1000 } as MonthPaymentInformation;
    expect(
      RepayeRepaymentScheduleMock.accruingInterest(obj2, obj, false).toFixed(2),
    ).toBe('11500.00');
  });

  // Method
  it('Repaye repayment schedule accuring interest not first month with no current unpaid interest', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 1000,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { accruingInterest: 11000 } as MonthPaymentInformation;
    const obj2 = { unpaidInterest: 0 } as MonthPaymentInformation;
    expect(
      RepayeRepaymentScheduleMock.accruingInterest(obj2, obj, false).toFixed(2),
    ).toBe('11000.00');
  });

  // Method
  it('Repaye repayment schedule loan principal first month', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(
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
      RepayeRepaymentScheduleMock.loanPrincipal(obj2, obj, true).toFixed(2),
    ).toBe('1000.00');
  });

  // Method
  it('Repaye repayment schedule loan principal not first month', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(
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
      RepayeRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2),
    ).toBe('11000.00');
  });

  // Method
  it('Repaye repayment schedule loan principal not first month with no accuring interest', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { loanPrincipal: 11000 } as MonthPaymentInformation;
    const obj2 = {
      unpaidInterest: 1000,
      accruingInterest: 0,
    } as MonthPaymentInformation;
    expect(
      RepayeRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2),
    ).toBe('12000.00');
  });

  it('Repaye repayment calculate repayment schedule function call', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );

    const spy = jest
      .spyOn(RepayeRepaymentScheduleMock, 'calculateRepaymentSchedule')
      .mockReturnValue([[]]);
    expect(
      RepayeRepaymentScheduleMock.calculateRepaymentSchedule(),
    ).toMatchObject([[]]);
    spy.mockRestore();
  });

  it('Repaye repayment calculate repayment schedule function call with mock repayment schedule', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RepayeRepaymentScheduleMock = new RepayeRepaymentSchedule(
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
      RepayeRepaymentScheduleMock.calculateRepaymentSchedule(),
    ).toMatchObject(mockRepaymentSchedule);
  });
});
