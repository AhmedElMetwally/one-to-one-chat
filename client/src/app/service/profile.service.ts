import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Iuser } from '../Iuser';


@Injectable()
export class ProfileService {

  constructor(private _http:Http){};

  getUser(){
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this._http.get(`${environment.url}/users/find?_id=${localStorage.getItem('_id')}`,{ headers : headers})
        .map((res:Response) => res.json())
    };


}
