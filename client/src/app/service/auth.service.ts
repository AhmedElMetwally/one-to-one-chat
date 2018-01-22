import { environment } from './../../environments/environment';
import { Iuser } from './../Iuser';
import { ChatService } from './chat.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http , Headers , Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as async from "async";

declare var FB :any ;
declare global {
    interface Window { fbAsyncInit: any; }
};
 


@Injectable()
export class AuthService {
    constructor(
        private _http:Http , 
        private _router:Router , 
        private _chatService:ChatService){

            // init facebook auth config
            window.fbAsyncInit = function() {
                FB.init({
                  appId      : environment.facebook_clientId,
                  cookie     : true,
                  xfbml      : true,
                  version    : 'v2.11'
                });
                FB.AppEvents.logPageView();   
              };
              (function(d, s, id){
                 var js, fjs = d.getElementsByTagName(s)[0];
                 if (d.getElementById(id)) {return;}
                 js = d.createElement(s); js.id = id;
                 js.src = "https://connect.facebook.net/en_US/sdk.js";
                 fjs.parentNode.insertBefore(js, fjs);
               }(document, 'script', 'facebook-jssdk'));

 

    }; // end constructor

    

    // is login
    isLogin() :boolean {
        return localStorage.getItem('token') != null &&  localStorage.getItem('_id')  != null ;
    };



    // ckeckAuth
    // if not auth 
    // logout
    ckeckAuth(){
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        headers.append('token', localStorage.getItem('token'));
        headers.append('_id', localStorage.getItem('_id'));
        return this._http.get(`${environment.url}/users/ckeckAuth`,{ headers : headers})
            .map((res:Response) => res.json());
    };



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
    };



    // logout 
    // clear localstorge
    // git to /user/signin
    Logout():void{
        localStorage.clear();
        this._chatService.io.disconnect();
        this._router.navigate(['/user' , 'signin']);
        window.location.replace('/');
    };



    // sent name email password
    // get _id , token 
    signupUser( user:Iuser ) :any {
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this._http.post(environment.url + '/users/signup' , user , {headers :headers})
          .map((res:Response) => res.json());
    };
    


    // sent email password
    // get _id , token 
    signinUser( user:Iuser ) :any {
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this._http.post(environment.url + '/users/signin' , user , {headers :headers})
            .map((res:Response) => res.json());
    };


   
    // get facebook user data
    // create new user opject
    // use facebookSigninOrSignup
    // to find User in database or create new User
    // get _id , token 
    facebookSigninOrSignup(): Observable<any> {

        return new Observable( observable => {
            async.waterfall([
                cb => {
                               
                    // get user from facebook
                    // create new user opject
                    FB.login( _response => {
                        if(_response.status == 'connected'){
                            FB.api('/me',  response => {
                                
                                // create new user opject
                                let user = {
                                    facebook : {
                                        id : response.id,
                                        token : _response.authResponse.accessToken
                                    },
                                    email : response.id ,
                                    facebookAccount : `https://www.facebook.com/app_scoped_user_id/${response.id}`,
                                    name : response.name ,
                                    image : `http://graph.facebook.com/${response.id}/picture?type=large&redirect=true&width=300&height=300`
                                };

                                cb(null , user);
                    
                            });
                        };
                    });
                },

                
                (user , cb) => {

                    // Signin Or Signup in server
                    // get _id , token 
                    var headers = new Headers();
                    headers.append('Content-Type','application/json');
                    this._http.post(environment.url + '/users/facebookSigninOrSignup' , user , {headers :headers})
                        .map((res:Response) => res.json())
                        .subscribe( user => {
                            
                            // get token and _id
                            observable.next(user);
                            observable.complete();
                        });
                }
            ]);

        }); // end Observable
    };



    

};