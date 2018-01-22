import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Iuser } from '../../Iuser';
import { isFormattedError } from '@angular/compiler';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private _userService:UserService) {};
 
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
    facebookAccount : true ,
    image : true
  };

  progressbar:number = 0;


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


  // on submit new value
  Submit( _editMode , key , value) :void{

    // relace space from text
    value = value.replace(/\s+/g , ' ');
    
    // when editMode true and valid true
    // submit this value
    if(this.Valid[key] && this.EditMode[key]  ){
      this._userService.updateUser(key , value)
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
  

  // on click enter submit enw value
  Keyup( $event , _editMode , key , value):void{

    // set valid of key true or false
    this.Valid[key] = this.Pattern( key , value);

    // if click enter submit text
    if($event.key == 'Enter' ){
      this.Submit( _editMode , key , value);
    };

  };



  // on select new img upload it
  uploadImg($event){

    const getExtension = filename => {
      var parts = filename.split('.');
      return parts[parts.length - 1];
    };
  
    const isImage = filename => {
        var ext = getExtension(filename);
        switch (ext.toLowerCase()) {
        case 'jpg':
        case 'gif':
        case 'bmp':
        case 'png':
            //etc
            return true;
        }
        return false;
    };
  
    // check if user selected Files
    if($event.target.files.length && isImage($event.target.files[0].name )){
      console.log('uploading imgage.....');

      // add file
      var formData = new FormData();
      formData.append('image' ,$event.target.files[0] , $event.target.files[0].name );
      
      // sent form
      this._userService.uploadImg(formData)
        .subscribe( data => {
          // if Done
          if(data.status){
            this.Valid.image = true;
            this.user.image = data.user.image;
          }else{
            // if not done display error
            console.log(data.err);
          };
        });

    }else{
      // if not image 
      this.Valid.image = false;
    };
    
  };


  
  ngOnInit() {
    // get user data
    this._userService.getUser()
      .subscribe( data => {
        if(data.status){

          // test for all facebook accounts
          if(!this.Pattern( "email" , data.user.email)){
            data.user.email = "";
          };

          this.user = data.user;
        };
      });
  };


}
