import { URL } from './../app.URL';
import { Iuser } from './app.user';
import { Injectable } from '@angular/core';
import { Http , Headers , Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  constructor(private _http:Http) {};

  // check Login 
  // with token
  isLogin() :boolean {
    return  localStorage.getItem('token') !== null
  }

  // login user
  // with token
  // with _id
  Login(token , _id) :void {
    localStorage.setItem('token' , token)
    localStorage.setItem('_id' , _id)
  }

  // clear localStorage 
  Logout():void{
    localStorage.clear();
  }

  // signup user with user interface Iuser
  // return token and user with _id
  signupUser( user:Iuser ) :any {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this._http.post(URL + '/api/signup' , user , {headers :headers})
      .map((res:Response) => res.json());
  }

  // signin user with email & password
  // return token and user with _id
  signinUser( user:Iuser ) :any {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this._http.post(URL + '/api/signin' , user , {headers :headers})
      .map((res:Response) => res.json());
  }

}
