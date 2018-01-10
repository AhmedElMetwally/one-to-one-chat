import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup , Validators , FormControl } from '@angular/forms';
import { AuthService } from '../../service/auth.service';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {
  constructor(
    private _router:Router,
    private _authService:AuthService){};


  // new signup form
  myform:FormGroup = new FormGroup({ 
    email : new FormControl('' , [Validators.required , Validators.email]),
    password : new FormControl('', [Validators.required , Validators.minLength(8) , Validators.maxLength(30)])
  });

  // to show alert of error
  ErrorAlert:boolean = false;


  onSubmit() :void{
    this._authService
      .signinUser({
        email : this.myform.controls.email.value,
        password : this.myform.controls.password.value
      })
      .subscribe( user => {
        this._authService.Login(user.token , user._id)
        this.myform.reset();
      }, err => {
      this.ErrorAlert = true;
      console.log(err) 
    });
  };


  ngOnInit(){};

};
