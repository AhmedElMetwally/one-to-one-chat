import { Iuser } from './../Iuser';
import { ChatService } from './chat.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Http , Headers , Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService as SocialAuthService } from "angular2-social-auth";


 
@Injectable()
export class AuthService {
  constructor(
        private _http:Http , 
        private _router:Router , 
        private _chatService:ChatService,
        private _socialAuthService : SocialAuthService ){};



    
    // is login
    isLogin() :boolean {
        return localStorage.getItem('token') != null 
    };

    // ckeckAuth
    // if not auth 
    // logout
    ckeckAuth(){
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this._http.get(`${environment.url}/users/ckeckAuth?token=${localStorage.getItem('token')}&&_id=${localStorage.getItem('_id')}`,{ headers : headers})
            .map((res:Response) => res.json());
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


    // sent name email password
    signupUser( user:Iuser ) :any {
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this._http.post(environment.url + '/users/signup' , user , {headers :headers})
          .map((res:Response) => res.json());
      }
    
    // sent email password
    signinUser( user:Iuser ) :any {
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this._http.post(environment.url + '/users/signin' , user , {headers :headers})
            .map((res:Response) => res.json());
    }


   
    facebookSigninOrSignup(user : Iuser): any {
        // Signin Or Signup in server
        // get _id , token 
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this._http.post(environment.url + '/users/facebookSigninOrSignup' , user , {headers :headers})
            .map((res:Response) => res.json())
    };





      

}