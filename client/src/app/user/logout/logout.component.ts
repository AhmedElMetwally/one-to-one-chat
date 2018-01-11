import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-logout',
  template:`
    <button type="button" class=" hvr-buzz-out  btn btn-danger" style="padding:10px" (click)="logout()">Logout</button>
  `
})
export class LogoutComponent implements OnInit {

  constructor(
    private _authService:AuthService){};

  logout(){
    this._authService.Logout();
  }

  ngOnInit() {
  }

}