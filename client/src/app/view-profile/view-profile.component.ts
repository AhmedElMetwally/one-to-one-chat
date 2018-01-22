import { Iuser } from './../Iuser';
import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';



@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  constructor(
    private _userService : UserService ,
    private _activatedRoute : ActivatedRoute,
    private _location: Location ){};
  
    

  user : Iuser;
  


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



  backClicked() {
    this._location.back();
  }



  ngOnInit(){
    this._activatedRoute.params.subscribe( params => {
      let { _id }  = params;
      
      this._userService.getUser(_id)
        .subscribe( data => {

          if(data.status){

            // test for all facebook accounts
            if(!this.Pattern( "email" , data.user.email)){
              data.user.email = "";
            };

            this.user = data.user;
          }else{
            console.log(data.err);
          };
        });
    });
  };


};
