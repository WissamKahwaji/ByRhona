export type UserModel = {
  _id?: string;
  fullName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  voucherAmount?: number;
};

export type SignInValues = {
  email: string;
  password: string;
};
