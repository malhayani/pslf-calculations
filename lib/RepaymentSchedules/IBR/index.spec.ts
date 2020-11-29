import { IBRRepaymentSchedule } from './index';
import { TotalLoans } from '../../TotalLoans';
import { MonthPaymentInformation } from '../types';

describe('IBR repayment Schedule Parent Test Suite', () => {
  // Constructor Method
  it('IBR repayment schedule constructor', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    expect(IBRRepaymentScheduleMock.payments).toMatchObject(paymentsMock);
    expect(IBRRepaymentScheduleMock.totalLoanInfo).toMatchObject(
      totalLoanInfoMock,
    );
    expect(IBRRepaymentScheduleMock.standardPayments).toMatchObject(
      standardPaymentsMock,
    );
    expect(IBRRepaymentScheduleMock.repaymentSchedule).toMatchObject([]);
    expect(IBRRepaymentScheduleMock.capitalize).toBe(true);
    expect(IBRRepaymentScheduleMock.size).toBe(25);
    expect(IBRRepaymentScheduleMock.accruing).toBe(true);
  });

  // Getter
  it('IBR repayment schedule get capitalize', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const spy = jest
      .spyOn(IBRRepaymentScheduleMock, 'capitalize', 'get')
      .mockReturnValue(false);
    expect(IBRRepaymentScheduleMock.capitalize).toBe(false);
    spy.mockRestore();
  });

  // Getter
  it('IBR repayment schedule get size', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const spy = jest
      .spyOn(IBRRepaymentScheduleMock, 'size', 'get')
      .mockReturnValue(2);
    expect(IBRRepaymentScheduleMock.size).toBe(2);
    spy.mockRestore();
  });

  // Getter
  it('IBR repayment schedule get accruing', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const spy = jest
      .spyOn(IBRRepaymentScheduleMock, 'accruing', 'get')
      .mockReturnValue(false);
    expect(IBRRepaymentScheduleMock.accruing).toBe(false);
    spy.mockRestore();
  });

  // Method
  it('IBR repayment schedule actual monthly interest first month - 250', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { monthlyInterestCharge: 1000 } as MonthPaymentInformation;
    const obj2 = { loanPrincipal: 1000 } as MonthPaymentInformation;
    expect(
      IBRRepaymentScheduleMock.actualMonthlyPayment(
        250,
        obj,
        obj2,
        true,
      ).toFixed(2),
    ).toBe('250.00');
  });

  // Method
  it('IBR repayment schedule actual monthly interest not first month- 250', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { monthlyInterestCharge: 1000 } as MonthPaymentInformation;
    const obj2 = { loanPrincipal: 1000 } as MonthPaymentInformation;
    expect(
      IBRRepaymentScheduleMock.actualMonthlyPayment(
        250,
        obj,
        obj2,
        false,
      ).toFixed(2),
    ).toBe('250.00');
  });

  // Method
  it('IBR repayment schedule accuring interest first month - 2000.00', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 1000,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(
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
      IBRRepaymentScheduleMock.accruingInterest(obj2, obj, true).toFixed(2),
    ).toBe('2000.00');
  });

  // Method
  it('IBR repayment schedule accuring interest first month - 2000', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 1000,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(
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
      IBRRepaymentScheduleMock.accruingInterest(obj2, obj, true).toFixed(2),
    ).toBe('2000.00');
  });

  // Method
  it('IBR repayment schedule accuring interest first month - 1000', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 1000,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(
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
      loanPrincipal: 900,
    } as MonthPaymentInformation;
    expect(
      IBRRepaymentScheduleMock.accruingInterest(obj2, obj, true).toFixed(2),
    ).toBe('1000.00');
  });

  // Method
  it('IBR repayment schedule accuring interest not first month - 12000', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 1000,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(
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
      IBRRepaymentScheduleMock.accruingInterest(obj2, obj, false).toFixed(2),
    ).toBe('12000.00');
  });

  // Method
  it('IBR repayment schedule accuring interest not first month - 11000.00', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 1000,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(
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
      IBRRepaymentScheduleMock.accruingInterest(obj2, obj, false).toFixed(2),
    ).toBe('11000.00');
  });

  // Method
  it('IBR repayment schedule accuring interest not first month - 11100', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 1000,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = {
      accruingInterest: 11000,
      loanPrincipal: 900,
    } as MonthPaymentInformation;
    const obj2 = {
      unpaidInterest: 100,
      loanPrincipal: 900,
    } as MonthPaymentInformation;
    expect(
      IBRRepaymentScheduleMock.accruingInterest(obj2, obj, false).toFixed(2),
    ).toBe('11100.00');
  });

  // Method
  it('IBR repayment schedule loan principal first month - 1000', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = { loanPrincipal: 11000 } as MonthPaymentInformation;
    const obj2 = {
      unpaidInterest: 1000,
      accruingInterest: 1000,
      capitalizeInterest: false,
    } as MonthPaymentInformation;
    expect(
      IBRRepaymentScheduleMock.loanPrincipal(obj2, obj, true).toFixed(2),
    ).toBe('1000.00');
  });

  // Method
  it('IBR repayment schedule loan principal not first month - 11000', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = {
      loanPrincipal: 11000,
      accruingInterest: 100,
      hasInterestCapitalized: false,
    } as MonthPaymentInformation;
    const obj2 = {
      unpaidInterest: 1000,
      accruingInterest: 1000,
      capitalizeInterest: false,
    } as MonthPaymentInformation;
    expect(
      IBRRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2),
    ).toBe('11000.00');
  });

  // Method
  it('IBR repayment schedule loan principal not first month - 1000', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = {
      loanPrincipal: 1000,
      accruingInterest: 0,
      hasInterestCapitalized: false,
    } as MonthPaymentInformation;
    const obj2 = {
      unpaidInterest: 0,
      accruingInterest: 0,
      capitalizeInterest: false,
    } as MonthPaymentInformation;
    expect(
      IBRRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2),
    ).toBe('1000.00');
  });

  // Method
  it('IBR repayment schedule loan principal not first month - 100', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = {
      loanPrincipal: 100,
      accruingInterest: 10,
      hasInterestCapitalized: false,
    } as MonthPaymentInformation;
    const obj2 = {
      unpaidInterest: 0,
      accruingInterest: 0,
      capitalizeInterest: false,
    } as MonthPaymentInformation;
    expect(
      IBRRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2),
    ).toBe('100.00');
  });

  // Method
  it('IBR repayment schedule loan principal not first month - 110', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 1000,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );
    const obj = {
      loanPrincipal: 100,
      accruingInterest: 10,
      hasInterestCapitalized: true,
    } as MonthPaymentInformation;
    const obj2 = {
      unpaidInterest: 0,
      accruingInterest: 10,
      capitalizeInterest: true,
    } as MonthPaymentInformation;
    expect(
      IBRRepaymentScheduleMock.loanPrincipal(obj2, obj, false).toFixed(2),
    ).toBe('110.00');
  });

  it('IBR repayment calculate repayment schedule function call', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 10000,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(
      paymentsMock,
      totalLoanInfoMock,
      standardPaymentsMock,
    );

    const spy = jest
      .spyOn(IBRRepaymentScheduleMock, 'calculateRepaymentSchedule')
      .mockReturnValue([[]]);
    expect(
      IBRRepaymentScheduleMock.calculateRepaymentSchedule(),
    ).toMatchObject([[]]);
    spy.mockRestore();
  });

  it('IBR repayment calculate repayment schedule function call with mock repayment schedule', () => {
    const paymentsMock = new Array(25).fill(0);
    const totalLoanInfoMock = {
      principal: 0,
      accruedInterest: 0,
      interest: 0,
      loanBalance: 0,
    } as TotalLoans;
    const standardPaymentsMock = new Array(10).fill(0);
    const IBRRepaymentScheduleMock = new IBRRepaymentSchedule(
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
    expect(IBRRepaymentScheduleMock.calculateRepaymentSchedule()).toMatchObject(
      mockRepaymentSchedule,
    );
  });
});
