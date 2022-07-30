

interface ICompany {
  handle: string;
  name: string;
  description: string;
  numEmployees: number;
  logoUrl?: string; // can be null or string
  jobs: [IJob];
}

interface ICompanyList {
  companies: [ICompany];
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

interface IJobsList {
  jobs: [IJob];
}

interface IUser {
  username: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  isAdmin?: boolean;
  jobs?: [number];
}

export type {
  ICompany,
  IJob,
  ICompanyList,
  IJobsList,
  IUser,
  IApply
};
/* better to have several user sub-interfaces for the
various places user properties get used, or to have
one interface with optional fields?? Ask someone! */
