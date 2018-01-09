import { Router } from '@angular/router';
import { UserService } from './user/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls : ['app.component.css']
})
export class AppComponent {
  constructor(private _userService:UserService , private _router:Router){
    
    // on open the app 
    // ckeck if this app is have token
    // if have token ckeck if this token is good
    // ckeck token on open the app
    // if not auth clear token and _id 
    if(this._userService.isLogin()){
      this._userService.ckeckToken()
      .subscribe(data => {
        if(!data.auth){
          this._router.navigate(['/user' , 'signin']);
          localStorage.clear();
        }
      })
    }
  };

  // ckeck if user login or not
  isLogin():boolean{
    return this._userService.isLogin();
  }

}
