import { Iuser } from './../Iuser';
import { ChatService } from './chat.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Http , Headers , Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { ChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';


@Injectable()
export class AuthService {
  constructor(
        private _http:Http , 
        private _router:Router , 
        private _chatService:ChatService ){};



    
    // is login
    isLogin() :boolean {
        return localStorage.getItem('token') != null && localStorage.getItem('_id') != null
    };

    // ckeckAuth
    // if not auth 
    // logout
    ckeckAuth():void{
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        this._http.get(`${environment.url}/users/ckeckAuth?token=${localStorage.getItem('token')}&&_id=${localStorage.getItem('_id')}`,{ headers : headers})
            .map((res:Response) => res.json())
            .subscribe(data => {
                if(data.auth == false){
                    this.Logout();
                };
                // if any error in server logout and print error
            } , err => {
                console.log(err);
                this.Logout();
            });
    }


    // login 
    // get _id and token in localstorage
    // connect socket.io
    // go to chat
    Login(token , _id) :void {
        localStorage.setItem('token' , token);
        localStorage.setItem('_id' , _id);
        // connect to socket.io
        this._chatService.io.connect();
        this._router.navigate(['/chat']);
    }

    // logout 
    // clear localstorge
    // git to /user/signin
    Logout():void{
        localStorage.clear();
        // disconnect to socket.io
        this._chatService.io.disconnect();
        this._router.navigate(['/user' , 'signin']);
    }









    
    signupUser( user:Iuser ) :any {
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this._http.post(environment.url + '/users/signup' , user , {headers :headers})
          .map((res:Response) => res.json());
      }
    
      signinUser( user:Iuser ) :any {
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this._http.post(environment.url + '/users/signin' , user , {headers :headers})
          .map((res:Response) => res.json());
      }

}