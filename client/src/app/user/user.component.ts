import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  constructor(
    private _authService:AuthService){};
  
  isLogin():boolean{
    return this._authService.isLogin();
  }


  
  ngOnInit(){}
}
