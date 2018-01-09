import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-logout',
  template:`
    <button type="button" class="btn btn-danger" (click)="logout()">Logout</button>
  `
})
export class LogoutComponent implements OnInit {

  constructor(private _userService:UserService ,  private _router:Router) { };
  // logout user
  // go to /user/signin
  logout(){
    this._userService.Logout();
    this._router.navigate(['/user' , 'signin' ]);
  }

  ngOnInit() {
  }

}
