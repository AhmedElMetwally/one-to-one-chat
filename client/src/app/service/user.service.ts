import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Iuser } from '../Iuser';
import 'rxjs/add/operator/map';



@Injectable()
export class UserService {
    constructor(private _http:Http){};



    // get thisUser without _id
    // if _id get user with _id 
    getUser(_id?:string){
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        // headers.append('token', localStorage.getItem('token'));
        return this._http.get(`${environment.url}/users/find?_id=${ _id || localStorage.getItem('_id')}`,{ headers : headers})
            .map((res:Response) => res.json())
    }; 
    


    // update thisUser with key and value {name : "ahmed"}
    updateUser( key , value){
        let update = {};
        update[key] = value;
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        headers.append('token', localStorage.getItem('token'));
        return this._http.post(`${environment.url}/users/update?_id=${localStorage.getItem('_id')}` , update , { headers : headers})
            .map((res:Response) => res.json())
    };



    // get new FormData
    // upload it to users/image
    uploadImg(formData){
        var headers = new Headers();
        headers.append( 'token', localStorage.getItem('token'));
        return this._http.post(`${environment.url}/users/image` , formData , { headers : headers})
            .map((res:Response) => res.json())
    };


    
    // this function only sent password token to email to have access to change password
    // Note : passwordToken use other secret key
    // token user my secret  key from .env
    sentPassword_forgetPassword(email){
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this._http.post(`${environment.url}/users/forget-password` , {email : email} ,{ headers : headers})
            .map((res:Response) => res.json())
    }


    // get password toekn from url who sent to email
    // sent new password , passwordToken to server
    // get from servet token , _id
    // user token , _id to login in angular
    changePassword_forgerPassword(password , password_token){
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this._http.post(`${environment.url}/users/change-password` , {password : password , password_token :password_token} ,{ headers : headers})
            .map((res:Response) => res.json())
    }



}
