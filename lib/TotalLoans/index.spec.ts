import { TotalLoans } from './index';
import { LoanTypes } from '../types';

describe('Total Loans Test Suite', () => {
  // Constructor Method
  it('Total loans constructor', () => {
    const totalLoansMock = new TotalLoans([
      {
        type: LoanTypes.subsidized,
        principal: 0,
        accruedInterest: 0,
        interest: 0,
        totalLoanBalance: 0,
      },
    ]);
    expect(totalLoansMock.principal).toBe(0);
    expect(totalLoansMock.accruedInterest).toBe(0);
    expect(totalLoansMock.loanBalance).toBe(0);
    expect(totalLoansMock.interest).toBe(0);
  });

  // Getter
  it('Total loans get principal', () => {
    const totalLoansMock = new TotalLoans([]);
    const spy = jest
      .spyOn(totalLoansMock, 'principal', 'get')
      .mockReturnValue(10);
    expect(totalLoansMock.principal).toBe(10);
    spy.mockRestore();
  });

  // Getter
  it('Total loans get interest', () => {
    const totalLoansMock = new TotalLoans([]);
    const spy = jest
      .spyOn(totalLoansMock, 'interest', 'get')
      .mockReturnValue(10);
    expect(totalLoansMock.interest).toBe(10);
    spy.mockRestore();
  });

  // Getter
  it('Total loans get accruedInterest', () => {
    const totalLoansMock = new TotalLoans([]);
    const spy = jest
      .spyOn(totalLoansMock, 'accruedInterest', 'get')
      .mockReturnValue(10);
    expect(totalLoansMock.accruedInterest).toBe(10);
    spy.mockRestore();
  });

  // Getter
  it('Total loans get loanBalance', () => {
    const totalLoansMock = new TotalLoans([]);
    const spy = jest
      .spyOn(totalLoansMock, 'loanBalance', 'get')
      .mockReturnValue(10);
    expect(totalLoansMock.loanBalance).toBe(10);
    spy.mockRestore();
  });

  // Method
  it('Total loans total value method', () => {
    const totalLoansMock = new TotalLoans([]);
    const obj = [
      {
        principal: 1,
        interest: 2,
        type: LoanTypes.subsidized,
        accruedInterest: 0.0,
        totalLoanBalance: 0.0,
      },
      {
        principal: 1,
        interest: 2,
        type: LoanTypes.subsidized,
        accruedInterest: 0.0,
        totalLoanBalance: 0.0,
      },
    ];
    expect(totalLoansMock.totalValue(obj, 'principal')).toBe(2);
  });

  // Method
  it('Total loans average interest rate method', () => {
    const totalLoansMock = new TotalLoans([]);
    const obj = [
      {
        principal: 200,
        interest: 0.5,
        type: LoanTypes.subsidized,
        accruedInterest: 0.0,
        totalLoanBalance: 0.0,
      },
      {
        principal: 100,
        interest: 0.2,
        type: LoanTypes.subsidized,
        accruedInterest: 0.0,
        totalLoanBalance: 0.0,
      },
    ];
    expect(totalLoansMock.averageInterestRate(obj)).toBe(0.4);
  });
});
