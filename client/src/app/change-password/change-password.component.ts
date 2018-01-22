import { AuthService } from './../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup , Validators , FormControl } from '@angular/forms';



@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    private _userService : UserService ,
    private _activatedRoute : ActivatedRoute,
    private _router : Router ,
    private _authService : AuthService ){};



  // token from link who sent to Email
  password_token: string;


  // alert error|success
  alert:string ;



  // new signup form
  myform:FormGroup = new FormGroup({ 
    password : new FormControl('', [Validators.required , Validators.minLength(8) , Validators.maxLength(30)])
  });



  // on submit new password
  onSubmit(){
    // use password token , new password
    // to change password 
    this._userService.changePassword_forgerPassword(this.myform.controls.password.value , this.password_token)
      .subscribe( data => {
        if(data.status){
          this.alert = 'success';
          setTimeout(() => {
            this._authService.Login(data.user.token , data.user._id , ['/user' , 'profile'])
          } , 2000);
        }else{
          this.alert = 'danger';
          console.log(data.err);
          setTimeout(() => {
            this._router.navigate(['/user' , 'forget-password']);
          } , 2000);
        }
      })
  };



  ngOnInit(){
    this._activatedRoute.params.subscribe( params => {
      // get password token
      // from url who sent to email
      this.password_token = params['password_token'];
    });
  };

}