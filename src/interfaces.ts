

interface ICompany {
  handle: string;
  name: string;
  description: string;
  numEmployees: number;
  logoUrl?: string;
  jobs: IJob[];
}

interface ICompanyCardProps {
  company: ICompany;
}

interface IJob {
  id: number;
  title: string;
  salary: number;
  equity: string;
  companyHandle: string;
  companyName: string;
}

interface IApply {
  applied: number;
}

interface IUser {
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  isAdmin?: boolean;
  jobs?: number[];
  applications?: number[];
  token?: string;
}

interface IToken {
  username?: string;
}

interface ILogin {
  username: string;
  password: string;
}

interface ISignup extends ILogin {
  firstName: string;
  lastName: string;
  email: string;
}

interface IProfileData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface ILoginProps {
  loginUser: (formData: IUser) => void;
}

interface DecodedToken {
  username: string;
}

export type MyToken<T> = T | null;

export type {
  ICompany,
  IJob,
  IUser,
  IApply,
  IToken,
  ILogin,
  ISignup,
  IProfileData,
  ILoginProps,
  ICompanyCardProps,
  DecodedToken,
};
/* better to have several user sub-interfaces for the
various places user properties get used, or to have
one interface with optional fields?? Ask someone! */
