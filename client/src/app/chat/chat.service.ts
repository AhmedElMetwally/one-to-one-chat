import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http , Headers , Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ChatService {

  constructor(private _http:Http) { };

  getMessages( userId , callerId){
    return this._http.get(`${environment.url}/api/messages?userId=${userId}&&callerId=${callerId}`)
      .map((res:Response) => res.json());
  }



}
