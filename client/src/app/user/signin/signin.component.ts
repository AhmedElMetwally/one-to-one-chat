import { signinMyform } from './../user.formValidators';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup , Validators , FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { Iuser } from '../app.user';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

  // new signup form
  myform:FormGroup;

  // new user to signup
  user:Iuser;

  // to show alert of error
  ErrorAlert:boolean = false;

  constructor(private _userService:UserService , private _router:Router) { };

  onSubmit() :void{
    // user object
    // signin with user
    // Login the User in localStorge
    // reset the form 
    // go to /chat
    // if err -> throw Error
    this.user = {
      email : this.myform.controls.email.value,
      password : this.myform.controls.password.value
    };
    this._userService.signinUser(this.user).subscribe( user =>{
      this._userService.Login(user.token , user._id)
      this.myform.reset();
    },(err) =>{
      this.ErrorAlert = true;
      console.log(err) 
    });

  };


  ngOnInit() {
    // create new form 
    // with email and password
    // formControlName : ('' , [Validators])
    this.myform = signinMyform ;
  };

};
