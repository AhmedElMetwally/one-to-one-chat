import { AuthService } from './service/auth.service';
import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    private _authService:AuthService  ){
      // on open this app
      // ckeck auth  
      if(this._authService.isLogin()){
        this._authService.ckeckAuth()
      };
    };

  isLogin():boolean{
    return this._authService.isLogin();
  }

}
