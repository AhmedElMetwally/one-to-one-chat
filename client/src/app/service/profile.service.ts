import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Iuser } from '../Iuser';
import 'rxjs/add/operator/map';



@Injectable()
export class ProfileService {
    constructor(private _http:Http){};

    getUser(){
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        headers.append('token', localStorage.getItem('token'));
        return this._http.get(`${environment.url}/users/find?_id=${localStorage.getItem('_id')}`,{ headers : headers})
            .map((res:Response) => res.json())
    }; 
    
    updateUser( key , value){
        let update = {};
        update[key] = value;
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        headers.append('token', localStorage.getItem('token'));
        return this._http.post(`${environment.url}/users/update?_id=${localStorage.getItem('_id')}`, update,{ headers : headers})
            .map((res:Response) => res.json())
    }


}
