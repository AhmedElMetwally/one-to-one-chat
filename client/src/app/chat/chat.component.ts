import { Iuser } from './../Iuser';
import { ChatService } from './../service/chat.service';
import { AuthService } from './../service/auth.service';
import { Component, OnInit , ElementRef , ViewChild} from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls : ['chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('inputContent') _inputContent: ElementRef;


  _id: string ;
  user: Iuser;
  users:Iuser[] = [];
  caller:Iuser ;
  messages:any[] = [];

  constructor(  
    private _chatService : ChatService,
    private _authService : AuthService){


    // new connect with token
    this.newConnect();
      
    // get thisUser after login
    this._chatService.socketIO_login()
      .subscribe( user => {
        this.user = user;
      })



    // on refresh event ( ant socket connect or disconnect)
    this._chatService.socketIO_refresh()
      .subscribe( users => {
        this.users = users;
      });



    // if thisUser receive the msg
    // ckeck if caller of this msg  == this.caller
    // push it in messages to display
    this._chatService.SocketIo_GetMsg()
      .subscribe( msg => {
        if(this.caller){
          // if this msg to his caller
          if(this.caller._id == msg.user._id){
            this.messages.push(msg);
          } ;
        };
      });



    // if any error from socket
    // display it on console
    // logout
    this._chatService.SocketIO_error()
      .subscribe(err => {
        console.log(err)
        this._authService.Logout();
      });



    // this is test function
    // if socket.io 
    // auto disconnect 
    // connect
    this._chatService.io.on('disconnect' , () => {
      console.log('disconnect')
      // new connect with token
      this.newConnect();
    })
    

  }; // end constructor



  // push this msg in messages to display
  // sent new msg to caller with event msg to 
  // api -> io.to(caller.socketId).emit('msg'  , msg )
  sent():void{
    if(this._inputContent.nativeElement.value.trim()){
      let msg = {
        content : this._inputContent.nativeElement.value.trim(),
        user : this.user,
        caller : this.caller,
        created : new Date().toISOString()
      };
      this._chatService.io.emit('msg' ,msg);
      this.messages.push(msg);
      this._inputContent.nativeElement.value = '';
      this._inputContent.nativeElement.focus();
    };
  };
  

  
  // set this user in caller
  // get all messages of thisUser and caller
  call(caller) :void{
    this.messages = [];
    this.caller = caller;
    this._chatService.getMessages( this._id , caller._id)
      .subscribe( data => {
        if(data.status){
          // if messages api is wait
          // and user is sent msg
          // this code display new msg with Response messages
          this.messages = [ ...data.messages , ...this.messages];
        }else{
          console.log(data.err);
        };

      // fouces the input message
      if(this._inputContent){
        this._inputContent.nativeElement.focus();
      }

      });
  };



  // login in socket io
  // sent token 
  // update socketId in user DB
  // get thisUser
  newConnect() :void{
    this._chatService.io.connect();
    this._chatService.socketIO_emit_login( localStorage.getItem('token') );
  };



  // end the call 
  // delete caller
  // delete messages
  clearCaller():void{
    this.caller = null;
    this.messages = [];
  };



  


  ngOnInit(){
    this._id =  localStorage.getItem('_id');
  };

}
