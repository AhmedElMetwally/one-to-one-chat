import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Iuser } from './app.user';
import { Injectable } from '@angular/core';
import { Http , Headers , Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { ChatService } from '../chat/chat.service';
@Injectable()
export class UserService {
  constructor(private _http:Http , private _router:Router , private _chatService:ChatService) {};

  // check Login 
  // with token
  // with _id
  isLogin() :boolean {
     return localStorage.getItem('token') != null && localStorage.getItem('_id') != null
  };

  // this is run when open the app
  // ckeck if user in DB
  // ckeck if token is good
  ckeckAuth():void{
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    this._http.get(`${environment.url}/api/ckeckAuth/?token=${localStorage.getItem('token')}&&_id=${localStorage.getItem('_id')}`,{ headers : headers})
      .map((res:Response) => res.json())
      .subscribe(data => {
        // auth is good
      },
      err =>{
        // auth is bad
        this.Logout();
      });

  }

  // login user
  // with token
  // with _id
  // go to chat
  Login(token , _id) :void {
    localStorage.setItem('token' , token);
    localStorage.setItem('_id' , _id);
    // connect to socket.io
    this._chatService.io.connect();
    this._router.navigate(['/chat']);
  }

  // clear localStorage 
  // go to signin
  Logout():void{
    localStorage.clear();
    // disconnect to socket.io
    this._chatService.io.disconnect();
    this._router.navigate(['/user' , 'signin']);
  }

  // signup user with user interface Iuser
  // return token and user with _id
  signupUser( user:Iuser ) :any {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this._http.post(environment.url + '/api/signup' , user , {headers :headers})
      .map((res:Response) => res.json());
  }

  // signin user with email & password
  // return token and user with _id
  signinUser( user:Iuser ) :any {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this._http.post(environment.url + '/api/signin' , user , {headers :headers})
      .map((res:Response) => res.json());
  }

}
