import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { Iuser } from '../../Iuser';
import { isFormattedError } from '@angular/compiler';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private _profileService:ProfileService) {};
 
  user:Iuser;

  EditMode : any =  {
    name: false ,
    email: false ,
    phone : false,
    facebookAccount : false
  };

  Valid: any =  {
    name: true ,
    email: true ,
    phone : true,
    facebookAccount : true
  };

  // get value 
  // ckeck value with key in opj
  Pattern( key , value) : boolean{
    let opj = {
      name : /^.{5,30}$/ ,
      email : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ,
      phone : /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
      facebookAccount :  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
    };
    return opj[ key ].test( value ); 
  };

  Submit( _editMode , key , value) :void{

    // relace space from text
    value = value.replace(/\s+/g , ' ');
    
    // when editMode true and valid true
    // submit this value
    if(this.Valid[key] && this.EditMode[key]  ){
      this._profileService.updateUser(key , value)
        .subscribe( data => {
          // if success
          if(data.status && data.result.n == 1){
            // set new value in html 
            this.user[key] = value;
          };
        });
    };

    // on submit revese EditMode to open/close
    this.EditMode[key] = !_editMode;

    // on submit resetValid
    this.Valid[key] = true;
  };
  
  Keyup( $event , _editMode , key , value):void{

    // set valid of key true or false
    this.Valid[key] = this.Pattern( key , value);

    // if click enter submit text
    if($event.key == 'Enter' ){
      this.Submit( _editMode , key , value);
    };

  };


  ngOnInit() {
    // get user data
    this._profileService.getUser()
      .subscribe( data => {
        if(data.status){
          this.user = data.user;
        };
      });
  };


}
