export type MonthPaymentInformation = {
  payment?: number;
  monthlyInterestCharge: number;
  actualMonthlyPayment: number;
  capitalizeInterest?: boolean;
  unpaidInterest: number;
  accruingInterest?: number;
  loanPrincipal: number;
  hasInterestCapitalized?: boolean;
  totalPayments: number;
};
