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

  



  constructor(private _chatService:ChatService) {
    // login in soketIo 
    // sent _id
    // socket.io update socketId in db 
    // get all users  
    // get myuser from users
    // filter myuser form users
    this.io.emit('login' , this.token );
    this.io.on('login' , users => {
      this.users = [];
      for(let i = 0 ; i < users.length ; i++){
        if(users[i]._id == this._id){
          this.user = users[i];
        }else{
          this.users.push(users[i])
        }
      }
    });

    // refresh
    // get all users online
    // filter myUser form online users
    // if thisUser is in caller
    // ckeckCallerIsOnline after this refresh
    this.io.on('refresh' , users =>{
      this.users = [];
      for(let i = 0 ; i < users.length ; i++){
        if(users[i]._id == this._id){
          this.user = users[i];
        }else{
          this.users.push(users[i])
        }
      }
      if(this.caller){
        this.ckeckCallerIsOnline();
      }
      console.log('refresh onlineUsers');
    });

    // on new msg
    // check if caller
    // ckeck if msg.callerId is userId
    this.io.on('msg' , msg => {
      if(this.caller){
        if(this.caller._id == msg.user._id){
          this.messages.push(msg);
        }
      }
    })
  };

  // sent message on submit form
  // content - caller  - user._id
  // import to caller
  // must click the user btn to run function call
  // push this msg in messages after sent it 
  sent(msg){
    
    if(!msg.value){
      return false
    }

    this.io.emit('msg' , {
      content : msg.value,
      user : this.user,
      caller : this.caller,
      created : new Date().toISOString()
    });

    this.messages.push({
      content : msg.value,
      user : this.user,
      caller : this.caller,
      created : new Date().toISOString()
    })

    msg.value = '';
  };
  
  // call user
  // set caller in this.caller to sent and get the messages
  // show form 
  // replace all messages to his messages
  call(caller){
    this.caller = caller;
    this.messages = [];
    this._chatService.getMessages( this._id  , caller._id)
      .subscribe(messages => {
        this.messages = messages;
      })
  };

  // clear Call
  // clear messages
  // hide class danger
  // hide form and messages
  clearCaller(){
    this.caller = null;
    this.messages = [];
  };

  
  // for loop nlineUser
  // check if caller._id in onlineUser._id
  // if caller not online 
  // set caller = null
  // reset isConnect = false 
  isConnect:boolean = false;
  ckeckCallerIsOnline(){
    for(var i = 0 ; i < this.users.length ; i++){
      if( this.users[i]._id == this.caller._id && this.users[i].online ){
        this.isConnect = true;
        break;
      }
    }
    if(!this.isConnect){
      this.caller = null
    }
    
    this.isConnect = false;
  }

  ngOnInit(){};

}

