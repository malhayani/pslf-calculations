import { RefiRepaymentSchedule } from './index';
import { TotalLoans } from '../../TotalLoans';
import { MonthPaymentInformation } from '../types';

describe('Refi repayment Schedule Parent Test Suite', () => {
  // Constructor Method
  it('Refi repayment schedule constructor', () => {
    const paymentsMock = new Array(10).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    expect(RefiRepaymentScheduleMock.payments).toMatchObject(paymentsMock);
    expect(RefiRepaymentScheduleMock.totalLoanInfo).toMatchObject(
      totalLoanInfoMock,
    );
    expect(RefiRepaymentScheduleMock.standardPayments).toMatchObject(
      standardPaymentsMock,
    );
    expect(RefiRepaymentScheduleMock.repaymentSchedule).toMatchObject([]);
    expect(RefiRepaymentScheduleMock.capitalize).toBe(false);
    expect(RefiRepaymentScheduleMock.size).toBe(20);
    expect(RefiRepaymentScheduleMock.accruing).toBe(true);
    expect(RefiRepaymentScheduleMock.interest).toBe(0.04);
  });

  // Getter
  it('Refi repayment schedule get capitalize', () => {
    const paymentsMock = new Array(10).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const spy = jest
      .spyOn(RefiRepaymentScheduleMock, 'capitalize', 'get')
      .mockReturnValue(false);
    expect(RefiRepaymentScheduleMock.capitalize).toBe(false);
    spy.mockRestore();
  });

  // Getter
  it('Refi repayment schedule get size', () => {
    const paymentsMock = new Array(10).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const spy = jest
      .spyOn(RefiRepaymentScheduleMock, 'size', 'get')
      .mockReturnValue(2);
    expect(RefiRepaymentScheduleMock.size).toBe(2);
    spy.mockRestore();
  });

  // Getter
  it('Refi repayment schedule get accruing', () => {
    const paymentsMock = new Array(10).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const spy = jest
      .spyOn(RefiRepaymentScheduleMock, 'accruing', 'get')
      .mockReturnValue(false);
    expect(RefiRepaymentScheduleMock.accruing).toBe(false);
    spy.mockRestore();
  });

  // Getter
  it('Refi repayment schedule get interest', () => {
    const paymentsMock = new Array(10).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const spy = jest
      .spyOn(RefiRepaymentScheduleMock, 'interest', 'get')
      .mockReturnValue(0.1);
    expect(RefiRepaymentScheduleMock.interest).toBe(0.1);
    spy.mockRestore();
  });

  // Method
  it('Refi repayment schedule monthly interest charge first month', () => {
    const paymentsMock = new Array(10).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { loanPrincipal: 11000 } as MonthPaymentInformation;
    expect(
      RefiRepaymentScheduleMock.monthlyInterestCharge(obj, true, 0.25).toFixed(
        2,
      ),
    ).toBe('208.33');
  });

  // Method
  it('Refi repayment schedule monthly interest charge not first month', () => {
    const paymentsMock = new Array(10).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { loanPrincipal: 11000 } as MonthPaymentInformation;
    expect(
      RefiRepaymentScheduleMock.monthlyInterestCharge(obj, false, 0.25).toFixed(
        2,
      ),
    ).toBe('229.17');
  });

  // Method
  it('Refi repayment schedule actual monthly payment first month', () => {
    const paymentsMock = new Array(10).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { monthlyInterestCharge: 1000 } as MonthPaymentInformation;
    const obj2 = { loanPrincipal: 1000 } as MonthPaymentInformation;
    expect(
      RefiRepaymentScheduleMock.actualMonthlyPayment(
        200,
        obj,
        obj2,
        true,
      ).toFixed(2),
    ).toBe('200.00');
  });

  // Method
  it('Refi repayment schedule actual monthly payment not first month', () => {
    const paymentsMock = new Array(10).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { monthlyInterestCharge: 1000 } as MonthPaymentInformation;
    const obj2 = { loanPrincipal: 1000 } as MonthPaymentInformation;
    expect(
      RefiRepaymentScheduleMock.actualMonthlyPayment(
        200,
        obj,
        obj2,
        false,
      ).toFixed(2),
    ).toBe('200.00');
  });

  // Method
  it('Refi repayment schedule loan principal first month', () => {
    const paymentsMock = new Array(10).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { loanPrincipal: 11000 } as MonthPaymentInformation;
    const obj2 = { unpaidInterest: 1000 } as MonthPaymentInformation;
    expect(
      RefiRepaymentScheduleMock.loanPrincipal(obj2, obj, true).toFixed(2),
    ).toBe('11000.00');
  });

  // Method
  it('Refi repayment schedule loan principal not first month', () => {
    const paymentsMock = new Array(10).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { loanPrincipal: 11000 } as MonthPaymentInformation;
    const obj2 = { unpaidInterest: 1000 } as MonthPaymentInformation;
    expect(
      RefiRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2),
    ).toBe('12000.00');
  });

  it('Refi repayment calculate repayment schedule function call', () => {
    const paymentsMock = new Array(20).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );

    const spy = jest
      .spyOn(RefiRepaymentScheduleMock, 'calculateRepaymentSchedule')
      .mockReturnValue([[]]);
    expect(
      RefiRepaymentScheduleMock.calculateRepaymentSchedule(),
    ).toMatchObject([[]]);
    spy.mockRestore();
  });

  it('Refi repayment calculate repayment schedule function call with mock repayment schedule', () => {
    const paymentsMock = new Array(20).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const RefiRepaymentScheduleMock = new RefiRepaymentSchedule(
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
        };
        mockRepaymentSchedule[c].push(obj);
      }
    }
    expect(
      RefiRepaymentScheduleMock.calculateRepaymentSchedule(),
    ).toMatchObject(mockRepaymentSchedule);
  });
});
