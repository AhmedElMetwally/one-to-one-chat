import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { Iuser } from '../../Iuser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:Iuser;


  constructor(private _profileService:ProfileService) {};




  ngOnInit() {
    this._profileService.getUser()
    .subscribe(data => {
      this.user = data.user;
    }, err => {
      console.log(err)
    })
  };

}
