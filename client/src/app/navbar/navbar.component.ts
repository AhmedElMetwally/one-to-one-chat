import { AuthService } from './../service/auth.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  constructor(
    private _authService:AuthService ){};

  isLogin():boolean{
    return this._authService.isLogin();
  };
  
};
