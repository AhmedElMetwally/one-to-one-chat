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
        headers.append('token', localStorage.getItem('token'));
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


}
