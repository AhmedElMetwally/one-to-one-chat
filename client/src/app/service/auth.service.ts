import { Iuser } from './../Iuser';
import { ChatService } from './chat.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Http , Headers , Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService as SocialAuthService } from "angular2-social-auth";
import { Observable } from 'rxjs/Observable';


 
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
    Login(token , _id , navigate ) :void {
        localStorage.setItem('token' , token);
        localStorage.setItem('_id' , _id);
        // connect to socket.io
        this._chatService.io.connect();
        if(navigate){
            this._router.navigate(navigate);
        }
    }


    // logout 
    // clear localstorge
    // git to /user/signin
    Logout():void{
        localStorage.clear();
        this._chatService.io.disconnect();
        this._router.navigate(['/user' , 'signin']);
        window.location.replace('/');
    }


    // sent name email password
    // get _id , token 
    signupUser( user:Iuser ) :any {
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this._http.post(environment.url + '/users/signup' , user , {headers :headers})
          .map((res:Response) => res.json());
      }
    
    // sent email password
    // get _id , token 
    signinUser( user:Iuser ) :any {
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this._http.post(environment.url + '/users/signin' , user , {headers :headers})
            .map((res:Response) => res.json());
    }


   
    // get facebook user data
    // create new user opjecy
    // use facebookSigninOrSignup
    // to find User in database or create new User
    // get _id , token 
    facebookSigninOrSignup(): Observable<any> {
        return new Observable( observable => {

            // get user from facebook
            // create new user opject
            this._socialAuthService.login('facebook')
                .subscribe(( FBuser : any ) => {
                    let user = {
                        facebook : {
                            id : FBuser.uid,
                            token : FBuser.token
                        },
                        name : FBuser.first_name +' '+ FBuser.last_name ,
                        email : FBuser.email || FBuser.uid,
                        image : `http://graph.facebook.com/${FBuser.uid}/picture?type=large&redirect=true&width=300&height=300`
                    };

                    // Signin Or Signup in server
                    // get _id , token 
                    var headers = new Headers();
                    headers.append('Content-Type','application/json');
                    return this._http.post(environment.url + '/users/facebookSigninOrSignup' , user , {headers :headers})
                        .map((res:Response) => res.json())
                        .subscribe( user => {
                            observable.next(user);
                            observable.complete();
                        })
                })

            });
    };



      

}