import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-logout',
  template:`
    <button type="button" class="btn btn-danger" (click)="logout()">Logout</button>
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
