import { AuthService } from './service/auth.service';
import { Component ,OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl : 'app.component.html'
})

export class AppComponent implements OnInit {
  constructor(
    private _authService:AuthService  ){
      
      // on open this app
      // ckeck auth  
      if(this._authService.isLogin()){
        this._authService.ckeckAuth()
          .subscribe(data => {
            if(! data.status){
              console.log(data.err)
              this._authService.Logout();
            }
          });
      };


    };

    ngOnInit(){};

};
