import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup , Validators , FormControl } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  constructor(
    private _authService : AuthService){};


  // new signup form
  myform:FormGroup;


  // to show alert of error
  ErrorAlert:boolean = false;


  // submit form signup
  onSubmit() :void{
    this._authService
      .signupUser({
        name : this.myform.controls.name.value,
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



  ngOnInit(){
    var Email_RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.myform = new FormGroup({ 
      name     : new FormControl('' , [Validators.required , Validators.minLength(5),Validators.maxLength(30)]),
      email    : new FormControl('' , [Validators.required , Validators.pattern(Email_RegExp)]),
      password : new FormControl('', [Validators.required , Validators.minLength(8) , Validators.maxLength(30)])
    });
  };

};
