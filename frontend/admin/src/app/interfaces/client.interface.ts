export interface ResponseClient {
  data: Client[];
}

export interface Client {
  _id: string;
  identity: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  profile: string;
  __v: number;
}
