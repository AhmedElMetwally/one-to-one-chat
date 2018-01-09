import { UserService } from './user/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls : ['app.component.css']
})
export class AppComponent {
  constructor(private _userService:UserService){};
  
  // ckeck if user login or not
  isLogin():boolean{
    return this._userService.isLogin()
  }

}
