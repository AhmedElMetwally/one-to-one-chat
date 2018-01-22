import { Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup , Validators , FormControl } from '@angular/forms';



@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  constructor(
    private _userService : UserService ,
    private _router : Router ){};


    // alert error|success
  alert:string ;


  // new signup form
  Email_RegExp : any  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  myform:FormGroup = new FormGroup({ 
    email : new FormControl('' , [Validators.required , Validators.pattern(this.Email_RegExp)]),
  });


  onSubmit(){
    this._userService.sentPassword_forgetPassword(this.myform.controls.email.value)
      .subscribe( data => {
        if(data.status){
          this.alert = "success";
        }else{
          this.alert = "danger";
        };
      });
  };



  ngOnInit(){
  };
}
