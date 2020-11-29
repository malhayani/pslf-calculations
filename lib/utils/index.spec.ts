import {
  validateIncomePlan,
  validateUserInformation,
  validateFilingStatus,
  validateLoanInformation,
} from '.';
import { AgiYearInformation, FilingStatus, UserInformation } from '../types';

describe('Utils - validateUserInformation tests', () => {
  it('validateUserInformation should succeed', () => {
    const mockUserInformation = {
      isMarried: true,
      lastYearAgi: 10000,
      thisYearAgi: 100000,
      nextYearAgi: 125000,
      spouseAgi: 100000,
      spouseLoans: 25000,
      spouseLoanInterestRate: 2.5,
    };
    const validatedUserInformation = validateUserInformation(
      mockUserInformation,
    );
    expect(validatedUserInformation).toEqual(mockUserInformation);
  });

  it('validateUserInformation should succeed spousal check', () => {
    const mockUserInformation = {
      isMarried: true,
      lastYearAgi: 10000,
      thisYearAgi: 100000,
      nextYearAgi: 125000,
      spouseAgi: 0,
      spouseLoans: 0,
      spouseLoanInterestRate: 0,
    };
    const validatedUserInformation = validateUserInformation(
      mockUserInformation,
    );
    expect(validatedUserInformation).toEqual(mockUserInformation);
  });

  it('validateUserInformation should throw an error because no loan information', () => {
    const mockUserInformation: UserInformation = {
      isMarried: false,
      lastYearAgi: 10000,
      thisYearAgi: 100000,
      nextYearAgi: 125000,
      spouseAgi: 0,
      spouseLoans: 0,
      spouseLoanInterestRate: 0,
    };
    // @ts-ignore
    mockUserInformation.lastYearAgi = null;
    expect(() => validateUserInformation(mockUserInformation)).toThrow(Error);
  });

  it('validateUserInformation should throw an error because bad type in loan information', () => {
    const mockUserInformation: UserInformation = {
      isMarried: false,
      lastYearAgi: 10000,
      thisYearAgi: 100000,
      nextYearAgi: 125000,
      spouseAgi: 0,
      spouseLoans: 0,
      spouseLoanInterestRate: 0,
    };
    // @ts-ignore
    mockUserInformation.lastYearAgi = 'mock';
    expect(() => validateUserInformation(mockUserInformation)).toThrow(Error);
  });

  it('validateUserInformation should throw an error because no spouse information', () => {
    const mockUserInformation: UserInformation = {
      isMarried: true,
      lastYearAgi: 10000,
      thisYearAgi: 100000,
      nextYearAgi: 125000,
      spouseAgi: 0,
      spouseLoans: 0,
      spouseLoanInterestRate: 0,
    };
    // @ts-ignore
    mockUserInformation.spouseAgi = null;
    expect(() => validateUserInformation(mockUserInformation)).toThrow(Error);
  });

  it('validateUserInformation should throw an error because bad type in spouse information', () => {
    const mockUserInformation: UserInformation = {
      isMarried: true,
      lastYearAgi: 10000,
      thisYearAgi: 100000,
      nextYearAgi: 125000,
      spouseAgi: 0,
      spouseLoans: 0,
      spouseLoanInterestRate: 0,
    };
    // @ts-ignore
    mockUserInformation.spouseAgi = 'mock';
    expect(() => validateUserInformation(mockUserInformation)).toThrow(Error);
  });

  it('validateUserInformation should reset spouse information because not married', () => {
    const mockUserInformation: UserInformation = {
      isMarried: false,
      lastYearAgi: 10000,
      thisYearAgi: 100000,
      nextYearAgi: 125000,
      spouseAgi: 10000,
      spouseLoans: 10000,
      spouseLoanInterestRate: 1.25,
    };
    const validatedUserInformation = validateUserInformation(
      mockUserInformation,
    );
    expect(validatedUserInformation.spouseAgi).toBe(0);
    expect(validatedUserInformation.spouseLoans).toBe(0);
    expect(validatedUserInformation.spouseLoanInterestRate).toBe(0);
  });
});

