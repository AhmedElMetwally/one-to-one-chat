import { Iuser } from './../user/app.user';

export interface Imsg{
  user : Iuser;
  content : string;
  caller : Iuser;
  created?: any;
}
