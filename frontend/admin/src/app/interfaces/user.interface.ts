export interface User {
  data: Data;
  _token?: string;
  message?: string;
}

export interface Data {
  _id: string;
  identity: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  profile: string;
  __v: number;
  role: string;
}
