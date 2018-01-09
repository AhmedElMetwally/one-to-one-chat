import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-logout',
  template:`
    <button type="button" class="btn btn-danger" (click)="logout()">Logout</button>
  `
})
export class LogoutComponent implements OnInit {

  constructor(private _userService:UserService ) { };
  // logout user
  logout(){
    this._userService.Logout();
  }

  ngOnInit() {
  }

}
