import { Iuser } from './../Iuser';
import { Component, OnInit } from '@angular/core';
import { FormGroup , Validators , FormControl } from '@angular/forms';
import { TweetService } from '../service/tweet.service';



@Component({
  selector: 'app-blog',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {
  constructor(
    private _tweetService : TweetService ){ 
      
      // on recive new tweet in socket.io event
      // get this tweet with all user date 
      // display tweet in the first 
      this._tweetService.getTweet()
        .subscribe( tweet => {
          this.tweets.unshift(tweet);
        })
  };
  

  // thisUser
  user : Iuser;


  // create tweet form
  myform:FormGroup ;


  // all tweets
  tweets :any[];


  // when submit the form 
  // ckeck if value  > 1 char
  // create new tweet with thisUser date
  // display new tweet in the first of array tweets
  // emit new tweet with socket.io
  // reset form 
  onSubmit(){
    
    if(this.myform.controls.tweet.value){
      
      // create tweet object
      let NewTweet = {
        created : new Date().toISOString(),
        content : this.myform.controls.tweet.value , 
        user : this.user
      };

      // sent new tweet
      this._tweetService.SentTweet(NewTweet);
      
      // push tweet in array
      this.tweets.unshift(NewTweet);

      // reset my from
      this.myform.reset();    
    }
  }





  ngOnInit() {
    

    // create form tweet
    this.myform =  new FormGroup({ 
      tweet : new FormControl('', [ Validators.maxLength(200)])
    });



    // get thisUser
    this._tweetService.getUser()
      .subscribe( data => {
        if(data.status){
          this.user = data.user;  
        };
      });



    // get all tweets
    this._tweetService.getTweets()
      .subscribe(data => {
        if(data.status){
          this.tweets = data.tweets;
        };
      });
  };



};