describe('Utils - validateIncomePlan tests', () => {
  it('validateIncomePlan should succeed', () => {
    const mockIncomePlan = (new Array(25) as AgiYearInformation[]).fill({
      year: 1,
      familySize: 2,
      agi: 1000,
      spouseAgi: 1000,
    });
    const validatedIncomePlan = validateIncomePlan(mockIncomePlan, false);
    expect(validatedIncomePlan).toEqual(mockIncomePlan);
  });

  it('validateIncomePlan should fail because not enough income information', () => {
    const mockIncomePlan = (new Array(20) as AgiYearInformation[]).fill({
      year: 1,
      familySize: 2,
      agi: 1000,
      spouseAgi: 1000,
    });
    expect(() => validateIncomePlan(mockIncomePlan, true)).toThrow(Error);
  });

  it('validateIncomePlan should fail because invalid income information', () => {
    const mockIncomePlan = (new Array(25) as AgiYearInformation[]).fill({
      year: 1,
      familySize: 2,
      agi: 1000,
      spouseAgi: 1000,
    });
    // @ts-ignore
    mockIncomePlan[2].agi = null;
    expect(() => validateIncomePlan(mockIncomePlan, true)).toThrow(Error);
  });

  it('validateIncomePlan should fail because invalid income data type', () => {
    const mockIncomePlan = (new Array(25) as AgiYearInformation[]).fill({
      year: 1,
      familySize: 2,
      agi: 1000,
      spouseAgi: 1000,
    });
    // @ts-ignore
    mockIncomePlan[2].agi = 'mock';
    expect(() => validateIncomePlan(mockIncomePlan, true)).toThrow(Error);
  });

  it('validateIncomePlan should fail because invalid spouse income information', () => {
    const mockIncomePlan = (new Array(25) as AgiYearInformation[]).fill({
      year: 1,
      familySize: 2,
      agi: 1000,
      spouseAgi: 1000,
    });
    // @ts-ignore
    mockIncomePlan[2].spouseAgi = null;
    expect(() => validateIncomePlan(mockIncomePlan, true)).toThrow(Error);
  });
});

describe('Utils - validateFilingStatus tests', () => {
  it('validateFilingStatus should succeed', () => {
    expect(validateFilingStatus(FilingStatus.jointly)).toEqual('jointly');
  });

  it('validateFilingStatus should fail', () => {
    // @ts-ignore
    expect(() => validateFilingStatus(null)).toThrow(Error);
  });
});

describe('Utils - validateLoanInformation tests', () => {
  it('validateLoanInformation should succeed', () => {
    const mockLoans = [
      {
        type: 'Subsidized',
        principal: 1000,
        accruedInterest: 200,
        interest: 2000,
        totalLoanBalance: 5000,
      },
    ];
    const validatedIncomePlan = validateLoanInformation(mockLoans);
    expect(validatedIncomePlan).toEqual(mockLoans);
  });

  it('validateLoanInformation should fail because not enough loan information', () => {
    // @ts-ignore
    expect(() => validateLoanInformation([])).toThrow(Error);
  });

  it('validateLoanInformation should fail because invalid loan information', () => {
    const mockLoans = [
      {
        type: 'Subsidized',
        principal: 1000,
        accruedInterest: 200,
        interest: 2000,
        totalLoanBalance: 5000,
      },
    ];
    // @ts-ignore
    mockLoans[0].principal = null;
    expect(() => validateLoanInformation(mockLoans)).toThrow(Error);
  });

  it('validateLoanInformation should fail because invalid income data type', () => {
    const mockLoans = [
      {
        type: 'Subsidized',
        principal: 1000,
        accruedInterest: 200,
        interest: 2000,
        totalLoanBalance: 5000,
      },
    ];
    // @ts-ignore
    mockLoans[0].principal = 'mock';
    expect(() => validateLoanInformation(mockLoans)).toThrow(Error);
  });

  it('validateLoanInformation should fail because negative income data type', () => {
    const mockLoans = [
      {
        type: 'Subsidized',
        principal: 1000,
        accruedInterest: 200,
        interest: 2000,
        totalLoanBalance: 5000,
      },
    ];
    // @ts-ignore
    mockLoans[0].principal = -1000;
    expect(() => validateLoanInformation(mockLoans)).toThrow(Error);
  });
});
