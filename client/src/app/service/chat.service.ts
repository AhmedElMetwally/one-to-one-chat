import { Imsg } from './../chat/Imsg';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http , Headers , Response} from '@angular/http';
import * as io from 'socket.io-client';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Iuser } from '../Iuser';



@Injectable()
export class ChatService {
  constructor(
    private _http:Http){};



  // socket.io
  io = io( environment.url );



  socketIO_emit_login(token : string){
    this.io.emit('login' , token);
    return false;
  }

  // login with token
  // get this user with updated socketId
  socketIO_login():Observable<Iuser> {
    return new Observable(observable => {
      this.io.on('login' , data => {
        observable.next( data.user );
        // observable.complete();
      });
    });
  };



  // on any socket ( connect or disconnet )
  // on refresh get all updated users
  // filter thisUser
  // sort users (online user first)
  // return users 
  socketIO_refresh():Observable<Array<Iuser>>{
    return new Observable(observable => {
      this.io.on('refresh' , data => {
        observable.next(
          data.users
            .filter( u => u._id != localStorage.getItem('_id'))
            .sort(A => A.online ? -1 : 1)
        );
      });
    });
  };

 

  // get any message receive to thisUser 
  SocketIo_GetMsg():Observable<Imsg>{
    return new Observable(observable => {
      this.io.on('msg' , msg => {
        observable.next(msg);
        // observable.complete();
      });
    });
  };



  // sent new msg
  SocketIo_SentMsg(msg:Imsg):void{
    this.io.emit('msg' , msg);
  };



  // get any error from socket
  SocketIO_error():Observable<any>{
    return new Observable(observable => {
      this.io.on('err' , err => {
        observable.next(err);
      });    
    });    
  };


  
  
  // get all messages of thisUser and caller
  getMessages( userId , callerId){
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('token', localStorage.getItem('token'));
    return this._http.get(`${environment.url}/api/messages?userId=${userId}&&callerId=${callerId}` , {headers : headers})
      .map((res:Response) => res.json());
  };




}
