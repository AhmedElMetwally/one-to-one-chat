import { Iuser } from './../Iuser';
export interface Imsg {
    caller : Iuser;
    user : Iuser;
    content : string;
    created : string;
} 