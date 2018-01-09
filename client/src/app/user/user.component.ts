import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  constructor(private _userService:UserService , private _rouer:Router){};
  
  // check if user is login
  isLogin():boolean{
    return this._userService.isLogin();
  }
  ngOnInit(){}
}
