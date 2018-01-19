import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { Iuser } from '../../Iuser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private _profileService:ProfileService) {};
  
  user:Iuser;
  EditUser : any =  {
    name: true ,
    email: true ,
    phone : true,
    facebookAccount : true
  };

  Valid : any =  {
    name: true ,
    email: true ,
    phone : true,
    facebookAccount : true
  };


  // get user with his _id
  // update this  { key : value} in DB
  updateUser(key , value){
    if( this.pattern( value , key) ){
      this._profileService.updateUser( key , value)
        .subscribe( data => {
          if(data.status && data.result.n == 1){
            this.user[key] = value;
          }else{
            console.log( "error" , data);
          };
        });
    }
  };


  // on keyuo
  // valid input
  // if click enter
  // update this { key : value }
  keyup_updateUser($event , key , value){
    this.Valid[key] = (!!this.pattern(value , key)) ;
    if($event.which == 13){
      this.updateUser(key , value);
      this.EditUser[key] = !this.EditUser[key];
    }
  }


  // check data
  pattern(text , reglax){
    var opj = {
      name : /^.{5,30}$/ ,
      email : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ,
      phone : /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
      facebookAccount :  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
    };
    return opj[reglax].test(text) ? text : '';  
  }


  ngOnInit() {
 
    this._profileService.getUser()
      .subscribe( data => {

        if(data.status){

          // ckeck if data is bad or not found
          data.user.name = this.pattern(data.user.name , 'name');
          data.user.phone = this.pattern(data.user.phone , 'phone');
          data.user.email = this.pattern(data.user.email , 'email');
          data.user.facebookAccount = this.pattern(data.user.facebookAccount , 'facebookAccount');
          
          this.user = data.user;
        };
      });
  };


}
