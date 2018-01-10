import { AuthService } from './../../service/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup , Validators , FormControl } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  constructor(
    private _router:Router,
    private _authService:AuthService){};


  // new signup form
  myform:FormGroup = new FormGroup({ 
    name : new FormControl('' , [Validators.required , Validators.minLength(5),Validators.maxLength(30)]),
    email : new FormControl('' , [Validators.required , Validators.email]),
    password : new FormControl('', [Validators.required , Validators.minLength(8) , Validators.maxLength(30)])
  });

  // to show alert of error
  ErrorAlert:boolean = false;



  onSubmit() :void{
    this._authService
      .signupUser({
        name : this.myform.controls.name.value,
        email : this.myform.controls.email.value,
        password : this.myform.controls.password.value
      })
      .subscribe( user => {
        this._authService.Login(user.token , user._id);  
        this.myform.reset()
      } , err  => {
        this.ErrorAlert = true;
        console.log(err)
    });
  };
  
  ngOnInit(){};

};
