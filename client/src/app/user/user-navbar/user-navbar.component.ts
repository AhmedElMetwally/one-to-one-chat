import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html'
})
export class UserNavbarComponent implements OnInit {
  constructor(
    private _authService:AuthService){};

  isLogin(){
    return this._authService.isLogin();
  }
  ngOnInit(){};

};
