
export enum UserType {
  /**
   * A regular customer who does nothing but engage in commerce on thi splatform.
   */
  customer = "customer",

  /**
   * An employee so a person who can create trades on this platform legally.
   */
  employee = "employee",

  /**
   * An employee who can ONLY trade stocks.
   */
  trader = "trader",

  /**
   * An employee who consults for others.
   */
  consultant = "master",

  /**
   * A stock trading employee that is considered an expert.
   */
  expert = "expert",
}

export type UserModel = {
  uid: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  userType: string;
  profileImage: string;
  wallets: string[];
  dateJoined: number;
};

export function getUserType(userType: string | undefined): string {
  if (userType === UserType.customer) {
    return "Customer";
  }

  if (userType === UserType.employee) {
    return "Employee";
  }

  if (userType === UserType.trader) {
    return "Stock Trader";
  }

  if (userType === UserType.consultant) {
    return "Stocks Consultant";
  }

  return "Stock Expert";
}