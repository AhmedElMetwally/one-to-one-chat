import { signupMyform } from './../user.formValidators';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup , Validators , FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { Iuser } from '../app.user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  
  myform:FormGroup;
  user:Iuser;

  constructor(private _userService:UserService , private _router:Router) { }

  onSubmit() :void{
    // new User
    // singup new User
    // Login the User in localStorge
    // reset the form 
    // go to /chat
    // if err throw Error
    this.user = {
      name : this.myform.controls.name.value,
      email : this.myform.controls.email.value,
      password : this.myform.controls.password.value
    };
    this._userService.signupUser(this.user).subscribe( user => {
        this._userService.Login(user.token , user._id);  
        this.myform.reset()
        this._router.navigate(['/chat'])
      },( err ) =>{
        console.log(err)
    });
  };

  ngOnInit() {
    // create new form 
    // with name and email and password
    // formControlName : ('' , [Validators])
    this.myform = signupMyform;
  };



};
