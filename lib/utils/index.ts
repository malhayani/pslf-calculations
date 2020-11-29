import {
  IncomePlanInformation,
  UserInformation,
  FilingStatus,
  LoanInformation,
} from '../types';

export const validateUserInformation = (userInformation: UserInformation) => {
  const _userInformation = { ...userInformation };
  if (
    _userInformation.lastYearAgi === null
    || _userInformation.lastYearAgi === undefined
    || _userInformation.thisYearAgi === null
    || _userInformation.thisYearAgi === undefined
    || _userInformation.nextYearAgi === null
    || _userInformation.nextYearAgi === undefined
  ) {
    throw new Error('Missing spousal loan information.');
  } else if (
    typeof _userInformation.lastYearAgi !== 'number'
    || typeof _userInformation.thisYearAgi !== 'number'
    || typeof _userInformation.nextYearAgi !== 'number'
  ) {
    throw new Error('Invalid spousal loan information.');
  }
  if (_userInformation.isMarried) {
    if (
      _userInformation.spouseAgi === null
      || _userInformation.spouseAgi === undefined
      || _userInformation.spouseLoans === null
      || _userInformation.spouseLoans === undefined
      || _userInformation.spouseLoanInterestRate === null
      || _userInformation.spouseLoanInterestRate === undefined
    ) {
      throw new Error('Invalid spouse loan information.');
    } else if (
      typeof _userInformation.spouseAgi !== 'number'
      || typeof _userInformation.spouseLoans !== 'number'
      || typeof _userInformation.spouseLoanInterestRate !== 'number'
    ) {
      throw new Error('Invalid spousal loan information.');
    }
  } else {
    _userInformation.spouseAgi = 0;
    _userInformation.spouseLoans = 0;
    _userInformation.spouseLoanInterestRate = 0;
  }
  return _userInformation;
};

export const validateIncomePlan = (
  incomePlan: IncomePlanInformation[],
  isMarried: boolean,
) => {
  if (incomePlan.length < 25) {
    throw new Error(
      'Income plan must include information for at least 25 years.',
    );
  } else {
    for (let i = 0; i < incomePlan.length; i++) {
      const plan = incomePlan[i];
      if (
        plan.agi === null
        || plan.agi === undefined
        || !plan.familySize
        || !plan.year
      ) {
        throw new Error('Income plan is missing information.');
      } else if (
        typeof plan.agi !== 'number'
        || typeof plan.familySize !== 'number'
        || typeof plan.year !== 'number'
      ) {
        throw new Error('Income plan contains invalid data type.');
      }
      if (isMarried) {
        if (
          plan.spouseAgi === null
          || plan.spouseAgi === undefined
          || typeof plan.spouseAgi !== 'number'
        ) {
          throw new Error('Income plan is missing spousal information.');
        }
      }
    }
  }
  return incomePlan;
};

export const validateFilingStatus = (filingStatus: FilingStatus) => {
  if (!filingStatus) {
    throw new Error('Filing status is required.');
  }
  return filingStatus;
};

export const validateLoanInformation = (loanInformation: LoanInformation[]) => {
  if (loanInformation.length < 1) {
    throw new Error('Must include at least one loan.');
  } else {
    for (let i = 0; i < loanInformation.length; i++) {
      const loan = loanInformation[i];
      if (
        !loan.type
        || loan.principal === null
        || loan.principal === undefined
        || loan.accruedInterest === null
        || loan.accruedInterest === undefined
        || loan.interest === null
        || loan.interest === undefined
        || loan.totalLoanBalance === null
        || loan.totalLoanBalance === undefined
      ) {
        throw new Error('Loan information is missing information.');
      } else if (
        typeof loan.type !== 'string'
        || typeof loan.principal !== 'number'
        || typeof loan.accruedInterest !== 'number'
        || typeof loan.interest !== 'number'
        || typeof loan.totalLoanBalance !== 'number'
      ) {
        throw new Error('Loan information contains invalid data type.');
      } else if (
        loan.principal < 0
        || loan.accruedInterest < 0
        || loan.interest < 0
        || loan.totalLoanBalance < 0
      ) {
        throw new Error('Loan information cannot be less than zero.');
      }
    }
  }
  return loanInformation;
};
