import { PayeRepaymentSchedule } from './index';
import { TotalLoans } from '../../TotalLoans';
import { MonthPaymentInformation } from '../types';

describe('Paye repayment Schedule Parent Test Suite', () => {
  // Constructor Method
  it('Paye repayment schedule constructor', () => {
    const paymentsMock = new Array(20).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    expect(PayeRepaymentScheduleMock.payments).toMatchObject(paymentsMock);
    expect(PayeRepaymentScheduleMock.totalLoanInfo).toMatchObject(
      totalLoanInfoMock,
    );
    expect(PayeRepaymentScheduleMock.standardPayments).toMatchObject(
      standardPaymentsMock,
    );
    expect(PayeRepaymentScheduleMock.repaymentSchedule).toMatchObject([]);
    expect(PayeRepaymentScheduleMock.capitalize).toBe(true);
    expect(PayeRepaymentScheduleMock.size).toBe(20);
    expect(PayeRepaymentScheduleMock.accruing).toBe(true);
  });

  // Getter
  it('Paye repayment schedule get capitalize', () => {
    const paymentsMock = new Array(20).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const spy = jest
      .spyOn(PayeRepaymentScheduleMock, 'capitalize', 'get')
      .mockReturnValue(false);
    expect(PayeRepaymentScheduleMock.capitalize).toBe(false);
    spy.mockRestore();
  });

  // Getter
  it('Paye repayment schedule get size', () => {
    const paymentsMock = new Array(20).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const spy = jest
      .spyOn(PayeRepaymentScheduleMock, 'size', 'get')
      .mockReturnValue(2);
    expect(PayeRepaymentScheduleMock.size).toBe(2);
    spy.mockRestore();
  });

  // Getter
  it('Paye repayment schedule get accruing', () => {
    const paymentsMock = new Array(20).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const spy = jest
      .spyOn(PayeRepaymentScheduleMock, 'accruing', 'get')
      .mockReturnValue(false);
    expect(PayeRepaymentScheduleMock.accruing).toBe(false);
    spy.mockRestore();
  });

  // Method
  it('Paye repayment schedule actual monthly interest first month', () => {
    const paymentsMock = new Array(20).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { monthlyInterestCharge: 1000 } as MonthPaymentInformation;
    const obj2 = { loanPrincipal: 10000 } as MonthPaymentInformation;
    expect(
      PayeRepaymentScheduleMock.actualMonthlyPayment(
        200,
        obj,
        obj2,
        true,
      ).toFixed(2),
    ).toBe('200.00');
  });

  // Method
  it('Paye repayment schedule actual monthly interest not first month', () => {
    const paymentsMock = new Array(20).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { monthlyInterestCharge: 1000 } as MonthPaymentInformation;
    const obj2 = { loanPrincipal: 10000 } as MonthPaymentInformation;
    expect(
      PayeRepaymentScheduleMock.actualMonthlyPayment(
        200,
        obj,
        obj2,
        false,
      ).toFixed(2),
    ).toBe('200.00');
  });

  // Method
  it('Paye repayment schedule accuring interest first month', () => {
    const paymentsMock = new Array(20).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 1000,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { accruingInterest: 11000 } as MonthPaymentInformation;
    const obj2 = { unpaidInterest: 1000 } as MonthPaymentInformation;
    expect(
      PayeRepaymentScheduleMock.accruingInterest(obj2, obj, true).toFixed(2),
    ).toBe('2000.00');
  });

  // Method
  it('Paye repayment schedule accuring interest not first month', () => {
    const paymentsMock = new Array(20).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 1000,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { accruingInterest: 11000 } as MonthPaymentInformation;
    const obj2 = { unpaidInterest: 1000 } as MonthPaymentInformation;
    expect(
      PayeRepaymentScheduleMock.accruingInterest(obj2, obj, false).toFixed(2),
    ).toBe('12000.00');
  });

  // Method
  it('Paye repayment schedule accuring interest not first month with no current unpaid interest', () => {
    const paymentsMock = new Array(20).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 1000,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { accruingInterest: 11000 } as MonthPaymentInformation;
    const obj2 = { unpaidInterest: 0 } as MonthPaymentInformation;
    expect(
      PayeRepaymentScheduleMock.accruingInterest(obj2, obj, false).toFixed(2),
    ).toBe('11000.00');
  });

  // Method
  it('Paye repayment schedule loan principal first month', () => {
    const paymentsMock = new Array(20).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(
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
      PayeRepaymentScheduleMock.loanPrincipal(obj2, obj, true).toFixed(2),
    ).toBe('1000.00');
  });

  // Method
  it('Paye repayment schedule loan principal not first month', () => {
    const paymentsMock = new Array(20).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(
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
      PayeRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2),
    ).toBe('11000.00');
  });

  // Method
  it('Paye repayment schedule loan principal not first month with no accuring interest', () => {
    const paymentsMock = new Array(20).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(
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
      PayeRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2),
    ).toBe('12000.00');
  });

  it('Paye repayment calculate repayment schedule function call', () => {
    const paymentsMock = new Array(20).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );

    const spy = jest
      .spyOn(PayeRepaymentScheduleMock, 'calculateRepaymentSchedule')
      .mockReturnValue([[]]);
    expect(
      PayeRepaymentScheduleMock.calculateRepaymentSchedule(),
    ).toMatchObject([[]]);
    spy.mockRestore();
  });

  it('Paye repayment calculate repayment schedule function call with mock repayment schedule', () => {
    const paymentsMock = new Array(20).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const PayeRepaymentScheduleMock = new PayeRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const mockRepaymentSchedule = new Array(20);
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
      PayeRepaymentScheduleMock.calculateRepaymentSchedule(),
    ).toMatchObject(mockRepaymentSchedule);
  });
});
