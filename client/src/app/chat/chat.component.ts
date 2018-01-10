import { Iuser } from './../Iuser';
import { ChatService } from './../service/chat.service';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls : ['chat.component.css']
})
export class ChatComponent implements OnInit {
  _id: string = localStorage.getItem('_id');
  user: Iuser;
  users:Iuser[] = [];
  caller:Iuser ;
  messages:any[] = [];

  constructor(  
    private _chatService:ChatService,
    private _authService:AuthService ){


    // login in socket io
    // sent token 
    // update socketId in user DB
    // get thisUser
    this._chatService.socketIO_login( localStorage.getItem('token') )
      .subscribe( user => {
        this.user = user;
      })


    // on refresh event ( ant socket connect or disconnect)
    this._chatService.socketIO_refresh()
      .subscribe( users => {
        this.users = users;
      })


    // if thisUser receive the msg
    // ckeck if caller of this msg  == this.caller
    // push it in messages to display
    this._chatService.SocketIo_GetMsg()
      .subscribe( msg => {
        if(this.caller){
          // if this msg to his caller
          if(this.caller._id == msg.user._id){
            this.messages.push(msg);
          } 
        }
      })


    // if any error from socket
    // display it on console
    // logout
    this._chatService.SocketIO_error()
      .subscribe(err => {
        console.log(err)
        this._authService.Logout();
      });
    

  };


  // push this msg in messages to display
  // sent new msg to caller
  sent(content):void{
    let msg = {
      content : content,
      user : this.user,
      caller : this.caller,
      created : new Date().toISOString()
    }
    this._chatService.io.emit('msg' ,msg);
    this.messages.push(msg);
  };
  
  // set this user in caller
  // get all messages of thisUser and caller
  call(caller):void{
    this.caller = caller;
    this._chatService.getMessages( this._id , caller._id)
      .subscribe(messages => {
        this.messages = messages;
      })
  };

  // end the call 
  // delete caller
  // delete messages
  clearCaller():void{
    this.caller = null;
    this.messages = [];
  };

  ngOnInit(){};

}
