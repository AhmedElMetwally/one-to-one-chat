import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup , Validators , FormControl } from '@angular/forms';
import { AuthService as SocialAuthService } from "angular2-social-auth";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  constructor(
    private _authService : AuthService,
    private _socialAuthService : SocialAuthService ){};


  // new signup form
  myform:FormGroup = new FormGroup({ 
    name : new FormControl('' , [Validators.required , Validators.minLength(5),Validators.maxLength(30)]),
    email : new FormControl('' , [Validators.required , Validators.email]),
    password : new FormControl('', [Validators.required , Validators.minLength(8) , Validators.maxLength(30)])
  });


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
      .subscribe( user => {
        // login
        this._authService.Login(user.token , user._id ,  ['/chat']);  

        this.myform.reset()
      } , err  => {
        this.ErrorAlert = true;
        console.log(err)
    });
  };

  
  facebookSigninOrSignup() :void {

    // get user from facebook
    // create new user opject
    this._socialAuthService.login('facebook')
      .subscribe( (FBuser : any ) => {

        // Signin Or Signup in server
        // get _id , token 
        this._authService.facebookSigninOrSignup({
            facebook : {
                id : FBuser.uid,
                token : FBuser.token
            },
            name : FBuser.first_name +' '+ FBuser.last_name ,
            email : FBuser.email || FBuser.uid,
            image : `http://graph.facebook.com/${FBuser.uid}/picture?type=large&redirect=true&width=300&height=300`
          })
          .subscribe(( user : any ) => {

            // login
            this._authService.Login(user.token , user._id , ['/chat'] );  
          });
    });
  };

  ngOnInit(){};
};
