export enum LoanTypes {
  subsidized = 'Subsidized',
  unsubsidized = 'Unsubsidized'
}

export enum FilingStatus {
  separately = 'separately',
  jointly = 'jointly'
}

export enum Rates {
  PAYE = 0.1,
  REPAYE = 0.1,
  IBR = 0.15,
  ICR = 0.2
}

export type LoanInformation = {
  type: string;
  principal: number;
  accruedInterest: number;
  interest: number;
  totalLoanBalance: number;
};

export enum LoanAttributes {
  principal = 'principal',
  accruedInterest = 'accruedInterest',
  interest = 'interest',
  totalLoanBalance = 'totalLoanBalance'
}

export type UserInformation = {
  isMarried: boolean;
  lastYearAgi: number;
  thisYearAgi: number;
  nextYearAgi: number;
  spouseAgi: number;
  spouseLoans: number;
  spouseLoanInterestRate: number;
};

export type AgiYearInformation = {
  year: number;
  familySize: number;
  agi: number;
  spouseAgi: number;
};
