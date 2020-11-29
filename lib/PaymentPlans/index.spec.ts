import { TotalLoans } from '../TotalLoans';
import { PaymentPlan } from './index';
import { UserInformation } from '../types';

describe('Payment Plan Parent Class Test Suite', () => {
  const mockUserInformation = {
    isMarried: true,
    lastYearAgi: 0,
    thisYearAgi: 0,
    nextYearAgi: 0,
    spouseAgi: 0,
    spouseLoans: 0,
    spouseLoanInterestRate: 0,
  };

  // Contructor
  it('Payment plan constructor', () => {
    const userInformation = {} as UserInformation;
    const totalLoansInfo = {} as TotalLoans;
    const paymentPlan = new PaymentPlan(userInformation, totalLoansInfo);
    expect(paymentPlan.userInformation).toMatchObject(userInformation);
    expect(paymentPlan.totalLoanInfo).toMatchObject(totalLoansInfo);
    expect(paymentPlan.paymentPlan).toMatchObject([]);
    expect(paymentPlan.povertyGuideline).toBe(12490);
    expect(paymentPlan.povertyPerPerson).toBe(4420);
    expect(paymentPlan.povertyInflationRate).toBe(0.02);
  });

  // Getter
  it('Payment plan get current info', () => {
    const userInformation = {} as UserInformation;
    const totalLoansInfo = {} as TotalLoans;
    const paymentPlan = new PaymentPlan(userInformation, totalLoansInfo);
    const spy = jest
      .spyOn(paymentPlan, 'userInformation', 'get')
      .mockReturnValue(mockUserInformation);
    expect(paymentPlan.userInformation).toMatchObject({});
    spy.mockRestore();
  });

  // Getter
  it('Payment plan get total loan info', () => {
    const userInformation = {} as UserInformation;
    const totalLoansInfo = {} as TotalLoans;
    const paymentPlan = new PaymentPlan(userInformation, totalLoansInfo);
    const spy = jest
      .spyOn(paymentPlan, 'totalLoanInfo', 'get')
      .mockReturnValue(new TotalLoans([]));
    expect(paymentPlan.totalLoanInfo).toMatchObject({});
    spy.mockRestore();
  });

  // Getter
  it('Payment plan get payment plan', () => {
    const userInformation = {} as UserInformation;
    const totalLoansInfo = {} as TotalLoans;
    const paymentPlan = new PaymentPlan(userInformation, totalLoansInfo);
    const spy = jest
      .spyOn(paymentPlan, 'paymentPlan', 'get')
      .mockReturnValue([]);
    expect(paymentPlan.paymentPlan).toMatchObject([]);
    spy.mockRestore();
  });

  // Getter
  it('Payment plan get poverty guideline', () => {
    const userInformation = {} as UserInformation;
    const totalLoansInfo = {} as TotalLoans;
    const paymentPlan = new PaymentPlan(userInformation, totalLoansInfo);
    const spy = jest
      .spyOn(paymentPlan, 'povertyGuideline', 'get')
      .mockReturnValue(10);
    expect(paymentPlan.povertyGuideline).toBe(10);
    spy.mockRestore();
  });

  // Getter
  it('Payment plan get poverty per person', () => {
    const userInformation = {} as UserInformation;
    const totalLoansInfo = {} as TotalLoans;
    const paymentPlan = new PaymentPlan(userInformation, totalLoansInfo);
    const spy = jest
      .spyOn(paymentPlan, 'povertyPerPerson', 'get')
      .mockReturnValue(10);
    expect(paymentPlan.povertyPerPerson).toBe(10);
    spy.mockRestore();
  });

  // Getter
  it('Payment plan get poverty inflation rate', () => {
    const userInformation = {} as UserInformation;
    const totalLoansInfo = {} as TotalLoans;
    const paymentPlan = new PaymentPlan(userInformation, totalLoansInfo);
    const spy = jest
      .spyOn(paymentPlan, 'povertyInflationRate', 'get')
      .mockReturnValue(10);
    expect(paymentPlan.povertyInflationRate).toBe(10);
    spy.mockRestore();
  });

  // Method
  it('Payment function with values', () => {
    const userInformation = {} as UserInformation;
    const totalLoansInfo = {} as TotalLoans;
    const paymentPlan = new PaymentPlan(userInformation, totalLoansInfo);
    expect(paymentPlan.paymentFunction(0.25, 10, 15000).toFixed(2)).toBe(
      '1364.69',
    );
  });

  // Method
  it('Payment function without values', () => {
    const userInformation = {} as UserInformation;
    const totalLoansInfo = {} as TotalLoans;
    const paymentPlan = new PaymentPlan(userInformation, totalLoansInfo);
    expect(paymentPlan.paymentFunction(0.0, 0, 0).toFixed(2)).toBe('0.00');
  });
});
