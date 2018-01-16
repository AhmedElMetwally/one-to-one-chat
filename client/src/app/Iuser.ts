export interface Iuser{
    _id?:string;
    name?: string;
    email?: string;
    image?: string;
    password?: string;
    socketId?:string;
    online?:boolean;
    facebook ?: {
      id : string,
      token : string
    }
  }
  
  
  