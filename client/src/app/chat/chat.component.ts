import { Imsg } from './chat.msg';
import { UserService } from './../user/user.service';
import { Iuser } from './../user/app.user';
import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { ChatService } from './chat.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls : ['chat.component.css']
})
export class ChatComponent implements OnInit {
  
  // socket.io
  io = io(environment.url);
  
  // _id  
  // token
  // myuser
  _id :string = localStorage.getItem('_id');
  token :string = localStorage.getItem('token');
  user: Iuser;

  // caller User 
  caller:Iuser ;

  // all users 
  users:Iuser[] = [];
  
  // get all messages of caller
  messages:Imsg[] = [];

  // new message
  newMessage:Imsg;

  



  constructor(private _chatService:ChatService , private _userService:UserService) {

    // login socket.io
    // check token
    // update socketId
    // get thisUser 
    this.io.emit('login' , this.token );
    this.io.on('login' , data => {
      console.log('login');
      this.user = data.user
    });

    // get all users 
    // filter thisUser
    this.io.on('refresh' , data =>{
      console.log('refresh');
      this.users = [];
      this.users = data.users.filter( u => u._id != this._id);
    });

    // on new msg
    // check if caller
    // ckeck if msg.callerId is userId
    this.io.on('msg' , msg => {
      if(this.caller){
        if(this.caller._id == msg.user._id){
          this.messages.push(msg);
        };
      };
    });

    
    // on any error in socket.io
    // logout this user 
    // to go user/signin
    this.io.on('error' , err => {
      console.log(err);
      this._userService.Logout();
    })



  };


  // sent message on submit form
  // content - caller  - user._id
  // push this msg in messages after sent it 
  sent(msg):void{
    this.newMessage = {
      content : msg.value,
      user : this.user,
      caller : this.caller,
      created : new Date().toISOString()
    };
    this.messages.push(this.newMessage);
    this.io.emit('msg' , this.newMessage);
  };
  
  // call user
  // set caller in this.caller to sent and get the messages
  // show form 
  // replace all messages to his messages
  call(caller):void{
    this.caller = caller;
    this.messages = [];
    this._chatService.getMessages( this._id  , caller._id)
      .subscribe(messages => {
        this.messages = messages;
      })
  };

  // clear Call
  // clear messages
  // hide form and messages
  clearCaller():void{
    this.caller = null;
    this.messages = [];
  };

  ngOnInit(){};

}

