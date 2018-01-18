import { Component, OnInit } from '@angular/core';
import { FormGroup , Validators , FormControl } from '@angular/forms';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {
  constructor(
    private _authService:AuthService){};


  // new signup form
  myform:FormGroup = new FormGroup({ 
    email : new FormControl('' , [Validators.required , Validators.email]),
    password : new FormControl('', [Validators.required , Validators.minLength(8) , Validators.maxLength(30)])
  });

  // to show alert of error
  ErrorAlert:boolean = false;

  // submit form signin
  onSubmit():void{
    this._authService
      .signinUser({
        email : this.myform.controls.email.value,
        password : this.myform.controls.password.value
      })
      .subscribe( data => {
        if(data.status){
          this._authService.Login( data.user.token , data.user._id ,  ['/chat']);  
          this.myform.reset()
        }else{
          this.ErrorAlert = true;
          console.log(data.err)
        }
    });
  };
  


  // find or create new facebook user
  // get token and _id
  facebookSigninOrSignup():void{
    this._authService.facebookSigninOrSignup()

    // Signin Or Signup in server
    // get _id , token 
      .subscribe( user => {

          // login
          this._authService.Login(user.token , user._id ,  ['/chat'] );
      });
  };

  
  ngOnInit(){};
};
