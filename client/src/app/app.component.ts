import { UserService } from './user/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls : ['app.component.css']
})
export class AppComponent {
  constructor(private _userService:UserService  ){
    
    // this function run one time on open the app
    // ckeck if this app is have token
    // ckeck auth 
    // if not auth 
    // logout 
    if(this._userService.isLogin()){
      this._userService.ckeckAuth()
    };
   
    
    
  };

  // ckeck if user login or not
  isLogin():boolean{
    return this._userService.isLogin();
  }

}
