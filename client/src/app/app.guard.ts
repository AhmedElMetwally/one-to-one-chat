import { AuthService } from './service/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate , Router} from '@angular/router';


// IsLoginGuard
@Injectable()
export class IsLoginGuard implements CanActivate {
  constructor(
    private _authService:AuthService , 
    private _router:Router ){};

  canActivate(){
    if(this._authService.isLogin()){
      return true;
    }else{
      this._router.navigate(['/user' , 'profile'])
      return false;
    }
  }
}

// IsNotLoginGuard
@Injectable()
export class IsNotLoginGuard implements CanActivate {
  constructor(
    private _authService:AuthService, 
    private _router:Router ){};

    canActivate(){
        if( ! this._authService.isLogin() ){
            return true
        }else{
            this._router.navigate(['/user' , 'profile'])
            return false
        }
  }
}

