import { Injectable } from '@angular/core';
import { CanActivate , Router} from '@angular/router';
import { UserService } from './user/user.service';


// IsLoginGuard
@Injectable()
export class IsLoginGuard implements CanActivate {
  constructor(private _userService:UserService , private _router:Router ){};

  // if user login true
  // return true
  // if user login false
  // return false
  // go to /user/login
  canActivate(){
    if(this._userService.isLogin()){
      return true
    }else{
      this._router.navigate(['/user' , 'signin'])
      return false
    }
  }
}

// IsNotLoginGuard
@Injectable()
export class IsNotLoginGuard implements CanActivate {
    constructor(private _userService:UserService , private _router:Router){};
    
    // if user login true
    // return false 
    // if user login false
    // return false
    // go to /user/logout
    canActivate(){
        if( ! this._userService.isLogin() ){
            return true
        }else{
            this._router.navigate(['/user' , 'logout'])
            return false
        }
  }
}

